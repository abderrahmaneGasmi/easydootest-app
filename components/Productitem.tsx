import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import { category } from "@/constants/types";

const Productitem = ({
  category,
  title,
  price,
  image,
}: {
  category: category;
  title: string;
  price: number;
  image: string;
}) => {
  const categoryclass = (category: category) => {
    switch (category) {
      case "electronics":
        return {
          backgroundColor: "rgb(147, 197, 253)",
          color: "rgb(37, 99, 235)",
        };
      case "jewelery":
        return {
          backgroundColor: "rgb(252, 211, 77)",
          color: "rgb(217, 119, 6)",
        };
      case "men's clothing":
        return {
          backgroundColor: "rgb(110, 231, 183)",
          color: "rgb(5, 150, 105)",
        };
      case "women's clothing":
        return {
          backgroundColor: "rgb(249, 168, 212)",
          color: "rgb(219, 39, 119)",
        };
      default:
        return {
          backgroundColor: "rgb(147, 197, 253)",
          color: "rgb(37, 99, 235)",
        };
    }
  };
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={{
          height: normalize(120),
          borderRadius: 20,
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <View style={styles.info}>
        <Text style={styles.title}>
          {title.slice(0, 60) + (title.length > 60 ? "..." : "")}
        </Text>
        <Text
          style={{
            ...categoryclass(category),
            paddingVertical: normalize(5),
            paddingHorizontal: normalize(10),
            borderRadius: 10,
            textAlign: "center",
            alignSelf: "flex-start",
            marginTop: normalize(5),
          }}
        >
          {category}
        </Text>
        <Text style={styles.price}>{price} DA</Text>
      </View>
    </View>
  );
};

export default Productitem;

const styles = StyleSheet.create({
  card: {
    width: normalize(145),

    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  info: {
    padding: normalize(10),
  },
  title: {
    fontSize: typography.medium,
    fontWeight: "bold",
  },
  price: {
    fontSize: typography.large,
    color: colors.black,
    fontWeight: "bold",
    marginTop: normalize(5),
  },
});
