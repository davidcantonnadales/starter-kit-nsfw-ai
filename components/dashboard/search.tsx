import React, { useState } from "react";
import { Button, Card, Select, TextArea, TextField } from "@radix-ui/themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  InfoCircledIcon,
  Cross1Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { CommunityModelResponse } from "@/lib/models/CommunityModelResponse";
import Carousel from "./carrousel";
import LoraCarousel from "./lora-carrousel";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ModelPreview from "./model-preview";
import Swal from "sweetalert2";
import FilePreview from "./file-preview";

interface SearchComponentProps {
  selectedModel: CommunityModelResponse | null;
  loraSelectedModel: CommunityModelResponse | null;
  prompt: string | null;
  activeTab: "text2img" | "img2img";
  userToken: string;
  negativePrompts: { name: string; value: string }[];
  fetching: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleGenerateImage: (base64Image: string | null) => void;

  isPublic: boolean;
  handleIsPublicChange: () => void;
  handleModelSelect: (model: CommunityModelResponse | null) => void;
  handleLoraModelSelect: (model: CommunityModelResponse | null) => void;
  isNSFW: boolean;
  improveHumanBody: boolean;
  handleIsNSFWChange: () => void;
  handleImproveHumanBodyChange: () => void;
  size: string;
  handleSizeChange: (e: string) => void;
  handleAddNegativePrompt: (chipToAdd: { name: string; value: string }) => void;
  handleDeleteNegativePrompt: (chipToDelete: {
    name: string;
    value: string;
  }) => void;
}

