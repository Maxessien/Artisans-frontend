import { regApi } from "../axiosApiBoilerplates/regApi";
import logger from "./logger";


const fetchAllProducts = async (pageNumber, filters) => {
  try {
    const products = await regApi.get("/product/single", {params: { page: pageNumber, ...filters }})
    logger.info("Fetched all products", products);
    return products.data;
  } catch (err) {
    logger.error("Failed to fetch all products", err);
    throw err;
  }
};

const fetchTrendingProducts = async () => {
  try {
    const products = await regApi.get("/product/trending");
    logger.info("Fetched trending products", products.data);
    return products.data;
  } catch (err) {
    logger.error("Failed to fetch trending products", err);
    throw err;
  }
};

const getProductCategories = async () => {
  try {
    const categories = await regApi.get("/category");
	// console.log(categories, "batttt")
    return categories.data || [];
  } catch (err) {
    logger.error("Failed to get product categories", err);
    throw err;
  }
};

export { fetchAllProducts, fetchTrendingProducts, getProductCategories };

