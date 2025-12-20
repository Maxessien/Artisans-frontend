import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { regApi } from "../../src/axiosApiBoilerplates/regApi";
import logger from "../../src/utils/logger";
import ClientShopPage from "./clientPage";

export const metadata = {
  title: "Lasu Mart-Shop",
};

const Shop = async ({ searchParams }) => {
  const sParams = await searchParams;
  logger.info("Shop search parameters", sParams);
  const {
    price = "10-400000",
    page = 1,
    search,
    cat,
    order = "desc",
    sort = "createdAt",
  } = sParams;
  const userAgent = (await headers()).get("user-agent");
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent) || false;
  const acceptableValues = {
    order: ["asc", "desc"],
    sort: ["createdAt", "ratings", "price"],
    cat: ["fashion", "food", "electronics", "sports", "accessories"],
  };
  const formattedPrice = price.split("-");
  logger.info("Categories provided", cat?.split(" "));
  if (
    !acceptableValues.sort.includes(sort) ||
    !acceptableValues.order.includes(order) ||
    formattedPrice.length !== 2 ||
    Number(formattedPrice[0]) < 5 ||
    Number(formattedPrice[1]) > 500000 ||
    Number(formattedPrice[0]) > Number(formattedPrice[1]) ||
    page < 1
  )
    return notFound();
  if (
    cat &&
    !cat.split(" ").every((value) => acceptableValues.cat.includes(value))
  )
    return notFound();
  if (search && search.length < 1 && typeof search !== "string")
    return notFound();
  try {
    const products = await regApi.get(
      search?.length > 0 && typeof search === "string"
        ? "/product/search"
        : "/product",
      {
        params: {
          page: page,
          minPrice: Number(formattedPrice[0]) || 5,
          maxPrice: Number(formattedPrice[1]) || 500000,
          sortBy: sort || "createdAt",
          order: order || "desc",
          category: cat?.split(" ") ?? false,
          ...(search?.length > 0 && typeof search === "string"
            ? { searchTerm: search }
            : {}),
        },
      }
    );
    logger.info("Shop page data", { isMobile, products: products.data });
    return (
      <>
        <ClientShopPage
          initialShopData={products?.data}
          serverSideWindowSize={isMobile}
        />
      </>
    );
  } catch (err) {
    logger.error("Shop page fetch failed", err);
    return (
      <>
        <ClientShopPage
          initialShopData={{ totalPages: 0, data: [] }}
          serverSideWindowSize={isMobile}
        />
      </>
    );
  }
};

export default Shop;
