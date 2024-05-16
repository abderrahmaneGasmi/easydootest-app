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
      <Stack.Screen
        name="product/[id]"
        options={
          {
            // headerTitle: "Product Details",
          }
        }
      />
    </Stack>
  );
};

export default HomeLayout;
