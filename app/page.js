import ShopByCategory from "./../src/components/home_components/ShopByCategory";
import {
  fetchTrendingProducts,
  getProductCategpries,
} from "../src/utils/productsFectchingHelpers";
import Hero from "../src/components/home_components/Hero";
import HeroFooter from "../src/components/home_components/HeroFooter";
import AboutUs from "../src/components/home_components/AboutUs";
import NewArrivals from "./../src/components/home_components/NewArrivals";
import BestSelling from "../src/components/home_components/BestSelling";
import Testimonials from "../src/components/home_components/Testimonials";
import FAQ from "../src/components/home_components/FAQ";

export const metadata = {
  title: "Artisans",
};

const Home = async () => {
  try {
    const trendingProducts = await fetchTrendingProducts();
    const categories = await getProductCategpries();
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
        </main>
      </>
    );
  }
};

export default Home;
