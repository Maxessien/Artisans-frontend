import { authApi } from "../../../../src/axiosApiBoilerplates/authApi";
import { Cards, PageHeader } from "../../../../src/components/reusable_components/CardsLayouts";
import VendorOrdersTable from "../../../../src/components/vendor_components/orders/VendorOrdersTable";
import { getServerAuthToken } from "../../../../src/utils/auth.server";
import { noNullFn } from "../../../../src/utils/fetchingHelpers";

const VendorOrdersPage = async () => {
  const token = await getServerAuthToken();
  const orders = await noNullFn(
    async () => await authApi(token).get("/orders/vendor")
  );

  return (
    <>
      <PageHeader headerText={"Orders List"} />
      {orders?.data && orders?.data?.length > 0 ? (
        <div className="w-full max-w-full overflow-x-auto">
          <VendorOrdersTable ordersData={orders.data} />
        </div>
      ) : (
        <Cards>
          <p className="text-center text-[var(--main-secondary)] text-lg font-semibold">
            You haven't recieved any orders
          </p>
        </Cards>
      )}
    </>
  );
};

export default VendorOrdersPage;
