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

export default function Bookmarks() {
  return (
    <SafeAreaView className="bg-[#1C1833]">
      <View className="h-full px-6">
        <Text className="text-white font-psemibold text-2xl text-start w-full mt-6">
          Bookmarks
        </Text>

        <FlatList
          data={heroes}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{ gap: 16, paddingBottom: 16, paddingTop: 16 }}
          className="max-h-[94%]"
          renderItem={({ item }) => (
            <View className="flex-row gap-4 h-fit items-center justify-between">
              <Image
                source={require("../../assets/images/banner.png")}
                resizeMode="cover"
                className="w-[110px] h-[110px] rounded-2xl"
              />

              <View className="flex-1">
                <Text className="text-white text-lg font-psemibold">
                  3D Man
                </Text>

                <Text className="text-[#CDCDE0]" numberOfLines={4}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore, deleniti? Dolore odit maiores, modi esse illo
                  suscipit at voluptatem commodi dolorum pariatur, aliquam
                  similique voluptatibus temporibus fuga reprehenderit quaerat
                  ad.
                </Text>
              </View>

              <TouchableOpacity>
                <FontAwesome name="trash" size={28} color="#C92A2A" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
