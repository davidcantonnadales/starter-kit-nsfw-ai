"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRole } from "../auth/roleContext";
import { useUser } from "reactfire";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CardHeader } from "../ui/card";
import Previsualization from "./previsualization";
import Historial from "./historial";

import axios from "axios";
import Modal from "react-modal";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import CommunityCreations from "./community-creations";
import ProgressBar from "./progress-bar";
import SearchComponent from "./search";
import { CommunityModelResponse } from "@/lib/models/CommunityModelResponse";

import { Card } from "@radix-ui/themes";
import { CardContent, CardDescription, CardTitle } from "../ui/card";

export const Dashboard: React.FC = () => {
  const [selectedModel, setSelectedModel] =
    useState<CommunityModelResponse | null>(null);
  const [loraSelectedModel, setLoraSelectedModel] =
    useState<CommunityModelResponse | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [negativePrompts, setNegativePrompts] = useState<
    { name: string; value: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"text2img" | "img2img">(
    "text2img"
  );

  const [page, setPage] = useState(0);

  const [userToken, setUserToken] = useState<string>();

  const [previousCreations, setPreviousCreations] = useState<
    GenerateResponse[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generateResponse, setData] = useState<GenerateResponse | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { role, userId } = useRole();

  const [isPublic, setIsPublic] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [improveHumanBody, setImproveHumanBody] = useState(false);
  const [size, setSize] = useState("Portrait");
  const [generationLimit, setGenerationLimit] = useState(0);
  const [maxGenerationLimit, setMaxGenerationLimit] = useState(0);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false);

  const auth = useMemo(() => getAuth(), []);

  useEffect(() => {
    const fetchGenerationStats = async () => {
      try {
        if (!userToken) return;

        const response = await axios.post(
          "/api/user/generations",
          { uid: userId },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setGenerationLimit(response.data.generationLimit || 0);
        setMaxGenerationLimit(response.data.maxGenerationLimit || 0);
      } catch (error) {
        console.error("Error fetching generations stats:", error);
      }
    };

    fetchGenerationStats();
  }, [previousCreations, userId, userToken]);

  useLayoutEffect(() => {
    if (!auth) {
      redirect("/");
    }
  }, [auth]);

  useEffect(() => {
    const fetchPreviousCreations = async (userId: string, token: string) => {
      try {
        const response = await axios.get(`/api/previous-creations/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPreviousCreations(response.data);
      } catch (error) {
        console.error("Error fetching previous creations:", error);
      }
    };

    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
        setPage(1);
        fetchPreviousCreations(user.uid, token);
      } else {
        setUserToken(undefined);
      }
    });

    return () => {
      listener();
    };
  }, [auth]);

  const closeLimitModal = () => {
    setIsLimitModalOpen(false);
  };

  const fetchGenerateData = async (token: string) => {
    setData(null);
    setError(null);
    setFetching(true);

    try {
      const response = await axios.post(
        "/api/generate",
        {
          model: selectedModel?.sd_name,
          isPublic: isPublic,
          isNSFW: isNSFW,
          size: size,
          lora: loraSelectedModel,
          prompt: prompt,
          improveHumanBody: improveHumanBody,
          negativePrompt: negativePrompts.map((chip) => chip.value).join(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const apiResponse = new GenerateResponse(
        response.data.id,
        response.data.status,
        response.data.output,
        response.data.isPublic
      );

      if (apiResponse.status === "TASK_STATUS_FAILED") {
        setError("Failed to generate image");
        setFetching(false);
        return;
      }

      setData(apiResponse);
      pollStatus(apiResponse.id, token);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Failed to fetch data");
      setFetching(false);

      if ((error! as any).response!.data.error == "Generation limit reached") {
        setIsLimitModalOpen(true);
      }
    } finally {
    }
  };

  const fetchImg2ImgGenerateData = async (
    token: string,
    base64Image: string
  ) => {
    setData(null);
    setError(null);
    setFetching(true);

    try {
      const response = await axios.post(
        "/api/img2img",
        {
          imageBase64: base64Image,
          model: selectedModel?.sd_name,
          isPublic: isPublic,
          size: size,
          lora: loraSelectedModel,
          prompt: prompt,
          negativePrompt: negativePrompts.map((chip) => chip.value).join(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const apiResponse = new GenerateResponse(
        response.data.id,
        response.data.status,
        response.data.output,
        response.data.isPublic
      );

      if (apiResponse.status === "TASK_STATUS_FAILED") {
        setError("Failed to generate image");
        setFetching(false);
        return;
      }

      setData(apiResponse);
      pollStatus(apiResponse.id, token);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Failed to fetch data");
      setFetching(false);

      if ((error! as any).response!.data.error == "Generation limit reached") {
        setIsLimitModalOpen(true);
      }
    } finally {
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const pollStatus = (id: string, token: string) => {
    intervalRef.current = setInterval(async () => {
      try {
        const response = await axios.post(
          `/api/fetch/${id}`,
          {
            uid: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const apiResponse = new GenerateResponse(
          response.data.id,
          response.data.status,
          response.data.output,
          response.data.isPublic
        );

        if (apiResponse.status === "TASK_STATUS_SUCCEED") {
          clearInterval(intervalRef.current!);
          setData(apiResponse);
          setFetching(false);

          var refreshedArray = [apiResponse, ...previousCreations];

          setPreviousCreations(refreshedArray);
        } else if (apiResponse.status === "TASK_STATUS_FAILED") {
          clearInterval(intervalRef.current!);
          setError("Failed to generate image");
          setFetching(false);
        }
      } catch (error) {
        console.error("Error polling data:", error);
        clearInterval(intervalRef.current!);
        setError("Failed to poll data");
        setFetching(false);
      }
    }, 2000);
  };

  const handleModelSelect = (model: CommunityModelResponse | null) => {
    setSelectedModel(model);
  };

  const handleLoraModelSelect = (model: CommunityModelResponse | null) => {
    setLoraSelectedModel(model);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleDeleteNegativePrompt = (chipToDelete: {
    name: string;
    value: string;
  }) => {
    setNegativePrompts((chips) =>
      chips.filter((chip) => chip.value !== chipToDelete.value)
    );
  };

  const handleAddNegativePrompt = (chipToAdd: {
    name: string;
    value: string;
  }) => {
    if (
      !negativePrompts.find((chip) => chip.value === chipToAdd.value) &&
      chipToAdd
    ) {
      setNegativePrompts((chips) => [...chips, chipToAdd]);
    }
  };

  const handleGenerateImage = async (base64image: string | null) => {
    // if (!role) {
    //   setIsModalOpen(true);
    //   return;
    // }

    if (activeTab === "text2img") {
      if (userToken) {
        fetchGenerateData(userToken);
      }
    } else {
      fetchImg2ImgGenerateData(userToken!, base64image!);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSizeChange = (e: string) => {
    setSize(e);
  };

  const handleIsPublicChange = () => {
    setIsPublic(!isPublic);
  };

  const handleIsNSFWChange = () => {
    setIsNSFW(!isNSFW);
  };

  const handleImproveHumanBodyChange = () => {
    setImproveHumanBody(!improveHumanBody);
  };

  return (
    <>
      {/* {!role && <AdBlockDetector />} */}
      <div className="flex-col md:flex">
        <div className="flex items-end justify-between space-y-2 mb-6">
          <h2 className="text-3xl leading-5 font-bold tracking-tight">
            Dashboard
          </h2>
        </div>

        <div className="grid gap-4 mb-6">
          {/* <ProgressBar
            usedGenerations={generationLimit}
            maxGenerationLimit={maxGenerationLimit}
          /> */}

          <ProgressBar
            usedGenerations={generationLimit}
            maxGenerationLimit={maxGenerationLimit}
          />

          {/* {!role && (
            <AddBannerSuperior
              className="eas6a97888e20"
              zoneId="5368080"
              isPopup={false}
            />
          )} */}
        </div>

        <div className="grid gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Select your image generation process</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                className={`px-4 py-2 ${
                  activeTab === "text2img"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setActiveTab("text2img")}
              >
                Text to Image
              </button>
              <button
                className={`px-4 py-2 ml-2 ${
                  activeTab === "img2img"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setActiveTab("img2img")}
              >
                Image to Image
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <SearchComponent
            activeTab={activeTab}
            userToken={userToken || ""}
            handleModelSelect={handleModelSelect}
            handleLoraModelSelect={handleLoraModelSelect}
            selectedModel={selectedModel}
            loraSelectedModel={loraSelectedModel}
            prompt={prompt}
            negativePrompts={negativePrompts}
            handleAddNegativePrompt={handleAddNegativePrompt}
            handleDeleteNegativePrompt={handleDeleteNegativePrompt}
            fetching={fetching}
            handleInputChange={handleInputChange}
            handleGenerateImage={handleGenerateImage}
            isPublic={isPublic}
            handleIsPublicChange={handleIsPublicChange}
            isNSFW={isNSFW}
            improveHumanBody={improveHumanBody}
            handleImproveHumanBodyChange={handleImproveHumanBodyChange}
            handleIsNSFWChange={handleIsNSFWChange}
            size={size}
            handleSizeChange={handleSizeChange}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">
          <Previsualization
            generateResponse={generateResponse}
            isLoading={fetching}
            token={userToken}
          />
          <Historial previousCreations={previousCreations} token={userToken} />
        </div>

        <div className="mt-6">
          <CommunityCreations token={userToken} />
        </div>
        <br></br>

        {/* {!role && (
          <div className="grid gap-4 mb-6">
            <AddBannerSuperior
              className="eas6a97888e20"
              zoneId="5368056"
              isPopup={false}
            />
          </div>
        )} */}
      </div>
      {/* 
      {!role && (
        <AddBannerSuperior
          className="eas6a97888e6"
          zoneId="5368070"
          isPopup={true}
        />
      )} */}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Required Subscription"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Required Subscription</h2>
          <p className="mb-4">
            To generate images, you need to subscribe to one of our plans.
          </p>
          <div className="flex flex-col gap-4">
            <Link href={"/app/subscriptions"}>
              <Button>Subscribe Now</Button>
            </Link>
            <Button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isLimitModalOpen}
        onRequestClose={closeLimitModal}
        contentLabel="Generation Limit Reached"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Generation Limit Reached</h2>
          <p className="mb-4">
            You have reached your monthly generation limit. Please upgrade your
            plan to continue generating images.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/app/subscriptions">
              <Button>Upgrade Plan</Button>
            </Link>
            <Button
              onClick={closeLimitModal}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
