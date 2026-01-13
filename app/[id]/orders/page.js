import { redirect } from "next/navigation.js";
import { authApi } from "../../../src/axiosApiBoilerplates/authApi.js";
import { getServerAuthToken } from "../../../src/utils/auth.server.js";
import logger from "../../../src/utils/logger.js";
import OrderHistory from "./../../../src/components/profile_components/order-history/OrderHistory";
import MobilePageHeader from "../../../src/components/page_layouts/MobilePageHeader.jsx";

const OrderHistoryPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  if (!sParams?.status) redirect("?status=active");
  const token = await getServerAuthToken();
  const orderHistory = await authApi(token).get(`/orders/user`, {
    params: { status: sParams?.status ?? "active" },
  });
  logger.info("Fetched order history", orderHistory?.data);
  return (
    <div className="space-y-3 py-4 px-3">
      <OrderHistory orders={orderHistory?.data ?? []} />
    </div>
  );
};

export default OrderHistoryPage;
