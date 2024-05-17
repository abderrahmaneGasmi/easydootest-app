import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
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
