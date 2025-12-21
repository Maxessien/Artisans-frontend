"use client";

import { useState } from "react";
import Button from "../reusable_components/Buttons";

const PaymentMethodToggle = ({ register }) => {
  const [method, setMethod] = useState("delivery");
  const [onlineMethod, setOnlineMethod] = useState("paystack")

  return (
    <div className="space-y-4">
      <label className="block font-medium mb-1">Payment Method</label>

      <div className="flex gap-2">
        <Button
          width="100%"
          type={method === "delivery" ? "primary" : "secondary"}
          buttonFn={() => setMethod("delivery")}
	  rounded="6px"
        >
          Pay On Delivery
        </Button>
        <Button
          width="100%"
          type={method === "online" ? "primary" : "secondary"}
          buttonFn={() => setMethod("online")}
	  rounded="6px"
        >
          Pay Online
        </Button>
      </div>

      <input
        type="hidden"
        {...register("paymentMethod", {required: "Payment method required"})}
        value={method}
        readOnly
      />

      {/* Conditionally show Pay Online options */}
      {method === "online" && (
        <div className="space-y-3 mt-3 border-t-[3px] border-t-[var(--main-primary-light)] pt-3">
          <p className="font-medium">Select Payment Gateway:</p>
          <div className="flex gap-3">
            <Button
          type={method === "paystack" ? "primary" : "secondary"}
          buttonFn={() => setOnlineMethod("paystack")}>Pay with Paystack</Button>
            <Button
          type={method === "flutterwave" ? "primary" : "secondary"}
          buttonFn={() => setOnlineMethod("flutterwave")}>Pay with Flutterwave</Button>
          </div>

      <input
        type="hidden"
        {...register("onlineMethod")}
        value={onlineMethod}
        readOnly
      />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodToggle;
