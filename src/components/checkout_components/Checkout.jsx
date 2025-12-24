import MobilePageHeader from "../page_layouts/MobilePageHeader"
import {} from "react-icons/fa"
import PaymentMethodCard from "./PaymentMethodCard"


const Checkout = () => {


  return (
    <>
    <MobilePageHeader pageTitle="Checkout" />
    <section>
        <h2>Payment Method</h2>
        <p>Your Payment is processed securely. We never store your card details</p>
        <PaymentMethodCard title="Pay with Flutterwave" />
        <PaymentMethodCard title="Pay with Paystack" />
        <PaymentMethodCard title="Payment on Delivery" />
    </section>
    </>
  )
}

export default Checkout