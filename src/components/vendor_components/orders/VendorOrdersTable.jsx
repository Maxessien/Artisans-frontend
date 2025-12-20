"use client";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import logger from "../../../utils/logger";

const StyledTh = ({ children }) => (
  <th className="text-lg text-[var(--text-primary)] px-2 py-1 font-bold">
    {children}
  </th>
);
const StyledTd = ({ children }) => (
  <td className="text-base text-[var(--text-primary)] px-2 py-1 font-semibold border-r-1 border-r-[var(---main-tertiary-light)]">
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
      {logger.info("Rendering vendor orders", ordersData)}
      <table className="border-collapse border-2 border-[var(---main-tertiary-light)] rounded-md">
        <thead>
          <tr className="border-b-1 border-b-[var(---main-tertiary-light)]">
            <StyledTh>Product Name</StyledTh>
            <StyledTh>Customer phone number</StyledTh>
            <StyledTh>Quantity</StyledTh>
            <StyledTh>Total price</StyledTh>
            <StyledTh>Date Added</StyledTh>
            <StyledTh>Status</StyledTh>
            <StyledTh>Action</StyledTh>
          </tr>
        </thead>
        <tbody>
          {ordersData.map(
            ({
              orderId,
              name,
              customerContactInfo: { phone },
              createdAt,
              quantityOrdered,
              deliveryStatus,
              price,
            }) => {
              const timeStamp = new Date(createdAt);
              return (
                <tr
                  className="border-b-1 border-b-[var(---main-tertiary-light)]"
                  onClick={() =>
                    router.push(`/${userId}/vendor/orders/${orderId}`)
                  }
                >
                  <StyledTd>{name}</StyledTd>
                  <StyledTd>{phone}</StyledTd>
                  <StyledTd>{quantityOrdered}</StyledTd>
                  <StyledTd>{price * quantityOrdered}</StyledTd>
                  <StyledTd>{timeStamp.toLocaleString()}</StyledTd>
                  <StyledTd>{deliveryStatus}</StyledTd>
                  <StyledTd
                    onClick={() =>
                      router.push(`/${userId}/vendor/orders/${orderId}`)
                    }
                  >
                    <span className="flex items-center gap-1">
                      <FaEye /> View
                    </span>
                  </StyledTd>
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
