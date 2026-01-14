"use client";

import { useRouter } from "next/navigation";
import Button from "../reusable_components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addCheckoutProducts } from "../../store_slices/checkoutProductsSlice";

export const PriceCalc = ({ name = "", price = 0 }) => {
  return (
    <li className="flex justify-between items-center w-full text-base text-[var(--main-secondary-light)] font-normal">
      <span>{name}</span>{" "}
      <span className="text-[var(--text-primary)]">#{price}</span>
    </li>
  );
};

const CheckoutSummary = ({ deliveryFee = 5000, selectedProds = [] }) => {
  const { userData } = useSelector((state) => state.userAuth);
  const subTotal =
    selectedProds.reduce((prev, curr) => {
      if (curr.isSelected) {
        return Number(curr.price) * Number(curr.quantity) + prev;
      } else {
        return prev;
      }
    }, 0) || 0;

  const dispatch = useDispatch();

  const router = useRouter();

  const proceedToCheckout = () => {
    selectedProds.forEach((item) => dispatch(addCheckoutProducts(item)));
    router.push(`/${userData.userId}/checkout`);
  };

  return (
    <>
      <div className="w-full h-max">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Discount Code"
            className="w-full px-2 py-3 bg-[var(--main-tertiary-light)] placeholder:px-4 rounded-full"
          />
          <button className="font-medium absolute top-3 right-3 text-[var(--main-primary)] text-lg">
            Apply
          </button>
        </div>
        <ul className="space-y-3 px-2 mb-4 py-3 border-b-[var(--main-secondary-light)] border-b-2">
          <PriceCalc name="subTotal" price={subTotal} />
          <PriceCalc name="Delivery Fee" price={deliveryFee} />
        </ul>
        <li className="flex justify-between items-center w-full text-xl text-[var(--main-secondary-light)] font-normal">
          <span>Total</span> <span>#{subTotal + deliveryFee}</span>
        </li>
        <Button buttonFn={proceedToCheckout} width="100%">
          Proceed To Checkout
        </Button>
      </div>
    </>
  );
};

export default CheckoutSummary;
