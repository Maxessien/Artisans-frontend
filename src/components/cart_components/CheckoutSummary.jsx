"use client";

import Button from "../reusable_components/Buttons";

const PriceCalc = (name, price)=>{
  return (
    <li className="flex justify-between items-center w-full text-lg text-[var(--main-secondary-light)] font-normal"><span>{name}</span> <span className="text-[var(--text-primary)]">#{price}</span></li>
  )
}

const CheckoutSummary = ({deliveryFee, selectedProds=[]}) => {

  const subTotal = selectedProds.reduce((prev, curr)=>{
    if (curr.isSelected) {
      return (Number(curr.price) * Number(curr.quantity)) + prev
    } else {
      return prev
    }
  }, 0) || 0
 
  //Function would be defined later
  const submitOrder = ()=>null

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <input type="text" placeholder="Enter Discount Code" className="w-full px-2 py-3 bg-[var(--main-tertiary-light)] placeholder:px-4 rounded-full" />
          <button className="font-medium absolute top-3 right-3 text-[var(--main-primary)] text-lg">Apply</button>
        </div>
        <ul className="space-y-3 px-2 border-b-[var(--main-secondary-light)] border-b-2">
          <PriceCalc name={"subTotal"} price={subTotal} />
          <PriceCalc name={"Delivery Fee"} price={deliveryFee} />
        </ul>
        <li className="flex justify-between items-center w-full text-xl text-[var(--main-secondary-light)] font-normal"><span>Total</span> <span>#{subTotal + deliveryFee}</span></li>
        <Button buttonFn={submitOrder} width="100%">Proceed To Checkout</Button>
      </div>
    </>
  );
};

export default CheckoutSummary;
