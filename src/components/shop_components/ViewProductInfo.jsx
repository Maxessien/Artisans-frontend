"use client";
import { useMutation } from "@tanstack/react-query";
import { FaPhone, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserAuth } from "../../store_slices/userAuthSlice";
import logger from "../../utils/logger";
import { addToCart } from "../../utils/regHelperFns";
import Button from "../reusable_components/Buttons";
import ProductImageSlide from "./ProductImageSlide";
import { useState } from "react";

const ViewProductInfo = ({
  images,
  name,
  description,
  price,
  ratings,
  productId,
  category,
}) => {
  //React and Next js hooks initailizations
  const dispatch = useDispatch();
  const { idToken, userData } = useSelector((state) => state.userAuth);
  const [showSection, setShowSection] = useState("description");
  const [quantity, setQuantity] = useState(1)

  //Functions and mutation Logic
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: () => addToCart(idToken, userData.userId, productId),
    onSuccess: (resData) => {
      logger.info("Added to cart response", resData);
      dispatch(
        setUserAuth({
          stateProp: "userData",
          value: resData,
        })
      );
      toast.success("Added Succesfully");
    },
    onError: () => {
      toast.error("Unable to add to cart, Try again later");
    },
  });

  //Component UI
  return (
    <>
      {logger.info("Mutation data in component", data)}
      <section className="flex flex-col sm:flex-row bg-[var(--text-secondary-light)] sm:px-2 sm:py-3 sm:rounded-md gap-3">
        <ProductImageSlide images={images} productName={name} />
        <div className="flex flex-col gap-3 px-2 sm:px-0">
          <p className="text-lg flex flex-col gap-2 items-start justify-center text-[var(--text-primary-light)] font-normal">
            <span className="text-base text-[var(--main-tertiary)]">{category}</span>
            <span>{name}</span>
            <span>&#8358;{price}</span>
          </p>
          <p className="text-xl text-[var(--main-secondary)] font-normal">
            <FaStar className="text-orange-400" />{" "}
            {ratings?.reduce((prev, curr) => curr.stars + prev, 0) /
              ratings?.length || 0}{" "}
            {`(${ratings?.length || 0} Reviews)`}
          </p>
          <div className="w-full flex justify-evenly items-center p-4 rounded-md bg-[var(--main-tertiary)]">
            <button
              onClick={() => setShowSection("description")}
              className={`w-full py-2 rounded-md text-[var(--text-primary-light)] ${
                showSection === "description" &&
                "bg-[var(--text-secondary-light)]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setShowSection("reviews")}
              className={`w-full py-2 rounded-md text-[var(--text-primary-light)] ${
                showSection === "description" &&
                "bg-[var(--text-secondary-light)]"
              }`}
            >
              Reviews
            </button>
          </div>
          {showSection === "description" && (
            <p className="text-base text-[var(--main-secondary)] font-normal">
              {description}
            </p>
          )}
          {showSection !== "reviews" && <>
            <h3 className="text-lg text-[var(--text-primary)] text-left font-normal">Quantity</h3>
            <div className="flex gap-2 justify-start items-center">
              <button className="text-lg text-[var(--main-primary)] bg-[var(--main-tertiary)] rounded-full p-2" onClick={()=>setQuantity((state)=>state - 1)}><FaMinus /></button>
                <span className="text-xl text-[var(--text-primary)] font-semibold">{quantity}</span>
              <button className="text-lg text-[var(--text0secindary-light)] bg-[var(--main-primary)] rounded-full p-2" onClick={()=>setQuantity((state)=>state + 1)}><FaPlus /></button>
            </div>
              <Button
                buttonFn={() => mutateAsync()}
                width="full"
                isDisabled={isPending}
              >
                Add To Cart{" - "}#{price}
              </Button>
              <Button>Buy Now</Button>
          </>}
        </div>
      </section>
    </>
  );
};

export default ViewProductInfo;
