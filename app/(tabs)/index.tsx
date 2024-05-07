import { SearchInput } from "@/components/SearchInput";
import { CharactersProps } from "@/interfaces/characters";
import { getAll } from "@/services/charactersService/getAll";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
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

  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState<[] | CharactersProps[]>(
    []
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getAll();

      setCharactersData(res);
      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView className="bg-[#1C1833]">
      <View className="h-full items-center mt-4 px-6">
        <Image
          source={require("../../assets/images/marvel-studios-logo.png")}
          resizeMode="contain"
          className="h-8 mb-8"
        />

        <SearchInput />

        <View className="w-full mt-6">
          <FlatList
            data={charactersData}
            numColumns={2}
            columnWrapperStyle={{ gap: 16, paddingHorizontal: 0 }}
            contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id}
            className="max-h-[97%]"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-1 items-center justify-center rounded-md"
                onPress={() => router.push(`/hero/${"asudhas"}`)}
              >
                <Image
                  source={
                    item.thumbnail.path.includes("image_not_available")
                      ? require("../../assets/images/not-found.jpg")
                      : {
                          uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                        }
                  }
                  resizeMode="cover"
                  className="w-full h-[140px] rounded-2xl relative"
                />
                <Text
                  className="text-white text-xl font-psemibold mt-2 text-center"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
              <Text className="text-white font-psemibold text-2xl text-start w-full">
                Personagens
              </Text>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
