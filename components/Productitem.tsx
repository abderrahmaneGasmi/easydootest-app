import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import { category } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Productitem = ({
  category,
  title,
  price,
  image,
  id,
  remove,
  showbtns = true,
}: {
  category: category;
  title: string;
  price: number;
  image: string;
  id: number;
  remove?: () => void;
  showbtns?: boolean;
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
      <View
        onTouchEnd={() => {
          router.push({
            pathname: `/product/${id}`,
          });
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            height: normalize(120),
            borderRadius: 20,
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.info}>
        <View
          onTouchEnd={() => {
            router.push({
              pathname: `/product/${id}`,
            });
          }}
        >
          <Text style={styles.title}>
            {title.slice(0, 60) + (title.length > 60 ? "..." : "")}
          </Text>
          <Text
            style={{
              ...categoryclass(category),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(8),
              borderRadius: 10,
              textAlign: "center",
              alignSelf: "flex-start",
              marginTop: normalize(5),
              fontSize: typography.small,
            }}
          >
            {category}
          </Text>
          <Text style={styles.price}>{price} DA</Text>
        </View>
        {showbtns && (
          <View style={styles.btns}>
            <View
              style={{
                flex: 0.88,
                padding: normalize(5),
                borderRadius: 5,
                backgroundColor: colors.primary,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onTouchEnd={() => {
                router.push({
                  pathname: `/add`,
                  params: {
                    id,
                  },
                });
              }}
            >
              <Ionicons
                name="create-outline"
                size={normalize(14)}
                color={colors.white}
                style={{ marginRight: normalize(5) }}
              />
              <Text
                style={{
                  color: colors.white,

                  fontSize: typography.small,
                  fontWeight: "bold",
                }}
              >
                Modify
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.red,
                padding: normalize(5),
                borderRadius: 10,
                marginLeft: normalize(5),
                flex: 0.12,
              }}
              onTouchEnd={remove}
            >
              <Ionicons
                name="trash-outline"
                size={normalize(14)}
                color={colors.white}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export const ProductSkeleton = () => {
  return (
    <View style={{ ...styles.card, height: normalize(200) }}>
      <View
        style={{
          height: normalize(120),
          backgroundColor: colors.lightgray,
          borderRadius: 20,
          width: "100%",
        }}
      ></View>
      <View style={{ ...styles.info, gap: 10 }}>
        <View
          style={{
            backgroundColor: colors.lightgray,
            width: "80%",
            height: normalize(20),
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        />
        <View
          style={{
            backgroundColor: colors.lightgray,
            width: "20%",
            height: normalize(10),
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        />
        <View
          style={{
            backgroundColor: colors.lightgray,
            width: "50%",
            height: normalize(20),
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        />
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
    flexGrow: 1,
  },
  title: {
    fontSize: typography.medium,
    fontWeight: "bold",
  },
  price: {
    fontSize: typography.medium,
    color: colors.black,
    marginTop: normalize(5),
    fontFamily: "Oxygen-Bold",
    fontWeight: "bold",
  },
  btns: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: normalize(10),
    flexGrow: 1,
  },
});
