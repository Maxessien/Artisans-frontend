import { authApi } from "../../../src/axiosApiBoilerplates/authApi.js";
import SignOutUser from "../../../src/components/reusable_components/SignOutUser.jsx";
import { getServerAuthToken } from "../../../src/utils/auth.server.js";
import logger from "../../../src/utils/logger.js";
import { accountHeadersStyles } from "../account/layout.js";
import OrderHistory from './../../../src/components/account_components/order-history/OrderHistory';


const OrderHistoryPage = async()=>{
    try {
        const token = await getServerAuthToken()
        const orderHistory = await authApi(token).get(`/orders/user`)
	    logger.info("Fetched order history", orderHistory)
        return <>
        <h1 className={accountHeadersStyles}>
            Orders
        </h1>
        <OrderHistory initOrdersData={orderHistory.data} />
        </>
    } catch (err) {
	    logger.error("Failed to load order history", err)
        return <SignOutUser />
    }
}

export default OrderHistoryPage