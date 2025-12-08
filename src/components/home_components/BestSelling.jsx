import { useSelector } from "react-redux";
import ButtonLink from "../reusable_components/ButtonLink";
import { HomeProductCards } from "./NewArrivals";
import { homeSectionPadding } from "./AboutUs";

const BestSelling = () => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const bestSellingDataset = [
    {
      name: "Denim Tote Bag",
      description: "Elegant and perfect for casual outings",
      price: 15000,
      images: "Stylish DIY Denim Tote Bag from Old Jeans 1.png",
    },
    {
      name: "Ankara Palm Slippers",
      description: "Unique slippers crafted by skilled artisans",
      price: 35000,
      images:
        "Nigerian Coral Bead Jewelry Set_ African Wedding Necklace, Bracelet & Earrings 1 (1).png",
    },
    {
      name: "Headband for Women",
      description: "Beautiful headband for any occasion",
      price: 2000,
      images: "women-headband.png",
    },
    {
      name: "Custom named pendant",
      description: "Made with premium for everyday wear",
      price: 8000,
      images: "hailey-bag-chain.png",
    },
  ];

  return (
    <>
      <section className={`${homeSectionPadding} w-full min-w-screen`}>
        <h2 className="w-full flex justify-between">
          <span className="text-2xl text-[var(--text-primary)] font-normal">
            <span className="text-[var(--main-primary)]">Best Selling</span> Products
          </span>
          <ButtonLink>View All</ButtonLink>
        </h2>
        <div
          className={`grid ${
            currentSize < 480 ? "grid-cols-1" : "grid-cols-2"
          } md:grid-cols-3 xl:grid-cols-4 gap-3 justify-start`}
        >
          {bestSellingDataset.map((data) => {
            return (
              <>
                <HomeProductCards {...data} />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BestSelling;
