import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { filterProducts, getProductById } from "@/api/products";
import { Product, category } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { normalize, typography } from "@/constants/typography";
import Productitem from "@/components/Productitem";
import ProductLoading from "./loading";

const product = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
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
  const [product, setProduct] = useState({} as Product);
  const [products, setProducts] = useState([] as Product[]);
  const [loading, setLoading] = useState(true);
  if (!id) return <Text>Product not found</Text>;
  React.useEffect(() => {
    getProductById(id as string)
      .then((data) => {
        setProduct(data as Product);
        filterProducts(data?.category as category).then((data) => {
          setProducts(data);
          setLoading(false);
        });
      })
      .catch(() => {
        setLoading(false);
      });
    navigation.setOptions({
      title: `Product N ${id}`,
    });
  }, []);
  if (loading) return <ProductLoading />;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            // paddingRight: normalize(5),
          }}
        >
          <Text style={styles.title}>{product.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: normalize(10),
              flex: 0.2,
            }}
          >
            <Ionicons name="star" size={20} color={colors.primary} />
            <Text style={styles.rating}>{product.rating.rate}</Text>
            <Text style={styles.ratingcount}>
              {"(" + product.rating.count + ")"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            // paddingRight: normalize(5),
            marginVertical: normalize(5),
          }}
        >
          <Text
            style={{
              ...categoryclass(product.category),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(8),
              borderRadius: 10,
              textAlign: "center",
              alignSelf: "flex-start",
              marginTop: normalize(5),
              fontSize: typography.small,
              marginHorizontal: normalize(10),
            }}
          >
            {product.category}
          </Text>
        </View>
        <Text style={styles.subtitle}>Product details</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingRight: normalize(10),
            marginVertical: normalize(5),
          }}
        >
          <Text style={styles.desc}>Price :</Text>
          <Text
            style={{
              fontSize: typography.xlarge,
              fontWeight: "bold",
              backgroundColor: colors.primary,
              color: colors.white,
              padding: normalize(5),
            }}
          >
            {product.price} DA
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Similar products in {product.category}
        </Text>
        <ScrollView horizontal={false}>
          <View
            style={{
              flexDirection: "row",
              // marginVertical: 20,
              // marginBottom: normalize(50),
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
              gap: 10,
              flex: 1,
              paddingBottom: normalize(10),
              paddingHorizontal: normalize(10),
            }}
          >
            {products.map((product, index) => {
              return (
                <Productitem
                  key={index}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  image={product.image}
                  id={product.id}
                  showbtns={false}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
product.navigationOptions = ({
  route,
}: {
  route: { params: { id: string } };
}) => {
  // Access the itemId from the route parameters
  const { id } = route.params as { id: string }; // Declare itemId type
  console.log(id);
  // Set the header title with the itemId
  return {
    title: id ? `Product N ${id}` : "Product not found",
  };
};
export default product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    // gap: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: normalize(10),
    objectFit: "contain",
  },
  title: {
    fontSize: typography.xlarge,
    fontWeight: "bold",
    paddingHorizontal: normalize(10),
    flex: 0.8,
    // margin: 10,
  },
  subtitle: {
    fontSize: typography.xlarge,
    fontWeight: "bold",
    paddingTop: normalize(10),
    paddingBottom: normalize(5),
    paddingHorizontal: normalize(10),
  },
  rating: {
    fontSize: typography.large,
    fontWeight: "bold",
    margin: 3,
    color: colors.primary,
  },
  ratingcount: {
    fontSize: typography.small,
    fontWeight: "bold",
    margin: 3,
    color: colors.gray,
  },
  desc: {
    fontSize: typography.medium,
    margin: normalize(14),
    color: colors.mediumgray,
  },
});
