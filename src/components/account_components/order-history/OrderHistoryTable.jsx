"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import logger from "../../../utils/logger";
import Button from "./../../reusable_components/Buttons";
import ListProductTable from "./ListProductTable";

const OrderHistoryTable = ({ initOrdersData }) => {
  const { idToken } = useSelector((state) => state.userAuth);
  const ordersData = initOrdersData;
  const router = useRouter();

  const cancelOrder = async (id) => {
    try {
      const res = await authApi(idToken).delete(`/orders/user/${id}`);
      toast.success("Order cancelled");
      return res;
    } catch (err) {
      logger.error("Failed to cancel order", err);
      toast.error("Failed to cancel order, try again");
      throw err;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => cancelOrder(id),
  });

  return (
    <>
      {ordersData && ordersData.length > 0 ? (
        <div className="border-collapse flex flex-col gap-[10px]">
          {ordersData.map((data, index) => {
            return (
              <>
                <div className="flex flex-col md:grid md:grid-cols-[20%_1fr] border-2 border-[var(--main-secondary-light)]">
                  <div>
                    <p className="w-full flex items-center justify-center p-2 border-b-2 md:border-r-2 border-[var(--main-secondary-light)] text-md font-semibold text-[var(--text-primary)]">
                      {data.orderId}
                    </p>
                    <Button
                      isDisabled={isPending}
                      width="full"
                      rounded="none"
                      buttonFn={() => mutateAsync(data.orderId)}
                    >
                      Cancel Order
                    </Button>
                  </div>
                  <ListProductTable key={index} {...data} />
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 items-center justify-center w-full p-4">
            <p className="text-lg font-semibold text-[var(--text-primary-light)]">
              No Orders Made
            </p>
            <Button rounded="md" buttonFn={() => router.push("/shop")}>
              Shop Now
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default OrderHistoryTable;
