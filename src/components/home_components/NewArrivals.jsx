"use client";

import { FaRegHeart } from "react-icons/fa";
import { homeSectionPadding } from "./AboutUs";
import { useSelector } from "react-redux";
import { HeartIcon } from "../svg_components/NavigationSvg";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const HomeProductCards = ({ name, description, price, images }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <button className="rounded-full p-2 bg-[var(--text-secondary-light)] shadow-[0px_0px_10px_-5px_black] absolute top-2 right-2">
            <HeartIcon className="text-(var(--main-primary))" size={22} />
          </button>
          <img
            className="w-full object-cover"
            src={`designs/${images}`}
            alt={`${name} image`}
          />
        </div>
        <p className="text-lg text-[var(--text-primary)] text-left font-medium">
          {name}
        </p>
        <p className="text-base text-[var(--main-secondary)] text-left font-medium">
          {description}
        </p>
        <p className="text-xl text-[var(--main-primary)] text-left font-semibold">
          #{price}
        </p>
      </div>
    </>
  );
};

const NewArrivals = () => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const pathname = usePathname();
  const newArrivalsMockDataset = [
    {
      name: "Green Patterned Aso-Oke",
      description: "Soft texture, perfect for occasions",
      price: 25000,
      images: "green-patterned.png",
    },
    {
      name: "Coral beaded Jewelry Set",
      description: "Unique jewelry that blends tradition with modern style",
      price: 65000,
      images:
        "Nigerian Coral Bead Jewelry Set_ African Wedding Necklace, Bracelet & Earrings 1.png",
    },
    {
      name: "Brown Handmade Sandals",
      description:
        "Brown leather sandals crafted by skilled artisans for everyday comfort",
      price: 20000,
      images: "brown-sandals.png",
    },
    {
      name: "Talking Drum (Medium Size)",
      description: "Made with premium hide for rich traditional sound",
      price: 50000,
      images: "standing-talking-drum.png",
    },
    {
      name: "Wine Crochet Handbag",
      description: "Soft texture, crafted to add spice to any outfit",
      price: 13000,
      images: "makrame bag 1.png",
    },
    {
      name: "Black and White Throw Pillow",
      description: "Pillow hand-stitched to brighten any home décor",
      price: 50000,
      images: "throw-pillow.png",
    },
    {
      name: "Hand Carved Wooden Sculpture",
      description:
        "Premium sculpture showcasing authentic African craftsmanship",
      price: 320000,
      images:
        "Hand-Carved Wooden Sun Wall Sculpture_ Gold & Black Abstract Art (1) 1.png",
    },
    {
      name: "Ankara Kimono Jacket",
      description:
        "Lightweight jacket with a modern cultural twist for everyday wear",
      price: 7500,
      images:
        "Afro-Chic Ankara Adire Kimono_ Handgemachte Afrikanische Print Boho Jacke 1.png",
    },
  ];

  return (
    <>
      <section
        className={`${
          pathname === "/" && homeSectionPadding
        } w-full min-w-screen`}
      >
        <header
          className={`${
            pathname === "/"
              ? "w-full"
              : "w-full flex justify-between items-center"
          }`}
        >
          <h2 className="w-full text-center text-[var(--text-primary)] font-normal text-2xl mb-3">
            New{" "}
            {pathname === "/" ? (
              <span className="text-[var(--main-primary)]">Arrivals</span>
            ) : (
              "Arrivals"
            )}
          </h2>
          {pathname === "/explore" && (
            <Link className="text-[var(--main-primary)] text-base font-medium">
              See all
            </Link>
          )}
        </header>
        <div
          className={`grid ${
            currentSize < 480 ? "grid-cols-1" : "grid-cols-2"
          } md:grid-cols-3 xl:grid-cols-4 gap-3 justify-start`}
        >
          {newArrivalsMockDataset.map((data, index) => {
            if (currentSize < 480 && index + 1 > 4) return;
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

export default NewArrivals;
