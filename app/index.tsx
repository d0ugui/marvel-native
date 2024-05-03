import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="bg-[#1C1833]">
      <View className="p-8 flex-col items-center justify-center h-full relative">
        <Image
          source={require("../assets/images/shield.png")}
          className="w-60 h-60"
          resizeMode="contain"
        />

        <Image
          source={require("../assets/images/marvel-logo.png")}
          className="w-full"
          resizeMode="cover"
        />

        <Text className="text-white font-psemibold text-2xl mt-5 text-center">
          Sua enciclopédia {"\n"}
          do universo marvel
        </Text>

        <Text className="text-white font-pregular mt-5 text-lg">
          Encontre seus heróis favoritos
        </Text>

        <TouchableOpacity
          className="w-full rounded-lg bg-[#FF0000] h-14 items-center justify-center mt-5"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="font-pbold text-2xl text-white">Vamos lá</Text>
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor="bg-[#1C1833]" style="light" />
    </SafeAreaView>
  );
}
