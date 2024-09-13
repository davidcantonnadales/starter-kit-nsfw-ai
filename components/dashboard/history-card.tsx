import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
import { GenerateResponse } from "@/lib/models/GenerateResponse";

import { FaLock, FaUnlock } from "react-icons/fa";
import Image from "next/image";

interface HistorialCardProps {
  creation: GenerateResponse;
  index: number;
  role: string;
  openModal: (creation: GenerateResponse) => void;
}

const HistorialCard = ({
  index,
  creation,
  role,
  openModal,
}: HistorialCardProps) => {
  const calculateRemainingDays = (creationDate: any | undefined) => {
    if (!creationDate) {
      return 0;
    }

    const convertedDate = new Date(
      creationDate._seconds * 1000 + creationDate._nanoseconds / 1000000
    );

    const currentDate = new Date();
    const createdAt = convertedDate;

    const diffTime = Math.abs(currentDate.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeletionMessage = (creation: GenerateResponse) => {
    if (creation.createdAt === undefined) {
      return `This image will be deleted soon.`;
    }

    const daysSinceCreation =
      calculateRemainingDays(creation.createdAt as any) || 0;
    if (role === "Ultra") {
      return "This image will never be deleted.";
    } else if (role === "Basic" || role === "Premium") {
      const daysLeft = 30 - Number(daysSinceCreation);
      return daysLeft > 0
        ? `This image will be deleted in ${daysLeft} days.`
        : `This image will be deleted soon.`;
    }
  };

  return (
    <div key={index} className="relative">
      <Image
        width={300}
        height={300}
        src={`${creation.output[0]}`}
        alt={`Creation ${index + 1}`}
        className="rounded-lg cursor-pointer"
        onClick={() => openModal(creation)}
      />

      <div className="absolute top-2 left-2 bg-white p-1 rounded-full">
        {creation.isPublic ? (
          <FaUnlock className="text-green-500" />
        ) : (
          <FaLock className="text-red-500" />
        )}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        {getDeletionMessage(creation)}
      </div>
    </div>
  );
};

export default HistorialCard;
