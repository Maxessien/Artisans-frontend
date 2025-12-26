"use client";

import { useSearchParams } from "next/navigation";
import MobilePageHeader from "./../../page_layouts/MobilePageHeader";
import { SearchIcon } from "../../svg_components/ExploreSvg";
import OrderHistoryCard from "./OrderHistoryCard";

const OrderHistory = ({ orders }) => {
  const searchParams = useSearchParams();
  const statusBtnStl = (activeStr) =>
    `w-full py-3 px-2 text-lg font-normal text-(--text-primary) ${
      searchParams.get("status") === activeStr && "bg-(--text-secondary-light)"
    }`;
  return (
    <>
      <MobilePageHeader pageTitle="My Order History" />
      <div className="w-full rounded-full px-2 bg-(--text-primary-light) flex items-center">
        <button className="w-max p-1 h-full">
          <SearchIcon />
        </button>
        <input
          placeholder="Search"
          className="w-full px-2 py-4 text-base text-(--text-primary) focus:outline-0 placeholder:text-(--main-secondary) font-normal"
          type="text"
        />
      </div>
      <div className="grid grid-cols-3 bg-(--main-tertiary) rounded-md">
        <button
          className={`${statusBtnStl("active")} rounded-[6px_0px_0px_6px]`}
        >
          Active
        </button>
        <button className={`${statusBtnStl("completed")}`}>Completed</button>
        <button
          className={`${statusBtnStl("cancelled")} rounded-[0px_6px_6px_0px]`}
        >
          Cancelled
        </button>
      </div>
      <div className="space-y-2">
        {orders.map(
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
