import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/context/Authcontext";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";

const HomeLayout = () => {
  const { session, isLoading } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="(auth)" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="products"
        options={{
          headerShown: true,
          header: ({ navigation }) => <Header />,
        }}
      />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen
        name="add"
        options={{
          title: "Add Product",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
