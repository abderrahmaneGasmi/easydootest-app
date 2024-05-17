import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { normalize } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { Dropdown } from "@/components/DropDown";
import { Product } from "@/constants/types";
import * as ImagePicker from "expo-image-picker";
import { addproduct } from "@/api/products";
const add = () => {
  const [product, setProduct] = useState({
    title: "",
    category: "jewelery",
    price: 0,
    description: "",
    image: "@/assets/images/logo.png",
  } as Partial<Product>);
  const onchange = (key: string, value: string) => {
    setProduct({ ...product, [key]: value });
  };
  const [showedimage, setShowedimage] = useState(
    require("@/assets/images/logo.png")
  );
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onchange("image", result.assets[0].uri);
      setShowedimage({ uri: result.assets[0].uri });
    } else {
      alert("You did not select any image.");
    }
  };
  const addproductfunc = async () => {
    const res = addproduct(product).then((data) => console.log(data));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: normalize(20),
            color: colors.primary,
            fontWeight: "bold",
            marginVertical: normalize(10),
          }}
        >
          Add new product
        </Text>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Product image</Text>
        </View>
        <View
          style={{
            position: "relative",
          }}
          onTouchEnd={pickImageAsync}
        >
          <Image source={showedimage} style={styles.image} />
          <Ionicons
            name="cloud-download-outline"
            size={normalize(20)}
            color={colors.white}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: colors.primary,
              borderRadius: normalize(15),
              padding: normalize(5),
            }}
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Product title</Text>
          <TextInput
            style={styles.input}
            placeholder="Product name"
            placeholderTextColor={colors.gray}
            onChangeText={(text) => onchange("title", text)}
            value={product.title}
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Product category</Text>
          <Dropdown
            items={[
              {
                label: "Electronics",
                value: "electronics",
              },
              {
                label: "Jewelery",
                value: "Jewelery",
              },
              {
                label: "men's clothing",
                value: "men's clothing",
              },
              {
                label: "women's clothing",
                value: "women's clothing",
              },
            ]}
            onValueChange={(value) => onchange("category", value)}
            style={{
              viewContainer: {
                backgroundColor: colors.lightgray,
              },
            }}
          ></Dropdown>
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Product price</Text>
          <TextInput
            style={styles.input}
            placeholder="Product price"
            placeholderTextColor={colors.gray}
            keyboardType="number-pad"
            onChangeText={(text) => onchange("price", text)}
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={styles.input}
            placeholder="Product description"
            placeholderTextColor={colors.gray}
            multiline
            numberOfLines={4}
            onChangeText={(text) => onchange("description", text)}
          />
        </View>
        <Pressable
          onPress={() => {
            addproductfunc();
          }}
          style={styles.btn}
        >
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: normalize(14),
            }}
          >
            Add product
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: normalize(10),
    alignItems: "center",
    // gap: 10,
  },
  image: {
    width: normalize(150),
    height: normalize(150),
    marginVertical: normalize(10),
    borderRadius: normalize(25),
    borderWidth: 1,
    borderColor: "black",
  },
  inputgroup: {
    gap: normalize(5),
    width: "100%",
  },
  label: {
    fontSize: normalize(14),
    color: colors.black,
    fontWeight: "bold",
    marginTop: normalize(10),
  },
  input: {
    width: "100%",
    // height: normalize(40),
    backgroundColor: colors.lightgray,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    color: colors.black,
    fontSize: normalize(14),
  },
  btn: {
    backgroundColor: colors.primary,
    padding: normalize(10),
    borderRadius: normalize(5),
    marginVertical: normalize(10),
    fontSize: normalize(20),
  },
});
