"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingProducts } from "../../utils/fetchingHelpers.js";
import Loader from "../reusable_components/Loader.jsx";
import ProductCards from "./ProductCards";
import "./scss/trending.scss";


const TrendingProducts = ({initData}) => {

  const { data, isPending } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: () => fetchTrendingProducts(),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    initialData: initData
  });

  if (isPending) {
    return (
      <>
        <Loader size={"h-full w-screen py-10"} />
      </>
    );
  }

  return (
    <>
      <section className="home_section">
        <h1 className="home_section_header">Trending</h1>
        <div
          className={`trending_products_display ${ 
            data?.length > 0 ? "product_display" : "no_product_display" 
          }`}
        >
          {data && data?.length > 0 ? (
            data.map(({ name, price, images, productId }) => {
              return (
                <>
                  <ProductCards
                    key={productId}
                    imageUrl={images[0]?.url || "default"}
                    name={name}
                    price={price}
                    productId={productId}
                  />
                </>
              );
            })
          ) : (
            <p className="no_products">No Trending Products</p>
          )}
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
