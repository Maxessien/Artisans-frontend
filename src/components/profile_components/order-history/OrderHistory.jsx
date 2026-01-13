"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MobilePageHeader from "./../../page_layouts/MobilePageHeader";
import { SearchIcon } from "../../svg_components/ExploreSvg";
import OrderHistoryCard from "./OrderHistoryCard";
import { useSelector } from "react-redux";

const OrderHistory = ({ orders }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData } = useSelector((state) => state.userAuth);
  const statusBtnStl = (activeStr) =>
    `w-full py-3 px-2 text-lg font-normal text-(--text-primary) ${
      searchParams.get("status") === activeStr && "bg-(--text-secondary-light)"
    }`;
  return (
    <>
      <MobilePageHeader pageTitle="My Order History" />
      <div className="w-full rounded-full px-2 bg-(--text-secondary-light) shadow-[0px_0px_10px_-8.5px_black] flex items-center">
        <button className="w-max p-1 h-full">
          <SearchIcon />
        </button>
        <input
          placeholder="Search"
          className="w-full px-2 py-4 text-base text-(--text-primary) focus:outline-0 placeholder:text-(--main-secondary) font-normal"
          type="text"
        />
      </div>
      <div className="grid grid-cols-3 bg-(--main-tertiary) shadow-[0px_0px_10px_-9px_black] rounded-md">
        <button
          onClick={() =>
            router.push(`/${userData.userId}/orders?status=active`)
          }
          className={`${statusBtnStl("active")} rounded-[6px_0px_0px_6px]`}
        >
          Active
        </button>
        <button
          onClick={() =>
            router.push(`/${userData.userId}/orders?status=delivered`)
          }
          className={`${statusBtnStl("delivered")}`}
        >
          Completed
        </button>
        <button
          onClick={() =>
            router.push(`/${userData.userId}/orders?status=cancelled`)
          }
          className={`${statusBtnStl("cancelled")} rounded-[0px_6px_6px_0px]`}
        >
          Cancelled
        </button>
      </div>
      <div className="space-y-2">
        {orders?.map(
          ({
            order_id,
            price,
            quantity_ordered,
            date_added,
            product_name,
            image_url,
          }) => {
            return (
              <OrderHistoryCard
                name={product_name}
                imageUrl={image_url}
                dateAdded={date_added}
                quantity={quantity_ordered}
                price={price}
                orderId={order_id}
              />
            );
          }
        )}
      </div>
    </>
  );
};

export default OrderHistory;
