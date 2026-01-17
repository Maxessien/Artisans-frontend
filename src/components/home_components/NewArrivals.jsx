"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { newArrivalsMockDataset } from "../../utils/mockData";
import { homeSectionPadding } from "./AboutUs";
import HomeProductCards from "./HomeProductCards";

const NewArrivals = ({latestProducts}) => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const pathname = usePathname();

  const newArrival = latestProducts.length > 0 ? latestProducts : newArrivalsMockDataset
  return (
    <>
      <section
        className={`${
          pathname === "/" && homeSectionPadding
        } w-full`}
      >
        <header
          className={`pt-10 pb-3 ${
            pathname === "/"
              ? "w-full"
              : "w-full flex justify-between items-center"
          }`}
        >
          <h2 className={`w-full ${pathname === "/explore" ? "flex justify-between items-center" : "text-center"} text-[var(--text-primary)] font-normal text-2xl`}>
            New{" "}
            {pathname === "/" ? (
              <span className="text-[var(--main-primary)]">Arrivals</span>
            ) : (
              "Arrivals"
            )}
          </h2>
          {pathname === "/explore" && (
            <Link href={"/shop"} className="text-[var(--main-primary)] w-full text-right h-max text-base font-medium">
              See all
            </Link>
          )}
        </header>
        <div
          className={`grid ${
            currentSize < 480 && pathname === "/" ? "grid-cols-1" : "grid-cols-2"
          } ${pathname === "/explore" && "grid-cols-2"} md:grid-cols-3 xl:grid-cols-4 gap-3 justify-start`}
        >
          {newArrival?.map((data, index) => {
            if (currentSize < 480 && index + 1 > 4) return null;
            return (
              <>
                <HomeProductCards {...data} description={false} imageUrl={data.images} />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
