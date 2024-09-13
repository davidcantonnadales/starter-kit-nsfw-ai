// pages/subscriptions.js
"use client";

import React, { useEffect, useState } from "react";

import { GenerateResponse } from "@/lib/models/GenerateResponse";
import axios from "axios";
import { useUser } from "reactfire";

import {
  DownloadIcon,
  Share1Icon,
  GlobeIcon,
  Cross1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Swal from "sweetalert2";
import { FaLock, FaUnlock } from "react-icons/fa";
import HistorialCard from "@/components/dashboard/history-card";
import { useRole } from "@/components/auth/roleContext";

const UserGallery = () => {
  const [creations, setCreations] = useState<GenerateResponse[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreation, setSelectedCreation] =
    useState<GenerateResponse | null>(null);
  const { data: user } = useUser();
  const { role, userId } = useRole();

  useEffect(() => {
    const fetchCreations = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await axios.get(
            `/api/previous-creations/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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

  const shareImage = () => {
    // Implementar funcionalidad de compartir
    Swal.fire("Info", "Share functionality to be implemented.", "info");
  };

  const makePublic = async (creation: GenerateResponse) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        if (!token) {
          return;
        }
        const response = await axios.post(
          "/api/gallery/public",
          { id: creation.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        creation.isPublic = true;

        Swal.fire("Success", "Creation made public successfully", "success");
      } catch (error) {
        console.error("Error making creation public:", error);
        Swal.fire("Error", "Failed to make creation public", "error");
      }
    }
  };

  const makePrivate = async (creation: GenerateResponse) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        const response = await axios.post(
          "/api/gallery/private",
          { id: creation.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        creation.isPublic = false;

        Swal.fire("Success", "Creation made private successfully", "success");
      } catch (error) {
        console.error("Error making creation private:", error);
        Swal.fire("Error", "Failed to make creation private", "error");
      }
    }
  };

  const deleteCreation = async (creationId: string) => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this creation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      const token = await user.getIdToken();
      try {
        await axios.delete(`/api/creations/${creationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCreations((prevCreations) =>
          prevCreations.filter((creation) => creation.id !== creationId)
        );
        closeModal();
        Swal.fire("Deleted!", "Your creation has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting creation:", error);
        Swal.fire("Error", "Failed to delete creation", "error");
      }
    }
  };

  return (
    <>
      <div className="flex-col md:flex">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6">
          All Your Creations
        </h1>
        <div className="flex grid-flow-col auto-cols-max gap-4 flex-wrap">
          {creations.map((creation, index) => (
            <HistorialCard
              creation={creation}
              index={index}
              role={role || ""}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

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
                {/* <a
                  href="#"
                  onClick={shareImage}
                  className="flex items-center px-4 py-2 text-green-500"
                >
                  <Share1Icon className="mr-2" /> Share
                </a> */}
                {selectedCreation.isPublic ? (
                  <a
                    href="#"
                    onClick={() => makePrivate(selectedCreation)}
                    className="flex items-center px-4 py-2 text-yellow-500"
                  >
                    <GlobeIcon className="mr-2" /> Make Private
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={() => makePublic(selectedCreation)}
                    className="flex items-center px-4 py-2 text-yellow-500"
                  >
                    <GlobeIcon className="mr-2" /> Make Public
                  </a>
                )}
                <a
                  href="#"
                  onClick={() => deleteCreation(selectedCreation.id)}
                  className="flex items-center px-4 py-2 text-red-500"
                >
                  <TrashIcon className="mr-2" /> Delete
                </a>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default UserGallery;
