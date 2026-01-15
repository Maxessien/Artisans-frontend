"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import logger from "../../../utils/logger";
import { months } from "../../profile_components/order-history/OrderHistoryCard";

const StyledTh = ({ children }) => (
  <th className="text-lg text-[var(--text-primary)] px-2 py-1 font-medium">
    {children}
  </th>
);
const StyledTd = ({ children }) => (
  <td className="text-base text-[var(--text-primary)] px-2 py-1 font-normal">
    {children}
  </td>
);

const VendorOrdersTable = ({ ordersData }) => {
  const {
    userData: { userId },
  } = useSelector((state) => state.userAuth);
  const router = useRouter();
  return (
    <>
      <table className="border-collapse border-2 border-[var(---main-tertiary-light)] rounded-md">
        <thead>
          <tr className="border-b-1 bg-(--main-tertiary) border-b-[var(---main-tertiary-light)]">
            <StyledTh>Item</StyledTh>
            <StyledTh>Date</StyledTh>
            <StyledTh>Customer</StyledTh>
            <StyledTh>Payment</StyledTh>
            <StyledTh>Quantity</StyledTh>
            <StyledTh>Total</StyledTh>
            <StyledTh>Status</StyledTh>
          </tr>
        </thead>
        <tbody>
          {ordersData?.map(
            ({
              order_id,
              product_name,
              date_added,
              customer_name,
              payment_method,
              quantity_ordered,
              price,
              delivery_status,
            }) => {
              const timeStamp = new Date(date_added);
              return (
                <tr
                  key={order_id}
                  className="border-b-1 border-b-[var(---main-tertiary-light)]"
                  onClick={() =>
                    router.push(`/${userId}/vendor/orders/${order_id}`)
                  }
                >
                  <StyledTd>{product_name}</StyledTd>
                  <StyledTd>{`${timeStamp.getDate()} ${
                    months[timeStamp.getMonth()]
                  } ${timeStamp.getFullYear()}`}</StyledTd>
                  <StyledTd>{customer_name}</StyledTd>
                  <StyledTd>{payment_method}</StyledTd>
                  <StyledTd>{quantity_ordered}</StyledTd>
                  <StyledTd>{price * quantity_ordered}</StyledTd>
                  <StyledTd>{delivery_status}</StyledTd>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default VendorOrdersTable;
