import React, { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DownloadIcon,
  Share1Icon,
  GlobeIcon,
  Cross1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import "./styles.css";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import axios from "axios";
import { FaLock, FaUnlock } from "react-icons/fa";
import { Card, Dialog } from "@radix-ui/themes";
import { useRole } from "../auth/roleContext";
import HistorialCard from "./history-card";

interface HistorialProps {
  previousCreations: GenerateResponse[];
  token: string | undefined;
}

const Historial = ({ token, previousCreations }: HistorialProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreation, setSelectedCreation] =
    useState<GenerateResponse | null>(null);
  const { role, userId } = useRole();

  const openModal = (creation: GenerateResponse) => {
    setSelectedCreation(creation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCreation(null);
    setModalIsOpen(false);
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = () => {
    toast.info("Share functionality to be implemented.");
  };

  const makePublic = async (creation: GenerateResponse, token: string) => {
    try {
      if (!token) {
        return;
      }
      await axios.post(
        "/api/gallery/public",
        { id: creation.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      creation.isPublic = true;

      toast.success("Creation made public successfully");
    } catch (error) {
      console.error("Error making creation public:", error);
      toast.error("Failed to make creation public");
    }
  };

  const makePrivate = async (creation: GenerateResponse, token: string) => {
    try {
      if (!token) {
        return;
      }
      await axios.post(
        "/api/gallery/private",
        { id: creation.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      creation.isPublic = false;
      toast.success("Creation made private successfully");
    } catch (error) {
      console.error("Error making creation private:", error);
      toast.error("Failed to make creation private");
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Your last Creations</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        {previousCreations.slice(0, 11).map((creation, index) => (
          <HistorialCard
            creation={creation}
            index={index}
            role={role || ""}
            openModal={openModal}
          />
        ))}
        {previousCreations.length > 11 && (
          <Link
            href="/app/user-gallery"
            passHref
            className="flex items-center justify-center border rounded-lg text-center p-4 bg-gray-100 hover:bg-gray-200 h-36"
          >
            <span className="text-blue-500">View All</span>
          </Link>
        )}
      </CardContent>
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
                {selectedCreation.isPublic ? (
                  <a
                    href="#"
                    onClick={() => makePrivate(selectedCreation, token!)}
                    className="flex items-center px-4 py-2 text-yellow-500"
                  >
                    <GlobeIcon className="mr-2" /> Make Private
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={() => makePublic(selectedCreation, token!)}
                    className="flex items-center px-4 py-2 text-yellow-500"
                  >
                    <GlobeIcon className="mr-2" /> Make Public
                  </a>
                )}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
      <ToastContainer />
    </Card>
  );
};

export default Historial;
