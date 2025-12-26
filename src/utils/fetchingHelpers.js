import { regApi } from "../axiosApiBoilerplates/regApi";
import logger from "./logger";

const fetchAllProducts = async (pageNumber, filters) => {
  try {
    const products = await regApi.get("/product/single", {
      params: { page: pageNumber, ...filters },
    });
    logger.info("Fetched all products", products);
    return products?.data || {data: [], total_pages: 0};
  } catch (err) {
    logger.error("Failed to fetch all products", err);
    throw err;
  }
};

const fetchTrendingProducts = async () => {
  try {
    const products = await regApi.get("/product", {params: {
      sortBy: "ratings",
      limit: 7
    }});
    logger.info("Fetched trending products", products.data);
    return products?.data?.data || [];
  } catch (err) {
    logger.error("Failed to fetch trending products", err);
    throw err;
  }
};

const fetchLatestProducts = async () => {
  try {
    const products = await regApi.get("/product", {params: {
      sortBy: "date_added",
      limit: 7
    }});
    logger.info("Fetched trending products", products.data);
    return products?.data?.data || [];
  } catch (err) {
    logger.error("Failed to fetch trending products", err);
    throw err;
  }
};

const getProductCategories = async () => {
  try {
    const latest = await regApi.get("/category");
    logger.log("Latest Data", latest.data)
    return latest.data || [];
  } catch (err) {
    logger.error("Failed to get product categories", err);
    throw err;
  }
};

const fetchProductReviews = async (productId, page) => {
  try {
    const reviews = await regApi.get(`/reviews/${productId}`, {
      params: { page: page },
    });
    return reviews.data;
  } catch (err) {
    logger.error("Product Reviews fetch err", err);
    throw err;
  }
};

export {
  fetchAllProducts,
  fetchTrendingProducts,
  getProductCategories,
  fetchProductReviews,
  fetchLatestProducts,
};
