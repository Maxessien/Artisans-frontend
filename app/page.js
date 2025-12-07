import TrendingProducts from "./../src/components/home_components/Trending";
import FlashSalesSection from "./../src/components/home_components/FlashSalesSection";
import ShopByCategory from "./../src/components/home_components/ShopByCategory";
import {
  fetchTrendingProducts,
  getProductCategpries,
} from "../src/utils/productsFectchingHelpers";
import Hero from "../src/components/home_components/Hero";
import HeroFooter from "../src/components/home_components/HeroFooter";
import AboutUs from "../src/components/home_components/AboutUs";

export const metadata = {
  title: "Artisans"
}

const Home = async () => {
  try {
    const trendingProducts = await fetchTrendingProducts();
    const categories = await getProductCategpries();
    console.log(trendingProducts, categories)
    return (
      <>
        <main>
          <Hero />
          <HeroFooter />
          <AboutUs />
          <ShopByCategory />
          {/* <TrendingProducts initData={trendingProducts} />
          <FlashSalesSection />
          <ShopByCategory initData={categories} /> */}
        </main>
      </>
    );
  } catch (err) {
    console.log(err);
    return (
      <>
        <main>
          <Hero />
          <HeroFooter />
          <AboutUs />
          <ShopByCategory />
          {/* <TrendingProducts initData={[]} />
          <FlashSalesSection />
          <ShopByCategory initData={[]} /> */}
        </main>
      </>
    );
  }
};

export default Home;
