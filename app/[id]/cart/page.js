import { authApi } from "../../../src/axiosApiBoilerplates/authApi";
import CartItems from "../../../src/components/cart_components/CartItems"
import CheckoutSummary from "../../../src/components/cart_components/CheckoutSummary"
import { getServerAuthToken } from "../../../src/utils/auth.server";
import logger from "../../../src/utils/logger";

export const metadata = {
  title: "Lasu Mart-Cart",
};

const Cart = async()=>{
  const token = await getServerAuthToken()

  const cartItems = await authApi(token).get("/user/cart")
  logger.log("Cart items details", cartItems.data)
    
    return (
      <>
        <main className="w-screen">
          <CartItems initUserData={cartItems.data} />
        </main>
      </>
    );
}

export default Cart