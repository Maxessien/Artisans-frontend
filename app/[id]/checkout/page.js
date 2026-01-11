import {redirect} from "next/navigation"
import { getUserServerSide } from "../../../src/utils/auth.server";
import Checkout from "../../../src/components/checkout_components/Checkout";

export const metadata = {
	title: "Lasu Mart-Checkout"
}

const CheckoutPage = async ({ params }) => {
	const idParams = await params
  const {user} = await getUserServerSide()
  if(user?.total_cart_items <= 0){
    redirect(`/${idParams.id}/cart`)
  }
  return (
    <>
    <main className="px-3 py-4">
      <Checkout />
    </main>
    </>
  );
};

export default CheckoutPage;
