import { CommunityModelResponse } from "@/lib/models/CommunityModelResponse";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

interface ModelPreviewProps {
  selectedModel: string | null;
  onDelete: () => void;
  title: string;
  color: string;
}

const FilePreview: React.FC<ModelPreviewProps> = ({
  selectedModel,
  onDelete,
  title,
  color,
}) => {
  return (
    <div className={`relative w-32`}>
      <div className="text-md text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
      <div
        className={`relative h-32 w-full bg-cover bg-top rounded-lg border-${color}-500 border-2`}
        style={{
          backgroundImage: `url(${
            selectedModel ? selectedModel : "/assets/image/no-image.webp"
          })`,
        }}
      >
        {selectedModel && (
          <div className="absolute h-8 w-8 top-2 left-2 bg-cyan-500 p-1 rounded-full">
            <TrashIcon className="h-6 w-6 cursor-pointer" onClick={onDelete} />
          </div>
        )}
      </div>
      <div className="text-md text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {selectedModel ? "Your image" : "No image selected"}
      </div>
    </div>
  );
};

export default FilePreview;
