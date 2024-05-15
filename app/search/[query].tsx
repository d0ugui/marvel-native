import { SearchInput } from "@/components/SearchInput";
import { CharactersProps } from "@/interfaces/characters";
import { charactersService } from "@/services/charactersService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [heroResults, setHeroResults] = useState<CharactersProps[] | undefined>(
    undefined
  );
  const { query } = useLocalSearchParams<{ query: string }>();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function getCharactersBySearchParams() {
    const results = await charactersService.getByName(query);

    setHeroResults(results);
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await getCharactersBySearchParams();
      } catch (error) {
        setError("Ocorreu um buscar os dados da query.");
      } finally {
        setIsLoading(false);
        setIsFirstLoading(false);
      }
    })();
  }, [query]);

  if (isFirstLoading || error) {
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
    <SafeAreaView className="bg-[#1C1833]">
      <View className="h-full mt-4 px-6">
        <View className="py-4 flex-row items-center justify-between">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="home" size={32} color="#CDCDE0" />
          </TouchableOpacity>
        </View>

        <SearchInput initialQuery={query} />

        <View className="w-full mt-6">
          {isLoading ? (
            <ActivityIndicator size="large" color="#E51421" />
          ) : (
            <FlatList
              data={heroResults}
              numColumns={3}
              columnWrapperStyle={{ gap: 16, paddingHorizontal: 0 }}
              contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-1 items-center justify-center rounded-xl"
                  onPress={() => router.push(`/hero/${item.id}`)}
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
                    className="w-full h-[180px] rounded-2xl relative"
                  />
                  <Text className="text-white text-xl font-psemibold text-start mt-2">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
