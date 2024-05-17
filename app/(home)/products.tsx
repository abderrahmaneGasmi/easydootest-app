import {
  FlatList,
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
import Productitem, { ProductSkeleton } from "@/components/Productitem";
import { Product, category } from "@/constants/types";
import { deleteproduct, filterProducts, getProduct } from "@/api/products";
import SkeletonPulse from "@/components/pulse";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-root-toast";
import { useSession } from "@/context/Authcontext";

const products = () => {
  const finalproducts = React.useRef([] as Product[]);
  const [productsrendered, setProductsrendered] = useState([] as Product[]);
  const [filter, setFilter] = useState("All" as "All" | category);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  React.useEffect(() => {
    getProduct({ limit: 50 }).then((data) => {
      if (params.producttitle) {
        console.log(params);
        finalproducts.current = [
          {
            title: params.producttitle as string,
            category: params.productcategory as category,
            description: "",
            id: 1,
            image:
              "https://png2.cleanpng.com/sh/8e4ad36bb393aa828b54960211b7ff0f/L0KzQYm3U8MxN5VpiZH0aYP2gLBuTfJiepR0fNc2c3PkfrBskwMua5DpedRqcj3sfsXskv5ifJp0htN1LXH1hLrqjPUudqZyRdRqcnPydLa0VfFjbWM2Tdc8YXa8Rom1VsQyPmgASas6NUK1RIGCWMIzOmU2TpD5bne=/kisspng-barcode-scanners-codabar-international-article-num-barcode-5abe215e3af968.6416791915224098222416.png",
            price: parseFloat((params.productprice as string) || "0"),
            rating: {
              count: 0,
              rate: 0,
            },
          },
          ...data,
        ];
      } else finalproducts.current = data;
      setProductsrendered(finalproducts.current);

      setLoading(false);
    });
  }, []);
  const removeProduct = (id: number) => {
    deleteproduct(id)
      .then(() => {
        finalproducts.current = finalproducts.current.filter(
          (product) => product.id !== id
        );
        setProductsrendered(finalproducts.current);
        Toast.show("Product deleted successfully", {
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      })
      .catch((err) => {
        Toast.show("An error occured", {
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      });
  };
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",

    "women's clothing",
  ];
  const { session, isLoading } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    Toast.show("You need to sign in to access this page", {
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    router.replace({ pathname: "/sign-in" });
  }
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View>
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
                    backgroundColor: filter === item ? colors.primary : "white",

                    borderRadius: 10,
                    marginHorizontal: 5,
                    alignSelf: "flex-start",
                  }}
                  onTouchEnd={() => {
                    setFilter(item as "All" | category);
                    if (item === "All") {
                      setLoading(true);
                      setProductsrendered(finalproducts.current);
                      setTimeout(() => {
                        setLoading(false);
                      }, 500);
                    } else {
                      setLoading(true);
                      filterProducts(item as category).then((data) => {
                        setProductsrendered(data);
                        setLoading(false);
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

          {loading ? (
            <SkeletonPulse>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 10,
                  flex: 1,
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((product, index) => {
                  return (
                    // <View
                    //   style={{
                    //     width: "48%",
                    //     height: 200,
                    //     backgroundColor: colors.gray,
                    //   }}
                    //   key={index}
                    // />
                    <ProductSkeleton key={index} />
                  );
                })}
              </View>
            </SkeletonPulse>
          ) : (
            <View
              style={{
                paddingBottom: normalize(100),
              }}
            >
              <ScrollView horizontal={false}>
                <View
                  style={{
                    flexDirection: "row",
                    // marginVertical: 20,
                    marginBottom: normalize(50),
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
                        id={product.id}
                        remove={() => removeProduct(product.id)}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
      <Ionicons
        name="add-circle"
        size={normalize(40)}
        color={colors.primary}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => {
          router.push({ pathname: "/add" });
        }}
      />
    </SafeAreaView>
  );
};

export default products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingBottom: normalize(10),
    paddingHorizontal: normalize(12),
    gap: 20,
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
