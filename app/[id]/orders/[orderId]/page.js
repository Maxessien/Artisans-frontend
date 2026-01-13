import React from "react";
import { getServerAuthToken } from "../../../../src/utils/auth.server";
import { authApi } from "../../../../src/axiosApiBoilerplates/authApi";
import logger from "../../../../src/utils/logger";
import { notFound } from "next/navigation";
import OrderDetails from "../../../../src/components/profile_components/order-history/OrderDetails";

const OrderDetailsPage = async ({ params }) => {
  try {
    const par = await params;
    const token = await getServerAuthToken();
    const orderDetails = await authApi(token).get(
      `/orders/user/${par.orderId}`
    );
    const {
      order_id,
      payment_method,
      address,
      date_added,
      date_delivered,
      display_name,
      email,
      phone_number,
    } = orderDetails.data;
    logger.log("Order details", orderDetails.data);
    return (
      <>
        <OrderDetails
          receiverInfo={{ address, display_name, email, phone_number }}
          orderId={order_id}
          orderDate={date_added}
          deliveryDate={date_delivered}
          paymentMethod={payment_method}
        />
      </>
    );
  } catch (err) {
    logger.error("Order details error", err);
    return notFound();
  }
};

export default OrderDetailsPage;
