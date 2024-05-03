import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const series = [
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
  ];

  return (
    <SafeAreaView className="bg-[#1C1833] h-full">
      <View className="px-8 mt-4">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/banner.png")}
          resizeMode="cover"
          className="w-full h-[300px] rounded-2xl bg-red-500"
        />

        <Text className="text-white font-pbold text-2xl text-center mt-4">
          3-D Man
        </Text>
        <Text className="mt-2 text-[#CDCDE0] text-center text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
          suscipit officia sit similique deleniti enim harum sunt non molestiae
          quasi, nam quod voluptatum nisi ullam architecto cupiditate dolor
          assumenda quibusdam.
        </Text>

        <View className="w-full mt-10">
          <FlatList
            data={series}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity className="flex-1 items-center justify-center w-[140px] h-[140px]">
                <Image
                  source={require("../../assets/images/banner.png")}
                  resizeMode="contain"
                  className="w-full h-full rounded-2xl"
                />
              </TouchableOpacity>
            )}
            horizontal
            contentContainerStyle={{ gap: 16 }}
          />
        </View>

        <TouchableOpacity className="w-full rounded-md bg-red-500 h-14 items-center justify-center mt-10">
          <Text className="text-white font-psemibold text-lg">
            Adicionar aos favoritos
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor="bg-[#1C1833]" style="light" />
    </SafeAreaView>
  );
}
