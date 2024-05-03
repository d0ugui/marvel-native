import { SearchInput } from "@/components/SearchInput";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [search, setSearch] = useState("");

  const heroes = [
    {
      id: 1,
      name: "Capitao America",
    },
    {
      id: 2,
      name: "Homem Aranha",
    },
    {
      id: 3,
      name: "Batman",
    },
    {
      id: 4,
      name: "Batman",
    },
    {
      id: 5,
      name: "Batman",
    },
    {
      id: 6,
      name: "Batman",
    },
  ];

  return (
    <SafeAreaView className="bg-[#1C1833] px-6">
      <View className="h-full items-center mt-4">
        <Image
          source={require("../../assets/images/marvel-studios-logo.png")}
          resizeMode="contain"
          className="h-8 mb-8"
        />

        <SearchInput value={search} />

        <Text className="text-white font-psemibold text-2xl text-start w-full mt-6">
          Personagens
        </Text>

        <View className="w-full mt-6">
          <FlatList
            data={heroes}
            numColumns={2}
            columnWrapperStyle={{ gap: 16, paddingHorizontal: 0 }}
            contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-1 items-center justify-center rounded-xl"
                onPress={() => router.push(`/hero/${"asudhas"}`)}
              >
                <Image
                  source={require("../../assets/images/banner.png")}
                  resizeMode="cover"
                  className="w-full h-[180px] rounded-2xl relative"
                />
                <Text className="text-white text-xl font-psemibold text-start mt-2">
                  3D Man
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
