import { EmptyState } from "@/components/EmptyState";
import { useFavoriteStore } from "@/store/favoriteStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Bookmarks() {
  const favoriteStore = useFavoriteStore();

  return (
    <SafeAreaView className="bg-[#1C1833]">
      <View className="h-full px-6">
        <Text className="text-white font-psemibold text-2xl text-start w-full mt-6">
          Bookmarks
        </Text>

        <FlatList
          data={favoriteStore.favoriteCharacters}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{ gap: 16, paddingBottom: 16, paddingTop: 16 }}
          className="max-h-[94%]"
          renderItem={({ item }) => (
            <View className="flex-row gap-4 h-fit items-center justify-between">
              <Image
                source={
                  item.thumbnail.path.includes("image_not_available")
                    ? require("../../assets/images/not-found.jpg")
                    : {
                        uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                      }
                }
                resizeMode="cover"
                className="w-[110px] h-[110px] rounded-2xl"
              />

              <View className="flex-1">
                <Text className="text-white text-lg font-psemibold">
                  {item.name}
                </Text>

                <Text className="text-[#CDCDE0]" numberOfLines={4}>
                  {item.description}
                </Text>
              </View>

              <TouchableOpacity onPress={() => favoriteStore.remove(item.id)}>
                <FontAwesome name="trash" size={28} color="#C92A2A" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState message="Você não selecionou nenhum personagem como favorito." />
          }
        />
      </View>
    </SafeAreaView>
  );
}
