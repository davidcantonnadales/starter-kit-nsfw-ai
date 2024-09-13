import React from "react";
import * as Progress from "@radix-ui/react-progress";
import { FaStar } from "react-icons/fa";
import { Card } from "@radix-ui/themes";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface ProgressBarProps {
  maxGenerationLimit: number;
  usedGenerations: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  maxGenerationLimit,
  usedGenerations,
}) => {
  if (maxGenerationLimit === -1000) {
    return (
      <div className="flex items-center justify-center p-4 border rounded bg-yellow-100">
        <FaStar className="text-yellow-500 w-8 h-8 mr-2" />
        <div className="text-xl font-bold text-yellow-700">
          You are Premium Ultra! Unlimited generations!
        </div>
      </div>
    );
  }

  const remainingGenerations = maxGenerationLimit - usedGenerations;
  const percentage = (remainingGenerations / maxGenerationLimit) * 100;

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Generations Remaining {remainingGenerations}/{maxGenerationLimit}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress.Root className="relative w-full h-4 bg-gray-300 rounded">
          <Progress.Indicator
            className="absolute h-full bg-blue-600 rounded"
            style={{ width: `${percentage}%` }}
          />
        </Progress.Root>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
