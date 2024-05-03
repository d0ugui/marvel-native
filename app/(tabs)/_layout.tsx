import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#E51421",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#1C1833",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/" asChild>
              <>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          ),
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
