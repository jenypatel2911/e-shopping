import axios from "axios";
import { base_url} from "../../pages/utils/axiosConfig";
import { getTokenFromLocalStorage } from "../../pages/utils/localStorageUtils";

const token = getTokenFromLocalStorage();
const newToken = JSON.parse(token);

export const config = {
  headers: {
    Authorization: newToken ? `Bearer ${newToken}` : "",
    Accept: "application/json",
  },
};


const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.tags ? `tag=${data?.tags}&&` : ""}${
      data?.brand ? `brand=${data?.brand}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}
    ${data?.sort ? `sort=${data?.sort}&&` : ""}`
  );
  if (response.data) {
    return response.data;
  }
};

const getSinglProducts = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const addToWishlist = async (prodId) => {
  try {
    const response = await axios.put(
      `${base_url}product/wishlist`,
      { prodId },
      config
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("Network error:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    throw error;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishlist,
  getSinglProducts,
  rateProduct,
};
