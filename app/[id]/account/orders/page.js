import { authApi } from "../../../../src/axiosApiBoilerplates/authApi";
import SignOutUser from "../../../../src/components/reusable_components/SignOutUser";
import { getUserServerSide } from "../../../../src/utils/auth.server.js";
import logger from "../../../../src/utils/logger";
import { accountHeadersStyles } from "../layout.js";
import OrderHistoryTable from './../../../../src/components/account_components/order-history/OrderHistoryTable';


const OrderHistory = async()=>{
    try {
        const {token, user} = await getUserServerSide()
        const orderHistory = await authApi(token).get(`/orders/user/${user.uid}`)
	logger.info("Fetched order history", orderHistory)
        return <>
        <h1 className={accountHeadersStyles}>
            Orders
        </h1>
        <OrderHistoryTable initOrdersData={orderHistory.data} />
        </>
    } catch (err) {
	    logger.error("Failed to load order history", err)
        return <SignOutUser />
    }
}

export default OrderHistory