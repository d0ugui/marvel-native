import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View>
      <Text>Olá, tabs</Text>
      <TouchableOpacity
        className="w-full rounded-lg bg-[#FF0000]"
        onPress={() => router.push("/")}
      >
        <Text>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
}
