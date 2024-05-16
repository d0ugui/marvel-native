import { ErrorText } from "@/components/ErrorText";
import { HeroImage } from "@/components/HeroImage";
import { Spinner } from "@/components/Spinner";
import { CharactersProps } from "@/interfaces/characters";
import { CharactersSeriesProps } from "@/interfaces/series";
import { charactersService } from "@/services/charactersService";
import { useFavoriteStore } from "@/store/favoriteStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {
  const favoriteStore = useFavoriteStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [characterInfo, setCharacterInfo] = useState<CharactersProps>();
  const [error, setError] = useState("");
  const [series, setSeries] = useState<CharactersSeriesProps[]>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const [character, series] = await Promise.all([
          charactersService.getById(id),
          charactersService.getSeries(id),
        ]);

        setSeries(series);
        setCharacterInfo(character);
      } catch (error) {
        setError("Ocorreu um erro ao buscar os dados do personagem.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading || error) {
    return (
      <SafeAreaView className="bg-[#1C1833] items-center justify-center h-full">
        {isLoading && <Spinner />}
        {error && <ErrorText message={error} />}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#1C1833] h-full">
      <View className="px-8 mt-4 h-full justify-between">
        <View>
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/bookmarks")}
              className="relative"
            >
              <AntDesign name="heart" size={24} color="#E51421" />
              {favoriteStore.favoriteCharacters.length > 0 && (
                <View className="rounded-full h-[18px] w-[18px] text-xs items-center justify-center bg-white font-psemibold absolute -bottom-1 -left-1">
                  <Text className=" text-black">
                    {favoriteStore.favoriteCharacters.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <HeroImage
            thumbnail={characterInfo?.thumbnail!}
            otherStyles="w-full h-[300px]"
          />

          <Text className="text-white font-pbold text-2xl text-center mt-4">
            {characterInfo?.name}
          </Text>
          <Text
            className="mt-2 text-[#CDCDE0] text-center text-base"
            numberOfLines={4}
          >
            {characterInfo?.description
              ? characterInfo.description
              : "Sem descrição!"}
          </Text>
        </View>

        <View className="mb-10">
          <Text className="text-white font-pbold text-xl mb-4">Series</Text>
          <View className="w-full">
            <FlatList
              data={series}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity className="flex-1 items-center justify-center w-[140px] h-[140px]">
                  <HeroImage
                    thumbnail={item.thumbnail}
                    resizeMode="contain"
                    otherStyles="w-full h-full rounded-2xl bg-white"
                  />
                </TouchableOpacity>
              )}
              horizontal
              contentContainerStyle={{ gap: 16 }}
            />
          </View>

          <TouchableOpacity
            className="w-full rounded-[50px] bg-red-500 h-14 items-center justify-center mt-10"
            onPress={() => favoriteStore.add(characterInfo!)}
          >
            <Text className="text-white font-psemibold text-lg">
              Adicionar aos favoritos
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar backgroundColor="bg-[#1C1833]" style="light" />
    </SafeAreaView>
  );
}
