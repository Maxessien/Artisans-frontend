import { authApi } from "../../../src/axiosApiBoilerplates/authApi";
import VendorDashboard from "../../../src/components/vendor_components/dashboard/VendorDashboard";
import { getServerAuthToken } from "../../../src/utils/auth.server";
import { noNullFn } from "../../../src/utils/fetchingHelpers";


const VendorDashboardPage = async () => {
  const token = await getServerAuthToken();
  const orders = await noNullFn(async ()=> await authApi(token).get("/orders/vendor"));
  const products = await noNullFn(async ()=> await authApi(token).get("/product/vendor"));

  return (
    <VendorDashboard
      recentOrders={orders?.data?.slice(0, 5)}
      totalProducts={products?.data.length || 0}
    />
  );
};

export default VendorDashboardPage;
