import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize, typography } from "@/constants/typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/Colors";
import Toast from "react-native-root-toast";
import { useSession } from "@/context/Authcontext";
import { router } from "expo-router";

const SignIn = () => {
  const [LoginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const { signIn, session } = useSession();
  if (session) {
    Toast.show("You need to sign in to access this page", {
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    router.replace({ pathname: "/products" });
  }
  const handleLogin = () => {
    if (LoginInfo.username && LoginInfo.password) {
      signIn(LoginInfo.username, LoginInfo.password);
    } else {
      Toast.show("Please fill all the fields", {
        position: Toast.positions.BOTTOM,
      });
    }
  };
  const handlechange = (type: string, value: string) => {
    setLoginInfo({
      ...LoginInfo,
      [type]: value,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View style={style.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: normalize(20),
            }}
          >
            <Image
              source={require("@/assets/images/logo.png")}
              // style={{ width: 100, height: 100 }}
            />
          </View>
          <Text style={style.title}>Sign In</Text>
          <Text style={style.subtitle}>
            Sign in with your username and password
          </Text>
          <View style={style.inputGroup}>
            <Ionicons name="person" size={24} color={colors.darkgray} />
            <TextInput
              style={style.input}
              placeholder="Username"
              onChangeText={(value) => handlechange("username", value)}
              value={LoginInfo.username}
            />
          </View>
          <View style={style.inputGroup}>
            <Ionicons name="lock-closed" size={24} color={colors.darkgray} />
            <TextInput
              style={style.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(value) => handlechange("password", value)}
              value={LoginInfo.password}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
            onTouchEnd={() => {
              Toast.show("Function not implemented", {
                position: Toast.positions.BOTTOM,
              });
            }}
          >
            <Text style={{ color: colors.primaryopacity }}>
              Forgot Password?
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: normalize(20),
            }}
            onTouchEnd={handleLogin}
          >
            <View
              style={{
                width: "100%",
                height: normalize(40),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primary,
                borderRadius: normalize(8),
              }}
            >
              <Text
                style={{ color: colors.white, fontSize: typography.medium }}
              >
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  logo: {},
  title: {
    fontSize: typography.bigtitle,
    color: colors.darkgray,
    fontFamily: "Oxygen-Bold",
    fontWeight: "bold",
    marginBottom: normalize(10),
  },
  subtitle: {
    fontSize: typography.medium,
    fontFamily: "Oxygen",
    color: colors.mediumgray,
    marginBottom: normalize(40),
  },
  inputGroup: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 10,
    paddingRight: normalize(20),
    paddingLeft: normalize(10),
    paddingVertical: normalize(10),
    borderWidth: 1,
    borderColor: colors.darkgray,
    alignItems: "center",
    backgroundColor: colors.lightgray,
    borderRadius: normalize(8),
  },
  input: {
    flex: 1,
  },
});

export default SignIn;
