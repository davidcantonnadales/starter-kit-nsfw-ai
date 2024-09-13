"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import axios from "axios";
import { useUser } from "reactfire";
import Modal from "react-modal";
import { FaCopy } from "react-icons/fa";
import {
  DownloadIcon,
  Share1Icon,
  GlobeIcon,
  Cross1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import CommunityCreationCard from "@/components/dashboard/community-creation-card";

const UserGallery = () => {
  const [creations, setCreations] = useState<GenerateResponse[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreation, setSelectedCreation] =
    useState<GenerateResponse | null>(null);
  const { data: user } = useUser();

  useEffect(() => {
    const fetchCreations = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await axios.get(`/api/community-creations`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCreations(response.data);
        } catch (error) {
          console.error("Error fetching user creations:", error);
        }
      }
    };

    fetchCreations();
  }, [user]);

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

  return (
    <>
      <div className="flex-col md:flex">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6">
          Community Creations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {creations.map((creation, index) => (
            <CommunityCreationCard
              copyToClipboard={copyToClipboard}
              creation={creation}
              index={index}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 relative text-center">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <Cross1Icon />
          </button>
          {selectedCreation && (
            <>
              <Image
                src={`${selectedCreation.output[0]}`}
                alt="Selected Creation"
                className="mb-4 max-w-full max-h-96 object-contain"
                height={300}
                width={300}
              />
              <div className="flex justify-around mt-4">
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
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserGallery;
