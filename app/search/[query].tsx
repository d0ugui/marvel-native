import { SearchInput } from "@/components/SearchInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function Search() {
  const { query } = useLocalSearchParams<{ query: string }>();

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
