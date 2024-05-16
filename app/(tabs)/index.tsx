import { EmptyState } from "@/components/EmptyState";
import { ErrorText } from "@/components/ErrorText";
import { HeroImage } from "@/components/HeroImage";
import { SearchInput } from "@/components/SearchInput";
import { Spinner } from "@/components/Spinner";
import { CharactersProps } from "@/interfaces/characters";
import { getAll } from "@/services/charactersService/getAll";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState<[] | CharactersProps[]>(
    []
  );

  async function getCharacters() {
    const characters = await getAll(page);

    if (characters) {
      setCharactersData((prevState) => [...prevState, ...characters]);
      setPage((prevState) => prevState + 1);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await getCharacters();
      } catch (error) {
        setError("Ocorreu um erro ao estabelecer conexão com a API.");
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
    <SafeAreaView className="bg-[#1C1833]">
      <View className="h-full items-center mt-4 px-6">
        <Image
          source={require("../../assets/images/marvel-studios-logo.png")}
          resizeMode="contain"
          className="h-8 mb-8"
        />

        <SearchInput />

        <View className="w-full mt-6 h-[85%]">
          {charactersData.length > 0 ? (
            <FlatList
              data={charactersData}
              numColumns={3}
              columnWrapperStyle={{ gap: 16 }}
              contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item.id}
              className="max-h-[97%]"
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-1 items-center justify-center rounded-md"
                  onPress={() => router.push(`/hero/${item.id}`)}
                >
                  <HeroImage
                    thumbnail={item.thumbnail}
                    otherStyles="w-full h-[140px]"
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
              ListFooterComponent={
                charactersData.length > 0 ? <Spinner /> : null
              }
              onEndReached={getCharacters}
              onEndReachedThreshold={0.1}
            />
          ) : (
            <EmptyState message="A busca não obteve resultados." />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
