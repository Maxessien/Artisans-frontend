import Banner from "../../src/components/explore_components/Banner";
import PopularCategory from "../../src/components/explore_components/PopularCategories";
import NewArrivals from "../../src/components/home_components/NewArrivals";
import BodyBg from "../../src/components/page_layouts/BodyBg";
import BottomNavigation from "../../src/components/page_layouts/BottomNavigation";
import {
  fetchLatestProducts,
  fetchTrendingProducts,
  getProductCategories,
  noNullFn,
} from "../../src/utils/fetchingHelpers";
import ExploreHeader from "./../../src/components/explore_components/ExploreHeader";

const ExplorePage = async () => {
  const trendingProducts = await noNullFn(
    async () => await fetchTrendingProducts()
  );
  const categories = await noNullFn(async () => await getProductCategories());
  const latestProducts = await noNullFn(
    async () => await fetchLatestProducts()
  );

  const latestFormatted = latestProducts.map((data) => ({
    ...data,
    productId: data.product_id,
    name: data.product_name,
  }));
  return (
    <>
      <main className="px-5 h-full w-screen">
        <BodyBg />
        <ExploreHeader />
        <Banner />
        <PopularCategory initCategories={categories} />
        <NewArrivals latestProducts={trendingFormatted} />
        <BottomNavigation />
      </main>
    </>
  );
};

export default ExplorePage;
