import AboutUs from "../src/components/home_components/AboutUs";
import BestSelling from "../src/components/home_components/BestSelling";
import FAQ from "../src/components/home_components/FAQ";
import Hero from "../src/components/home_components/Hero";
import HeroFooter from "../src/components/home_components/HeroFooter";
import NewsLetter from "../src/components/home_components/NewsLetter";
import Testimonials from "../src/components/home_components/Testimonials";
import {
    fetchTrendingProducts,
    getProductCategories,
} from "../src/utils/productsFectchingHelpers";
import NewArrivals from "./../src/components/home_components/NewArrivals";
import ShopByCategory from "./../src/components/home_components/ShopByCategory";

export const metadata = {
  title: "Artisans",
};

const Home = async () => {
  try {
    const trendingProducts = await fetchTrendingProducts();
    const categories = await getProductCategories();
    console.log(trendingProducts, categories);
    return (
      <>
        <main>
          <Hero />
          <HeroFooter />
          <AboutUs />
          <ShopByCategory />
          <NewArrivals />
          <BestSelling />
          <Testimonials />
          <FAQ />
          <NewsLetter />
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
          <NewArrivals />
          <BestSelling />
          <Testimonials />
          <FAQ />
          <NewsLetter />
        </main>
      </>
    );
  }
};

export default Home;
