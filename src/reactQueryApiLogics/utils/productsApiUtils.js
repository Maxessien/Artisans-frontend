import { productsApi } from "../../axiosApiBoilerplates/regApi";
import logger from "../../utils/logger";

const fetchAllProducts = async (currentPage) => {
  try {
    const res = await productsApi.get("/all", {
      params: {
        page: currentPage,
        limit: 20,
      },
    });
    return res.data;
  } catch (err) {
    logger.error("Failed to fetch all products", err);
    return err;
  }
};

const fetchProductsByCategory = async (currentPage, selectedCategory) => {
  try {
    const res = await productsApi.get("/category", {
      params: {
        category: selectedCategory,
        page: currentPage,
        limit: 20,
      },
    });
    return res.data;
  } catch (err) {
    logger.error("Failed to fetch products by category", err);
    return err;
  }
};

const fetchTopProducts = async () => {
  try {
    const res = await productsApi.get("/trending");
    return res.data;
  } catch (err) {
    logger.error("Failed to fetch top products", err);
    return err;
  }
};

const fetchBySearchQuery = async (query) => {
  try {
    const res = await productsApi.get(`/search?query=${query}`);
    logger.info("Search products response", res);
    return res.data;
  } catch (err) {
    logger.error("Failed to search products", err);
    return err;
  }
};

export {
    fetchAllProducts, fetchBySearchQuery, fetchProductsByCategory,
    fetchTopProducts
};

