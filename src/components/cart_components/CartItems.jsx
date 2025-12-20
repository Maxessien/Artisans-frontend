"use client";

import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import { setUserAuth } from "../../store_slices/userAuthSlice";
import { toast } from "react-toastify";
import CartListProductCard from "./CartListProductCards";
import { useState } from "react";

const CartItems = ({ initUserData }) => {
  const { userData, idToken } = useSelector((state) => state.userAuth);
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch();

  const clearCart = async () => {
    try {
      const res = await authApi(idToken).post(
        `/user/${userData.userId}`,
        { cart: [] },
        { params: { type: "dbOnly" } }
      );
      console.log(res, "db store");
      dispatch(setUserAuth({ stateProp: "userData", value: res.data }));
    } catch (err) {
      console.log(err);
      toast.error("There was an error, try again later");
    }
  };

  const selectFn = (productId)=>{
    const newSelected = selected.map((selection)=> {
      return selection.productId === productId ? {...selection, isSelected: true} : selection
    })
    setSelected(newSelected)
  }

  const isSelected = (productId)=>{
    return selected.some((selection)=> selection.productId === productId && selection.isSelected)
  }

  const user = userData ?? initUserData;

  const { mutateAsync } = useMutation({ mutationFn: () => clearCart() });

  return (
    <>
      {console.log(user)}
      <section className="w-full px-4 py-3 bg-[var(--text-secondary-light)] shadow-[0px_2px_8px_-3px_black] rounded-md">
        <header className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold text-[var(--text-primary-light)]">
            Cart Items
          </h2>
          {user?.cart?.length > 0 && (
            <button
              onClick={() => mutateAsync()}
              className="text-base font-semibold text-[var(--main-primary)]"
            >
              Clear all
            </button>
          )}
        </header>
        {user?.cart?.length > 0 ? (
          <form>
            {user?.cart.map(
              (
                { name, price, description, quantity, productId, images },
              ) => {
                return (
                  <>
                  <div onClick={()=>selectFn(productId)}>
                      <CartListProductCard
                        name={name}
                        quantity={quantity}
                        price={price}
                        description={description}
                        imageUrl={images[0].url}
                        productId={productId}
                        isSelected={isSelected}
                        setSelectedFn = {setSelected}
                      />
                  </div>
                  </>
                );
              }
            )}

          </form>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg text-[var(--text-pimary-light)] font-semibold">
              Cart is empty
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default CartItems;
