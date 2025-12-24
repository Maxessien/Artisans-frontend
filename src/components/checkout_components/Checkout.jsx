import MobilePageHeader from "../page_layouts/MobilePageHeader";
import PaymentMethodCard from "./PaymentMethodCard";
import {
  DeliveryTruckIcon,
  FlutterWaveIcon,
  PayStackIcon,
} from "../svg_components/PaymentSvg";
import { useState } from "react";
import PayOnDeliveryTerms from "./PayOnDeliveryTerms";
import Link from "next/link";

const Checkout = () => {
  const [selected, setSelected] = useState("paystack");

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
      <section>
        <header>
          <h2>Shipping Address</h2>
          <Link>Edit Address</Link>
        </header>
      </section>
    </>
  );
};

export default Checkout;
