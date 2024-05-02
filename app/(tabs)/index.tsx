import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView>
      <Text>Olá, tabs</Text>
      <TouchableOpacity
        className="w-full rounded-lg bg-[#FF0000]"
        onPress={() => router.push("/")}
      >
        <Text>Let's Go</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
