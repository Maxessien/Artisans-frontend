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
  const prodCategories = await regApi.get("/category")
  logger.info("Shop search parameters", prodCategories.data?.map(({title})=>title));
  const {
    price = "10-400000",
    page = 1,
    search,
    cat,
    order = "desc",
    sort = "date_added",
  } = sParams;
  const userAgent = (await headers()).get("user-agent");
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent) || false;
  const acceptableValues = {
    order: ["asc", "desc"],
    sort: ["date_added", "ratings", "price"],
    cat: prodCategories.data?.map(({title})=>title) ?? null,
  };
  const formattedPrice = price.split("-");
  logger.info("Categories provided", {split: cat?.split("-")?.map((val)=>decodeURIComponent(val)), raw: cat});
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
    !cat.split("-")?.map((val)=>decodeURIComponent(val)).every((value) => acceptableValues?.cat ? acceptableValues.cat.includes(value) : true)
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
          sortBy: sort || "date_added",
          order: order || "desc",
          category: acceptableValues?.cat ? cat?.split("-")?.map((val)=>decodeURIComponent(val)) ?? "" : "",
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
          categories={prodCategories.data}
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
          categories={[]}
        />
      </>
    );
  }
};

export default Shop;
