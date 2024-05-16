import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View className="items-center mt-10">
      <FontAwesome name="exclamation-circle" size={84} color="#E51421" />
      <Text className="text-center w-[80%] font-psemibold text-2xl text-[#CDCDE0]">
        {message}
      </Text>
    </View>
  );
}
