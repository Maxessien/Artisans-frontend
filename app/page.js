import AboutUs from "../src/components/home_components/AboutUs";
import BestSelling from "../src/components/home_components/BestSelling";
import FAQ from "../src/components/home_components/FAQ";
import Hero from "../src/components/home_components/Hero";
import HeroFooter from "../src/components/home_components/HeroFooter";
import NewsLetter from "../src/components/home_components/NewsLetter";
import Testimonials from "../src/components/home_components/Testimonials";
import {
  fetchLatestProducts,
  fetchTrendingProducts,
  getProductCategories,
} from "../src/utils/fetchingHelpers";
import logger from "../src/utils/logger";
import NewArrivals from "./../src/components/home_components/NewArrivals";
import ShopByCategory from "./../src/components/home_components/ShopByCategory";

export const metadata = {
  title: "Artisans",
};

const Home = async () => {
  try {
    const trendingProducts = await fetchTrendingProducts();
    const categories = await getProductCategories();
    const latestProducts = await fetchLatestProducts()
    logger.info("Home page data fetched", { trendingProducts, categories, latestProducts });
    return (
      <>
        <main>
          <Hero />
          <HeroFooter />
          <AboutUs />
          <ShopByCategory data={categories?.data?.length > 0 ? categories?.data : null} />
          <NewArrivals data={latestProducts?.data?.length > 0 ? latestProducts?.data : null} />
          <BestSelling data={trendingProducts?.data?.length > 0 ? trendingProducts?.data : null} />
          <Testimonials />
          <FAQ />
          <NewsLetter />
        </main>
      </>
    );
  } catch (err) {
    logger.error("Home page data fetch failed", err);
    return (
      <>
        <main>
          <Hero />
          <HeroFooter />
          <AboutUs />
          <ShopByCategory data={null} />
          <NewArrivals data={null} />
          <BestSelling data={null} />
          <Testimonials />
          <FAQ />
          <NewsLetter />
        </main>
      </>
    );
  }
};

export default Home;
