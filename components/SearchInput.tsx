import React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

interface FormFieldProps extends TextInputProps {
  value: string;
}

export function SearchInput({ value }: FormFieldProps) {
  return (
    <View className="bg-[#2C2C3E] gap-0 w-full h-14 px-4 rounded-xl items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search"
        placeholderTextColor="#555561"
      />

      <TouchableOpacity>
        <Feather name="search" size={28} color="#555561" />
      </TouchableOpacity>
    </View>
  );
}
