"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { newArrivalsMockDataset } from "../../utils/mockData";
import { HeartIcon } from "../svg_components/NavigationSvg";
import { homeSectionPadding } from "./AboutUs";


export const HomeProductCards = ({ name, description, price, images }) => {
  const pathname = usePathname()
  
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
        <p className={`${pathname === "/explore" ? "text-base" : "text-lg"} text-[var(--text-primary)] text-left font-medium`}>
          {name}
        </p>
        <p className={`${pathname === "/explore" ? "text-sm" : "text-base"} text-[var(--main-secondary)] text-left font-medium`}>
          {description}
        </p>
        <p className={`${pathname === "/explore" ? "text-lg" : "text-xl"} text-[var(--main-primary)] text-left font-semibold`}>
          #{price}
        </p>
      </div>
    </>
  );
};

const NewArrivals = () => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const pathname = usePathname();

  return (
    <>
      <section
        className={`${
          pathname === "/" && homeSectionPadding
        } w-full`}
      >
        <header
          className={`${
            pathname === "/"
              ? "w-full"
              : "w-full flex justify-between items-center"
          }`}
        >
          <h2 className={`w-full ${pathname === "/explore" ? "flex justify-between items-center" : "text-center"} text-[var(--text-primary)] font-normal text-2xl mb-3`}>
            New{" "}
            {pathname === "/" ? (
              <span className="text-[var(--main-primary)]">Arrivals</span>
            ) : (
              "Arrivals"
            )}
          </h2>
          {pathname === "/explore" && (
            <Link href={"/shop"} className="text-[var(--main-primary)] w-max text-base font-medium">
              See all
            </Link>
          )}
        </header>
        <div
          className={`grid ${
            currentSize < 480 && pathname === "/" ? "grid-cols-1" : "grid-cols-2"
          } ${pathname === "/explore" && "grid-cols-2"} md:grid-cols-3 xl:grid-cols-4 gap-3 justify-start`}
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
