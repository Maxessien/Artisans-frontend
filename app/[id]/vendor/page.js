import { authApi } from "../../../src/axiosApiBoilerplates/authApi";
import VendorDashboard from "../../../src/components/vendor_components/dashboard/VendorDashboard";
import { getServerAuthToken } from "../../../src/utils/authHelpers";

const VendorDashboardPage = async () => {
  const token = await getServerAuthToken();
  const orders = (await authApi(token).get("/orders/vendor")) || { data: null };
  const products = (await authApi(token).get("/product/vendor")) || {
    data: [],
  };

  return (
    <VendorDashboard
      recentOrders={orders.data.slice(0, 5)}
      totalProducts={products?.data.length || 0}
    />
  );
};

export default VendorDashboardPage;
