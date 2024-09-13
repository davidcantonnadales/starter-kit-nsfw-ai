import React from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import "./styles.css";
import { Card } from "@radix-ui/themes";
import { toast, ToastContainer } from "react-toastify";
import { GenerateResponse } from "@/lib/models/GenerateResponse";

interface PrevisualizationProps {
  generateResponse: GenerateResponse | null;
  isLoading: boolean;
  token: string | undefined;
}

const Previsualization = ({
  generateResponse,
  isLoading,
  token,
}: PrevisualizationProps) => {
  const handleLikeDislike = async (type: "like" | "dislike") => {
    if (!generateResponse) return;

    try {
      await axios.post(
        "/api/gallery/rate",
        {
          id: generateResponse.id,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Successfully ${type}d the image");
    } catch (error) {
      console.error(`Error ${type}ing the image:`, error);
      toast.error(`Error ${type}ing the image`);
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Previsualization</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#00BFFF"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : generateResponse && generateResponse?.output.length > 0 ? (
          <>
            <img
              src={`${generateResponse.output[0]}`}
              alt="Generated Preview"
              className="rounded-lg"
            />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleLikeDislike("like")}
                className="bg-green-500 text-white p-2 rounded"
              >
                Like
              </button>
              <button
                onClick={() => handleLikeDislike("dislike")}
                className="bg-red-500 text-white p-2 rounded"
              >
                Dislike
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Generate an image with your Prompt to see the result here
          </div>
        )}
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default Previsualization;
