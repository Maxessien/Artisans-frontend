import { authApi } from "../axiosApiBoilerplates/authApi";
import logger from "./logger";

const formatFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (key !== "images") formData.append(key, data[key]);
  }
  for (const image of data.images) formData.append("images", image);
  return formData;
};

const addToCart = async (token, userId, productId) => {
  try {
    const res = await authApi(token).post(`user/${userId}/cart`, {
      productId: productId,
      quantity: 1,
    });
    logger.info("Added item to cart", res.data);
    return res.data;
  } catch (err) {
    logger.error("Failed to add to cart", err);
    throw err;
  }
};

export { addToCart, formatFormData };

