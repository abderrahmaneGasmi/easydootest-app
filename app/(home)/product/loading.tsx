import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPulse from "@/components/pulse";
import { normalize } from "@/constants/typography";
import { colors } from "@/constants/Colors";

const ProductLoading = () => {
  return (
    <View style={styles.container}>
      <SkeletonPulse>
        <View style={styles.image} />
      </SkeletonPulse>
      <SkeletonPulse>
        <View style={styles.title} />
      </SkeletonPulse>
      <SkeletonPulse>
        <View style={styles.category} />
      </SkeletonPulse>
      <SkeletonPulse>
        <View style={styles.desc} />
      </SkeletonPulse>
      <SkeletonPulse>
        <View style={styles.subtitle} />
      </SkeletonPulse>
    </View>
  );
};

export default ProductLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: normalize(10),
    // gap: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: normalize(10),
    backgroundColor: colors.gray,
  },
  title: {
    width: "100%",
    height: 50,
    marginBottom: normalize(10),
    backgroundColor: colors.gray,
  },
  category: {
    width: "20%",
    height: 30,
    marginBottom: normalize(10),
    alignSelf: "flex-start",
    backgroundColor: colors.gray,
  },
  desc: {
    width: "100%",
    height: 220,
    marginBottom: normalize(10),
    backgroundColor: colors.gray,
  },
  subtitle: {
    width: "50%",
    height: 30,
    marginBottom: normalize(10),
    backgroundColor: colors.gray,
    alignSelf: "flex-start",
  },
});
