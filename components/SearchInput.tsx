import React, { useState } from "react";
import {
  Alert,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { router, usePathname } from "expo-router";

interface FormFieldProps extends TextInputProps {
  initialQuery?: string;
}

export function SearchInput({ initialQuery }: FormFieldProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="bg-[#2C2C3E] gap-0 w-full h-14 px-4 rounded-xl items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert(
              "Dados incorretos",
              "Preencha o campo de busca para realizar a busca"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Feather name="search" size={28} color="#CDCDE0" />
      </TouchableOpacity>
    </View>
  );
}
