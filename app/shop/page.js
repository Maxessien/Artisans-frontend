import { regApi } from "../../src/axiosApiBoilerplates/regApi";
import { headers } from "next/headers";
import ClientShopPage from "./clientPage";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Lasu Mart-Shop",
};

const Shop = async ({searchParams}) => {
  const sParams = await searchParams;
  console.log(sParams)
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
  console.log(cat?.split(" "))
  if (
    !["order", "sort"].every((value) =>
      acceptableValues[value].includes(value === "sort" ? sort : order)
    ) ||
    formattedPrice.length !== 2 ||
    Number(formattedPrice[0]) < 5 ||
    Number(formattedPrice[1]) > 500000 ||
    Number(formattedPrice[0]) > Number(formattedPrice[1]) ||
    page < 1
  )
    return notFound();
  if (cat && !cat.split(" ").every((value)=>acceptableValues.cat.includes(value))) return notFound();
  if (search && search.length < 1 && typeof search !== "string") return notFound();
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
    console.log(isMobile, "mobile", products.data);
    return (
      <>
        <ClientShopPage
          initialShopData={products?.data}
          serverSideWindowSize={isMobile}
        />
      </>
    );
  } catch (err) {
    console.log(err);
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
