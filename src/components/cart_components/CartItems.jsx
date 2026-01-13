"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import { setUserAuth } from "../../store_slices/userAuthSlice";
import logger from "../../utils/logger";
import CartListProductCard from "./CartListProductCards";
import CheckoutSummary from "./CheckoutSummary";

const CartItems = ({ cartDetails }) => {
  const { idToken } = useSelector((state) => state.userAuth);
  const [cartItems, setCartItems] = useState(
    cartDetails?.length > 0 && Array.isArray(cartDetails) ? cartDetails : []
  );

  const [selected, setSelected] = useState(
    cartDetails?.map(({ price, quantity, product_id, cart_id }) => ({
      price,
      quantity,
      productId: product_id,
      cartId: cart_id,
      isSelected: true,
    })) || []
  );
  const dispatch = useDispatch();

  //Update state whenever product is deleted
  const removeFromCart = (cartId) =>
    setCartItems((state) => state.filter((item) => item.cart_id !== cartId));

  //Update state whenever quatity is increased
  const updateCartQuantity = (cartId, quantity) =>
    setCartItems((state) =>
      state.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: quantity } : item
      )
    );

  const clearCart = async () => {
    try {
      const res = await authApi(idToken).post(
        `/user/${userData.userId}`,
        { cart: [] },
        { params: { type: "dbOnly" } }
      );
      logger.info("Cleared cart in db store", res);
      dispatch(setUserAuth({ stateProp: "userData", value: res.data }));
    } catch (err) {
      logger.error("Failed to clear cart", err);
      toast.error("There was an error, try again later");
    }
  };

  const selectFn = (productId) => {
    const newSelected = selected.map((selection) => {
      return selection.productId === productId
        ? { ...selection, isSelected: !selection.isSelected }
        : selection;
    });
    setSelected(newSelected);
  };

  const isSelected = (productId) => {
    return selected.some(
      (selection) => selection.productId === productId && selection.isSelected
    )
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => clearCart(),
  });

  return (
    <>
      <section className="w-full cursor-pointer px-4 py-3 bg-[var(--text-secondary-light)] h-screen min-h-130 shadow-[0px_2px_8px_-3px_black] rounded-md">
        <header className="flex items-center justify-between w-full">
          <h2 className="text-2xl text-center w-full font-medium text-[var(--text-primary-light)]">
            Cart Items
          </h2>
          {cartItems?.length > 0 && (
            <button
              disabled={isPending}
              onClick={() => mutateAsync()}
              className="text-base font-semibold text-[var(--main-primary)] disabled:opacity-65"
            >
              Clear all
            </button>
          )}
        </header>
        {cartItems?.length > 0 ? (
          <div className="h-full">
            <div className="overflow-y-auto w-full h-full">
              {cartItems.map(
                ({
                  product_name,
                  price,
                  quantity,
                  cart_id,
                  product_id,
                  images,
                }) => {
                  return (
                    <>
                      <div key={cart_id} className="w-full">
                        <CartListProductCard
                          name={product_name}
                          quantity={quantity}
                          price={price}
                          imageUrl={images[0].url}
                          cartId={cart_id}
                          productId={product_id}
                          isSelected={isSelected(product_id)}
                          removeFn={removeFromCart}
                          updateFn={updateCartQuantity}
                          selectFn={selectFn}
                        />
                      </div>
                    </>
                  );
                }
              )}
            </div>
            <CheckoutSummary deliveryFee={3000} selectedProds={selected} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl text-[var(--text-pimary-light)] font-medium">
              Cart is empty
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default CartItems;
