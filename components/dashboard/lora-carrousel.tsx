import React, { useState, useEffect } from "react";
import { Card, Dialog, Flex } from "@radix-ui/themes";
import Modal from "react-modal";
import axios from "axios";

import { Button, TextField } from "@radix-ui/themes";
import { CommunityModelResponse } from "@/lib/models/CommunityModelResponse"; // Importa la clase
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CardContent } from "../ui/card";

interface LoraCarouselProps {
  handleModelSelect: (model: CommunityModelResponse) => void;
  selectedLoraModel: CommunityModelResponse | null;
  selectedModel: CommunityModelResponse | null;
  token: string | undefined;
}

const LoraCarousel = ({
  handleModelSelect,
  selectedModel,
  selectedLoraModel,
  token,
}: LoraCarouselProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [models, setModels] = useState<CommunityModelResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [cursor, setCursor] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFilteredModels = async () => {
      try {
        if (!token) return;

        const response = await axios.get("/api/search-models", {
          params: { query: searchTerm, page, limit: 20, cursor, type: "lora" },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedModels = response.data.models.map(
          (model: any) => new CommunityModelResponse(model)
        );
        setModels(fetchedModels);
        setTotal(response.data.total);
        setCursor(response.data.next_cursor);
      } catch (error) {
        console.error("Error fetching filtered models:", error);
      }
    };

    fetchFilteredModels();
  }, [searchTerm, page, token]); // Eliminar cursor de las dependencias

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page when search term changes
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            className="p-2 bg-blue-600 text-white rounded mb-2"
            color="blue"
            size={"3"}
            disabled={!selectedModel}
          >
            Select Lora
          </Button>
        </Dialog.Trigger>

        <Dialog.Content size={"4"}>
          <Dialog.Title>Lora Models</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Search and select your favorite lora model
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <div className="flex justify-between items-center">
              <TextField.Root
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border rounded w-full"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-between">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
                  disabled={!cursor}
                >
                  Next
                </Button>
              </div>

              <Dialog.Close>
                <Button
                  className="px-4 py-2 m-2 text-white rounded"
                  color="blue"
                >
                  Choose and close
                </Button>
              </Dialog.Close>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {models.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleModelSelect(item)}
                  className={`cursor-pointer relative`}
                >
                  <div
                    className={`h-32 w-full bg-cover bg-top rounded-lg ${
                      selectedLoraModel && selectedLoraModel.id === item.id
                        ? "border-pink-500 border-2"
                        : "border-white-500 border-1"
                    }`}
                    style={{ backgroundImage: `url(${item.cover_url})` }}
                  ></div>
                  <div className="text-md text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div className="flex justify-between">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 m-2 bg-blue-500 text-white rounded"
                  disabled={!cursor}
                >
                  Next
                </Button>
              </div>

              <Dialog.Close>
                <Button
                  className="px-4 py-2 m-2 text-white rounded"
                  color="blue"
                >
                  Choose and close
                </Button>
              </Dialog.Close>
            </div>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default LoraCarousel;
