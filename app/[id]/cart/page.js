import CartItems from "../../../src/components/cart_components/CartItems"
import CheckoutSummary from "../../../src/components/cart_components/CheckoutSummary"
import { getUserServerSide } from "../../../src/utils/auth.server";

export const metadata = {
  title: "Lasu Mart-Cart",
};

const Cart = async()=>{
  const {user} = await getUserServerSide()
    return (
      <>
        <main className="md:grid md:grid-cols-[75%_25%] flex flex-col gap-3 w-screen px-6 py-5 min-h-[calc(100vh-200px)]">
          <CartItems initUserData={user} />
          <CheckoutSummary initUserData={user} />
        </main>
      </>
    );
}

export default Cart