import Banner from "../../src/components/explore_components/Banner";
import PopularCategory from "../../src/components/explore_components/PopularCategories";
import NewArrivals from "../../src/components/home_components/NewArrivals";
import BodyBg from "../../src/components/page_layouts/BodyBg";
import BottomNavigation from "../../src/components/page_layouts/BottomNavigation";
import ExploreHeader from "./../../src/components/explore_components/ExploreHeader";

const ExplorePage = () => {
  return (
    <>
      <main className="px-5 h-full w-screen">
        <BodyBg />
        <ExploreHeader />
        <Banner />
        <PopularCategory />
        <NewArrivals />
        <BottomNavigation />
      </main>
    </>
  );
};

export default ExplorePage;
