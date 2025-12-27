"use client"

import { useSelector } from "react-redux";
import ButtonLink from "../reusable_components/ButtonLink";
import { homeSectionPadding } from "./AboutUs";
import HomeProductCards from "./HomeProductCards";

const BestSelling = ({data}) => {
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

  const bestSelling = data ?? bestSellingDataset

  return (
    <>
      <section className={`bg-[var(--main-tertiary-light)] ${homeSectionPadding} w-full min-w-screen`}>
        <h2 className="w-full flex justify-between gap-2 items-start mb-6">
          <span className="md:text-2xl text-xl text-[var(--text-primary)] font-normal">
            <span className="text-[var(--main-primary)]">Best Selling</span> Products
          </span>
          {currentSize > 480 && <ButtonLink>View All</ButtonLink>}
        </h2>
        <div
          className={`grid ${
            currentSize < 480 ? "grid-cols-1" : "grid-cols-2"
          } md:grid-cols-3 xl:grid-cols-4 gap-3 justify-start`}
        >
          {bestSelling.map((data) => {
            return (
              <HomeProductCards key={data.name} {...data} />
            );
          })}
        </div>
          {currentSize <= 480 && <div className="mt-4 flex justify-center items-center"><ButtonLink>View All</ButtonLink></div>}
      </section>
    </>
  );
};

export default BestSelling;
