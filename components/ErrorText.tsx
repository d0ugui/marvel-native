import React from "react";
import { Text } from "react-native";

interface ErrorTextProps {
  message?: string;
}

export function ErrorText({ message }: ErrorTextProps) {
  return (
    <Text className="text-white font-psemibold text-2xl w-full text-center">
      {message}
    </Text>
  );
}
