import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/context/Authcontext";

const HomeLayout = () => {
  const { session, isLoading } = useSession();
  console.log(session);
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
          headerShown: false,
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
