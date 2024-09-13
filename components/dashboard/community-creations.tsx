import React, { useEffect, useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import { FaCopy } from "react-icons/fa";
import { Card, Dialog } from "@radix-ui/themes";
import { Cross1Icon, DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import CommunityCreationCard from "./community-creation-card";

interface CommunityCreationsProps {
  token: string | undefined;
}

const CommunityCreations = ({ token }: CommunityCreationsProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreation, setSelectedCreation] =
    useState<GenerateResponse | null>(null);

  const openModal = (creation: GenerateResponse) => {
    setSelectedCreation(creation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCreation(null);
    setModalIsOpen(false);
  };

  const [creations, setCreations] = useState<GenerateResponse[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (!token) {
          return;
        }
        const response = await axios.get("/api/community-creations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCreations(response.data);
      } catch (error) {
        console.error("Error fetching filtered models:", error);
      }
    };

    fetchModels();
  }, [token]);

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        alert("Prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Creations</CardTitle>
          <CardDescription>
            Get inspired by the prompts and creations of other users.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {creations.slice(0, 17).map((creation, index) => (
            <CommunityCreationCard
              copyToClipboard={copyToClipboard}
              creation={creation}
              index={index}
              openModal={openModal}
            />
          ))}
          {creations.length > 17 && (
            <Link
              href="/app/community-creations"
              className="flex items-center justify-center border rounded-lg text-center p-4 bg-gray-100 hover:bg-gray-200"
            >
              <span className="text-blue-500">View All</span>
            </Link>
          )}
        </CardContent>
      </Card>

      <Dialog.Root open={modalIsOpen} onOpenChange={closeModal}>
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Close>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <Cross1Icon />
            </button>
          </Dialog.Close>
          {selectedCreation && (
            <div className="grid align-middle">
              <img
                src={`${selectedCreation.output[0]}`}
                alt="Selected Creation"
                className="mb-2 max-w-full flex"
              />
              <div className="flex justify-around">
                <a
                  href="#"
                  onClick={() =>
                    downloadImage(
                      `${selectedCreation.output[0]}`,
                      `${selectedCreation.id}.jpg`
                    )
                  }
                  className="flex items-center px-4 py-2 text-blue-500"
                >
                  <DownloadIcon className="mr-2" /> Download
                </a>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CommunityCreations;
