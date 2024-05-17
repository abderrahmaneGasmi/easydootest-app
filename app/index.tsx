import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import products from "./(home)/products";
import add from "./(home)/add";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.2)",
            "rgba(0, 0, 0, 0.2)",
            // "rgba(0, 0, 0, 0)",
            // "rgba(0, 0, 0, 0.1)",
            // "rgba(0, 0, 0, 0)",
            // "rgba(0, 0, 0, 0.1)",
            "rgba(0, 0, 0, 0.3)",
            "rgba(0, 0, 0, 0.45)",
            "rgba(0, 0, 0, 0.6)",
            "rgba(0, 0, 0, 0.75)",
            "rgba(0, 0, 0, 0.9)",
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <Image
          source={require("@/assets/images/background.jpg")}
          style={style.backgound}
        />
        <View style={style.container}>
          {/* <Image
            source={require("@/assets/images/logo.png")}
            style={style.image}
          /> */}
          <View style={{}}>
            <Text style={style.text}>EasydooTest - Project</Text>
            <Text style={style.subtext}>
              created with Expo and React Native to manage products
            </Text>
          </View>
          <TouchableOpacity
            style={style.btn}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/sign-in");
            }}
          >
            <Text style={style.btntext}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "#f5fcff",
    gap: normalize(25),
    padding: normalize(30),
    fontFamily: "Oxygen",
  },
  image: {
    // marginTop: 100,
  },
  backgound: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  text: {
    fontSize: typography.xbig,
    textAlign: "center",
    margin: 5,
    color: colors.white,
    fontWeight: "bold",
    fontFamily: "Oxygen-Bold",
  },
  subtext: {
    fontSize: typography.small,
    textAlign: "center",
    // margin: 10,
    color: colors.whitewithopacity,
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
    padding: 10,
    marginBottom: normalize(70),
    marginHorizontal: normalize(20),
  },
  btntext: {
    color: colors.white,
    fontSize: typography.medium,
    fontFamily: "Oxygen-Bold",
    textAlign: "center",
  },
});

export default products;
