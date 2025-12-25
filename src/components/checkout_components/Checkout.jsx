import MobilePageHeader from "../page_layouts/MobilePageHeader";
import PaymentMethodCard from "./PaymentMethodCard";
import {
  DeliveryTruckIcon,
  FlutterWaveIcon,
  PayStackIcon,
} from "../svg_components/PaymentSvg";
import { FaLocationArrow } from "react-icons/fa"
import { useState } from "react";
import PayOnDeliveryTerms from "./PayOnDeliveryTerms";
import Link from "next/link";
import { ForwardArrowIcon } from "../svg_components/NavigationSvg";
import { PriceCalc } from "../cart_components/CheckoutSummary";
import Button from "../reusable_components/Buttons";

const Checkout = ({address="23 Adeola Street, Ibadan", cartProducts=[]}) => {
  const [selected, setSelected] = useState("paystack");

  const subTotal = cartProducts.reduce((prev, curr)=>Number(curr.price) + prev, 0)

  return (
    <>
      <MobilePageHeader pageTitle="Checkout" />
      <section>
        <h2 className="text-lg text-(--text-primary) w-full text-left font-normal">Payment Method</h2>
        <p className="text-lg text-(--main-secondary) w-full text-center font-normal">
          Your Payment is processed securely. We never store your card details
        </p>
        <PaymentMethodCard
          onClick={() => setSelected("flutterwave")}
          isSelected={selected === "flutterwave"}
          icon={<FlutterWaveIcon />}
          title="Pay with Flutterwave"
        />
        <PaymentMethodCard
          onClick={() => setSelected("paystack")}
          isSelected={selected === "paystack"}
          icon={<PayStackIcon />}
          title="Pay with Paystack"
        />
        <PaymentMethodCard
          onClick={() => setSelected("delivery")}
          isSelected={selected === "delivery"}
          icon={<DeliveryTruckIcon />}
          title="Payment on Delivery"
        />
      </section>
      {selected === "delivery" && (
        <AnimatePresence>
          <PayOnDeliveryTerms />
        </AnimatePresence>
      )}
      <section className="space-y-2">
        <header className="w-full flex justify-between items-center">
          <h2 className="text-lg text-(--text-primary) font-normal">Shipping Address</h2>
          <Link className="text-base text-(--main-primary) font-normal">Add New Address</Link>
        </header>
        <div className="flex justify-between items-center bg-(--text-secondary-light) rounded-md px-2 py-3">
          <FaLocationArrow />
          <p>{address}</p>
          <ForwardArrowIcon />
        </div>
      </section>

      <section className="w-full space-y-2">
        <h2 className="text-lg text-(--text-primary) text-left w-full font-normal">Order Summary</h2>
        <div className="flex flex-col gap-2 rounded-md bg-(--text-secondary-light) w-full px-2 py-3">
          <PriceCalc name="Sub-Total" price={subTotal} />
          <PriceCalc name="Delivery Fee" price={5000} />
          <span className="w-full h-1 block bg-(--main-secondary)"></span>
          <p className="flex justify-between items-center text-lg text-(--text-primary) font-normal"><span>Total Amount</span><span>{subTotal + 5000}</span></p>
        </div>
      </section>

      <Button width="100%">Pay Now</Button>
    </>
  );
};

export default Checkout;
