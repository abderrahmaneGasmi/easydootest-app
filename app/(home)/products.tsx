import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import Productitem from "@/components/Productitem";
import { Product } from "@/constants/types";
import { getProduct } from "@/api/products";

const products = () => {
  const finalproducts = React.useRef([] as Product[]);
  const [productsrendered, setProductsrendered] = useState([] as Product[]);
  React.useEffect(() => {
    getProduct({ limit: 50 }).then((data) => {
      finalproducts.current = data;
      setProductsrendered(data);
    });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View></View>
            <View></View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={require("@/assets/images/logo.png")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
              />

              <Text style={styles.logotext}>EasydooTest</Text>
            </View>
            <View></View>

            <Ionicons name="person-circle" size={24} color={colors.darkgray} />
          </View>
          <View style={styles.search}>
            <Ionicons name="search" size={24} color={colors.mediumgray} />
            <TextInput
              style={{
                marginLeft: 10,
                color: colors.darkgray,
                // width: "100%",
              }}
              placeholder="Search for products"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: normalize(10),
            }}
          >
            <Text
              style={{
                fontSize: typography.medium,
                color: colors.black,
                fontWeight: "bold",
              }}
            >
              50 Product
            </Text>
            <View style={styles.btns}>
              <View style={styles.btn}>
                <Text
                  style={{
                    color: colors.darkgray,
                    fontSize: typography.small,
                  }}
                >
                  Filter
                </Text>
                <Ionicons
                  name="funnel-outline"
                  size={20}
                  color={colors.darkgray}
                />
              </View>
            </View>
          </View>
          <ScrollView horizontal={false}>
            <View
              style={{
                flexDirection: "row",
                // marginVertical: 20,
                // marginBottom: 70,
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
                gap: 10,
                flex: 1,
              }}
            >
              {productsrendered.map((product, index) => {
                return (
                  <Productitem
                    key={index}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(12),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize(20),
    // padding: 20,
  },
  logotext: {
    fontSize: typography.large,
    color: colors.primary,
    fontWeight: "bold",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: normalize(10),
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    // shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});
