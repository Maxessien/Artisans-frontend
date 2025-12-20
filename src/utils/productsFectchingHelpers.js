import { regApi } from "../axiosApiBoilerplates/regApi";


const fetchAllProducts = async (pageNumber, filters) => {
  try {
    const products = await regApi.get("/product/single", {params: { page: pageNumber, ...filters }})
    console.log(products);
    return products.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const fetchTrendingProducts = async () => {
  try {
    const products = await regApi.get("/product/trending");
    console.log(products.data, "prod");
    return products.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductCategories = async () => {
  try {
    const categories = await regApi.get("/category");
	// console.log(categories, "batttt")
    return categories.data || [];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { fetchAllProducts, fetchTrendingProducts, getProductCategories };

