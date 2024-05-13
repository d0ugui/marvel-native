import { CharactersProps } from "@/interfaces/characters";
import { CharactersSeriesProps } from "@/interfaces/series";
import { charactersService } from "@/services/charactersService";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {
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
        {isLoading && <ActivityIndicator size="large" color="#E51421" />}
        {error && (
          <Text className="text-white font-psemibold text-2xl w-full text-center">
            {error}
          </Text>
        )}
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
          </View>

          <Image
            source={
              characterInfo?.thumbnail.path.includes("image_not_available")
                ? require("../../assets/images/not-found.jpg")
                : {
                    uri: `${characterInfo?.thumbnail.path}.${characterInfo?.thumbnail.extension}`,
                  }
            }
            resizeMode="cover"
            className="w-full h-[300px] rounded-2xl bg-red-500"
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
                  <Image
                    source={
                      item.thumbnail.path.includes("image_not_available")
                        ? require("../../assets/images/not-found.jpg")
                        : {
                            uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                          }
                    }
                    resizeMode="contain"
                    className="w-full h-full rounded-2xl bg-white"
                  />
                </TouchableOpacity>
              )}
              horizontal
              contentContainerStyle={{ gap: 16 }}
            />
          </View>

          <TouchableOpacity className="w-full rounded-[50px] bg-red-500 h-14 items-center justify-center mt-10">
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
