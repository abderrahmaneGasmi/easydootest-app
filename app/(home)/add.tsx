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
import Spinner from "react-native-loading-spinner-overlay";
import React, { useEffect, useState } from "react";
import { normalize } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { Dropdown } from "@/components/DropDown";
import { Product } from "@/constants/types";
import * as ImagePicker from "expo-image-picker";
import { addproduct, editproduct, getProductById } from "@/api/products";
import Toast from "react-native-root-toast";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
const add = () => {
  const [product, setProduct] = useState({
    title: "",
    category: "jewelery",
    price: 0,
    description: "",
    image: "@/assets/images/logo.png",
  } as Partial<Product>);
  const navigation = useNavigation();

  const onchange = (key: string, value: string) => {
    setProduct({ ...product, [key]: value });
  };
  const [type, setType] = useState("add" as "add" | "edit");
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params.id) {
      getProductById(params.id as string).then((data) => {
        setProduct(data as Partial<Product>);
        setShowedimage({ uri: (data as Product).image as string });
        setType("edit");
        navigation.setOptions({
          title: `Edit product N ${params.id}`,
        });
      });
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [showedimage, setShowedimage] = useState(
    require("@/assets/images/logo.png")
  );
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setShowedimage({ uri: result.assets[0].uri });
    } else {
      alert("You did not select any image.");
    }
  };
  const addproductfunc = () => {
    setLoading(true);
    if (type === "add") {
      const res = addproduct(product)
        .then((data) => {
          setLoading(false);
          Toast.show("Product added successfully", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          router.replace({
            pathname: "products",
            params: {
              producttitle: product.title,
              productcategory: product.category,
              productprice: product.price,
              productimage: product.image,
              id: 1,
            },
          });
        })
        .catch((err) => {
          setLoading(false);
          Toast.show("Error adding product", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        });
    } else {
      const res = editproduct(product)
        .then((data) => {
          setLoading(false);
          Toast.show("Product modified successfully", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          router.replace({
            pathname: "products",
          });
        })
        .catch((err) => {
          setLoading(false);
          Toast.show("Error modifying product", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        });
    }
  };

  return (
    <ScrollView>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{
          color: colors.white,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: normalize(20),
            color: colors.primary,
            fontWeight: "bold",
            marginVertical: normalize(10),
          }}
        >
          {
            {
              add: "Add new product",
              edit: "Edit product N" + params.id,
            }[type]
          }
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
                value: "jewelery",
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
            value={product.category}
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
            value={product.price?.toString() || "0"}
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
            value={product.description}
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
            {
              {
                add: "Add product",
                edit: "Edit product",
              }[type]
            }
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
