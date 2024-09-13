import React from "react";
import { LockClosedIcon, Cross2Icon, CheckIcon } from "@radix-ui/react-icons";

const AgeConfirmationPopup: React.FC<{
  onConfirm: (isAdult: boolean) => void;
}> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <div className="mb-2">
          <LockClosedIcon className="mx-auto w-20 h-20 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-700">
          Age Verification
        </h2>
        <p className="mb-6">
          You must be at least 18 years old to enter this site.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            onClick={() => onConfirm(true)}
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
            onClick={() => onConfirm(false)}
          >
            <Cross2Icon className="w-5 h-5 mr-2" />
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeConfirmationPopup;
