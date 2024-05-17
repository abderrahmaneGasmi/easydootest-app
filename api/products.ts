export type category =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
export interface Product {
  id: number;
  title: string;
  price: number;
  category: category;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function getProduct({ limit }: { limit?: number }) {
  let endpoint = process.env.api || "https://fakestoreapi.com";
  return fetch(endpoint + "/products" + (limit ? "?limit=" + limit : ""))
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export async function searchProduct(search: string) {
  return fetch(
    process.env.api || "https://fakestoreapi.com" + "/products?title=" + search
  )
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export async function filterProducts(category: category) {
  console.log(process.env.api);
  return fetch(
    process.env.api ||
      "https://fakestoreapi.com" + "/products/category/" + category
  )
    .then((res) => res.json())
    .then((data) => data as Product[]);
}
export async function addproduct(product: Partial<Product>) {
  console.log("first");
  return fetch(process.env.api || "https://fakestoreapi.com" + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
  // .then((data) => console.log(data));
}
export async function editproduct(product: Partial<Product>) {
  return fetch(
    process.env.api || "https://fakestoreapi.com" + "/products/" + product.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
export async function deleteproduct(id: number) {
  return fetch(
    process.env.api || "https://fakestoreapi.com" + "/products/" + id,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((data) => data.log(data));
}
export async function getProductById(id: string) {
  let endpoint = process.env.api || "https://fakestoreapi.com";

  return fetch(endpoint + "/products/" + id)
    .then((res) => res.json())
    .then((json) => json as Product)
    .catch((err) => err.log(err));
}