const negativePromptsList = [
  { name: "Half Head", value: "half head" },
  { name: "Chopped Head", value: "chopped head" },
  { name: "Yellow Skin", value: "yellow skin" },
  { name: "Pubic Hair", value: "pubic hair" },
  { name: "Discolored Labia", value: "discolored labia" },
  { name: "Blurred Eyes", value: "blurred eyes" },
  { name: "Badly Drawn Eyes", value: "badly drawn eyes" },
  { name: "Worst Quality Eyes", value: "worst quality eyes" },
  {
    name: "Quality Issues",
    value:
      "worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4",
  },
  {
    name: "Watermark and Text",
    value:
      "watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2",
  },
  { name: "Blur Effects", value: "blur, blurry, grainy" },
  { name: "Morbid", value: "morbid" },
  { name: "Ugly", value: "ugly" },
  { name: "Asymmetrical", value: "asymmetrical" },
  { name: "Mutated Malformed", value: "mutated malformed" },
  { name: "Mutilated", value: "mutilated" },
  { name: "Poorly Lit", value: "poorly lit" },
  { name: "Bad Shadow", value: "bad shadow" },
  { name: "Draft", value: "draft" },
  { name: "Cropped", value: "cropped" },
  { name: "Out of Frame", value: "out of frame" },
  { name: "Cut Off", value: "cut off" },
  { name: "Censored", value: "censored" },
  { name: "JPEG Artifacts", value: "jpeg artifacts" },
  { name: "Out of Focus", value: "out of focus" },
  { name: "Glitch", value: "glitch" },
  { name: "Duplicate", value: "duplicate" },
  {
    name: "Unrealistic Art",
    value:
      "airbrushed, cartoon, anime, semi-realistic, cgi, render, blender, digital art, manga, amateur:1.3",
  },
  {
    name: "3D Elements",
    value: "3D, 3D Game, 3D Game Scene, 3D Character:1.1",
  },
  {
    name: "Bad Features",
    value:
      "bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3",
  },
];
const SearchComponent: React.FC<SearchComponentProps> = ({
  selectedModel,
  activeTab,
  loraSelectedModel,
  userToken,
  negativePrompts,
  fetching,
  handleInputChange,
  handleGenerateImage,
  handleModelSelect,
  handleLoraModelSelect,
  size,
  prompt,
  handleSizeChange,
  handleAddNegativePrompt,
  handleDeleteNegativePrompt,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleAdd = (chipToAdd: { name: string; value: string }) => {
    console.log(chipToAdd);
    handleAddNegativePrompt(chipToAdd);
    setSearchValue("");
    setShowDropdown(false);
  };

  const handleDelete = (chipToDelete: { name: string; value: string }) => {
    handleDeleteNegativePrompt(chipToDelete);
    setSearchValue("");
    setShowDropdown(false);
  };

  const handleAddAll = () => {
    negativePromptsList.forEach((prompt) => handleAddNegativePrompt(prompt));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setImage(null);
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      Swal.fire("Error", "Only JPG and PNG files are allowed.", "error");
      setImage(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire("Error", "File size exceeds 10 MB.", "error");
      setImage(null);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAll = () => {
    negativePrompts.forEach((prompt) => handleDeleteNegativePrompt(prompt));
  };

  const filteredPrompts = negativePromptsList.filter((prompt) =>
    prompt.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Generate image with {selectedModel?.name} model{" "}
            {loraSelectedModel ? loraSelectedModel?.name : ""}
          </CardTitle>
          <CardDescription>
            Enter a prompt to generate an image using the model{" "}
            {selectedModel?.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-col auto-cols-min gap-4 mb-4">
            <ModelPreview
              selectedModel={selectedModel}
              title="Selected Model"
              color="pink"
              onDelete={() => handleModelSelect(null)}
            />
            <ModelPreview
              selectedModel={loraSelectedModel}
              title="Selected Lora Model"
              color="blue"
              onDelete={() => handleLoraModelSelect(null)}
            />

            {activeTab === "img2img" && (
              <FilePreview
                selectedModel={image}
                title="Selected Image"
                color="green"
                onDelete={() => setImage(null)}
              />
            )}
          </div>
          <div className="grid sm:grid-flow-col sm:space-x-4 items-start w-full mb-4">
            <TextArea
              size={"3"}
              disabled={fetching}
              onChangeCapture={handleInputChange}
              className="p-2 border flex-grow rounded flex bg-transparent col-span-12 mb-2"
              placeholder="Write your prompt here..."
            ></TextArea>
          </div>

          {activeTab === "img2img" && (
            <div className="grid sm:grid-flow-col sm:space-x-4 items-start w-full mb-4">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          )}

          <div className="grid sm:grid-flow-col sm:space-x-4 items-start w-full mb-4">
            <Select.Root
              defaultValue="Portrait"
              size={"3"}
              value={size}
              onValueChange={handleSizeChange}
            >
              <Select.Trigger className="p-2 border rounded bg-transparent mb-2" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Size</Select.Label>
                  <Select.Item value="Square">Square 1024x1024</Select.Item>
                  <Select.Item value="Portrait">Portrait 768x1024</Select.Item>
                  <Select.Item value="Landscape">
                    Landscape 1024x768
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <div className="flex flex-wrap gap-2">
              <Carousel
                token={userToken}
                selectedModel={selectedModel}
                handleModelSelect={handleModelSelect}
              />
              <LoraCarousel
                token={userToken}
                selectedLoraModel={loraSelectedModel}
                selectedModel={selectedModel}
                handleModelSelect={handleLoraModelSelect}
              />
              <Button
                size={"3"}
                disabled={
                  fetching ||
                  !selectedModel ||
                  !prompt ||
                  (activeTab === "text2img" && !prompt) ||
                  (activeTab === "img2img" && !image)
                }
                color="green"
                onClick={() => handleGenerateImage(image)}
                className="p-2 bg-blue-600 text-white rounded mb-2"
              >
                {fetching ? "Generating..." : "Generate image"}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-flow-col sm:space-x-4 items-start w-full">
            <Select.Root
              value={size}
              size={"3"}
              defaultValue="placeholder"
              onValueChange={(value) => handleAdd({ name: value, value })}
            >
              <Select.Trigger className="p-2 border rounded flex-grow mb-2 sm:mb-0 bg-transparent md:col-span-12">
                Select a negative prompt
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Negative Prompt</Select.Label>

                  {filteredPrompts.map((prompt) => (
                    <Select.Item
                      value={prompt.value}
                      key={prompt.value}
                      onSelect={() => handleAdd(prompt)}
                    >
                      {prompt.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleAddAll}
                size={"3"}
                disabled={negativePrompts.length === negativePromptsList.length}
                className="bg-blue-600 text-white rounded mb-2 flex-grow"
              >
                Add all
              </Button>
              <Button
                size={"3"}
                disabled={negativePrompts.length === 0}
                onClick={handleDeleteAll}
                className="bg-red-600 text-white rounded mb-2 flex-grow"
              >
                Delete all
              </Button>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {negativePrompts.map((prompt) => (
              <div
                key={prompt.value}
                className="flex items-center space-x-2 bg-blue-600 px-2 py-1 rounded-full"
              >
                <span>{prompt.name}</span>
                <Cross1Icon
                  className="cursor-pointer"
                  onClick={() => handleDelete(prompt)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchComponent;
