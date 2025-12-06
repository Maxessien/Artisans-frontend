"use client"

import "./scss/shop_by_category.scss";
import { useQuery } from "@tanstack/react-query";
import Loader from "./../reusable_components/Loader";
import { getProductCategpries } from "../../utils/productsFectchingHelpers";

const ShopByCategory = ({initData}) => {
  const { data, isPending } = useQuery({
    queryKey: ["allProductCategories"],
    queryFn: async()=> await getProductCategpries(),
    initialData: initData
  });
  if (isPending) {
    return (
      <>
        <Loader size="w-screen h-full py-10" />
      </>
    );
  }
  return (
    <>
	{console.log(data, "comp")}
      <section className="home_section">
        <h2 className="home_section_header">Shop by category</h2>

        <div className="category_display">
          {data && data.length > 0 ? data?.map((category, index) => {
            return (
              <>
                <button key={index} className="category_block">
                  {category.name}
                </button>
              </>
            );
          }) : (
            <div className="py-10 text-[var(--main-secondary-light)] font-semibold text-xl flex items-center justify-center w-screen">
              No categories listed
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopByCategory;
