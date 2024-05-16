import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { normalize, typography } from "@/constants/typography";
import { colors } from "@/constants/Colors";
import Productitem from "@/components/Productitem";
import { Product, category } from "@/constants/types";
import { filterProducts, getProduct } from "@/api/products";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const products = () => {
  const finalproducts = React.useRef([] as Product[]);
  const [productsrendered, setProductsrendered] = useState([] as Product[]);
  const [filter, setFilter] = useState("All" as "All" | category);
  React.useEffect(() => {
    getProduct({ limit: 50 }).then((data) => {
      finalproducts.current = data;
      setProductsrendered(data);
    });
  }, []);
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",

    "women's clothing",
  ];
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <View>
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

                <Ionicons
                  name="person-circle"
                  size={24}
                  color={colors.darkgray}
                />
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
              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor:
                        filter === item ? colors.primary : "white",

                      borderRadius: 10,
                      marginHorizontal: 5,
                      alignSelf: "flex-start",
                    }}
                    onTouchEnd={() => {
                      setFilter(item as "All" | category);
                      if (item === "All") {
                        setProductsrendered(finalproducts.current);
                      } else {
                        filterProducts(item as category).then((data) => {
                          setProductsrendered(data);
                        });
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: filter === item ? colors.white : colors.darkgray,
                        fontSize: typography.small,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                )}
                contentContainerStyle={
                  {
                    // marginBottom: 20,
                  }
                }
                style={
                  {
                    // marginBottom: 20,
                  }
                }
              />
            </View>
            <View>
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
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[300]}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(12),
    gap: 20,
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
