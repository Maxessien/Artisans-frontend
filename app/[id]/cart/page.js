import CartItems from "../../../src/components/cart_components/CartItems"
import CheckoutSummary from "../../../src/components/cart_components/CheckoutSummary"

export const metadata = {
  title: "Lasu Mart-Cart",
};

const Cart = async()=>{
    
    return (
      <>
        <main className="w-screen">
          <CartItems />
          <CheckoutSummary />
        </main>
      </>
    );
}

export default Cart