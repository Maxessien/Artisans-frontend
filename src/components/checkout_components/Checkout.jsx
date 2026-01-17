"use client"

import MobilePageHeader from "../page_layouts/MobilePageHeader";
import PaymentMethodCard from "./PaymentMethodCard";
import {
  DeliveryTruckIcon,
  FlutterWaveIcon,
  PayStackIcon,
} from "../svg_components/PaymentSvg";
import { FaLocationArrow } from "react-icons/fa";
import { useState } from "react";
import PayOnDeliveryTerms from "./PayOnDeliveryTerms";
import Link from "next/link";
import { ForwardArrowIcon } from "../svg_components/NavigationSvg";
import { PriceCalc } from "../cart_components/CheckoutSummary";
import Button from "../reusable_components/Buttons";
import { usePaystackPayment } from "react-paystack";
import logger from "../../utils/logger";
import { toast } from "react-toastify";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const Checkout = ({ address = "23 Adeola Street, Ibadan" }) => {
  const router = useRouter();
  const [selected, setSelected] = useState("delivery");
  const [refId] = useState(()=>uuidv4())
  const { userData, idToken } = useSelector((state) => state.userAuth);
  const cartProducts = useSelector((state) => state.checkoutProducts);


  useEffect(()=>{
    if (cartProducts?.length <= 0) router.replace(`/${userData.userId}/cart`)
  }, [cartProducts])

  const subTotal = cartProducts?.reduce(
    (prev, curr) => (Number(curr.price) * Number(curr.quantity)) + prev,
    0
  );

  const paystackConfig = {
    reference: refId,
    email: userData.email,
    amount: (subTotal + 5000) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = async (ref) => {
    try {
      console.log(idToken)
      await authApi(idToken).post(`/orders/confirm`, {
        ref,
      });
      toast.success("Order placed")
      router.replace(`/${userData.userId}/orders`);
    } catch (err) {
      logger.error("Paystack on success err", err);
      toast.error("Couldn't complete orders try again later");
    }
  };

  const onClose = () => toast.error("Payment Incomplete");

  const initPaystackPayment = usePaystackPayment(paystackConfig);

  const handleCheckout = async () => {
    try {
      const formattedBody = cartProducts.map(
        ({ productId, quantity, price }) => ({
          productId,
          quantity,
          price,
          address: address,
          paymentMethod: selected,
          reference: refId
        })
      );
      await authApi(idToken).post("/orders/user", formattedBody);
      if (selected === "paystack") initPaystackPayment({ onSuccess, onClose });
      if (selected === "delivery") {
        toast.success("Order placed")
        router.replace(`/${userData.userId}/orders`)
      };
    } catch (err) {
      logger.error("Checkout err", err);
      toast.error("Couldn't complete payment try again later");
    }
  };

  return (
    <>
      <MobilePageHeader pageTitle="Checkout" />
      <section className="space-y-3">
        <h2 className="text-lg text-(--text-primary) w-full text-left font-normal">
          Payment Method
        </h2>
        <p className="text-base text-(--main-secondary) w-full text-center font-normal">
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
          <h2 className="text-lg text-(--text-primary) font-normal">
            Shipping Address
          </h2>
          <Link href={`/${userData.userId}/profile`} className="text-base text-(--main-primary) font-normal">
            Add New Address
          </Link>
        </header>
        <div className="flex justify-between items-center shadow-[0px_0px_10px_-7px_black] bg-(--text-secondary-light) rounded-md px-2 py-3">
          <FaLocationArrow />
          <p>{address}</p>
          <ForwardArrowIcon />
        </div>
      </section>

      <section className="w-full space-y-2">
        <h2 className="text-lg text-(--text-primary) text-left w-full font-normal">
          Order Summary
        </h2>
        <div className="flex flex-col gap-2 shadow-[0px_0px_10px_-7px_black] rounded-md bg-(--text-secondary-light) w-full px-2 py-3">
          <PriceCalc name="Sub-Total" price={subTotal} />
          <PriceCalc name="Delivery Fee" price={5000} />
          <span className="w-full h-[2px] block bg-(--main-secondary)"></span>
          <p className="flex justify-between items-center text-lg text-(--text-primary) font-normal">
            <span>Total Amount</span>
            <span>#{subTotal + 5000}</span>
          </p>
        </div>
      </section>

      <Button buttonFn={handleCheckout} width="100%">
        Pay Now
      </Button>
    </>
  );
};

export default Checkout;
