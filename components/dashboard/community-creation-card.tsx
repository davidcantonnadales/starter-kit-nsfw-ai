import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
import { GenerateResponse } from "@/lib/models/GenerateResponse";

import { FaCopy, FaLock, FaUnlock } from "react-icons/fa";
import Image from "next/image";

interface CommunityCreationProps {
  creation: GenerateResponse;
  index: number;
  openModal: (creation: GenerateResponse) => void;
  copyToClipboard: (prompt: string) => void;
}

const CommunityCreationCard = ({
  index,
  creation,
  copyToClipboard,
  openModal,
}: CommunityCreationProps) => {
  return (
    <div key={index} className="relative">
      <Image
        src={`${creation.output[0]}`}
        alt={`Community Creation ${index + 1}`}
        className="rounded-lg w-full h-auto object-cover cursor-pointer"
        onClick={() => openModal(creation)}
        height={300}
        width={300}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
        {creation?.request?.request.prompt}
      </div>
      <div
        className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer"
        onClick={() => copyToClipboard(creation.prompt || "")}
      >
        <FaCopy className="text-black" />
      </div>
    </div>
  );
};

export default CommunityCreationCard;
