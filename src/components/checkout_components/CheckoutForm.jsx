"use client"

import { useForm } from "react-hook-form";
// import PaymentMethodToggle from "./PaymentMethodToggle"
import { useMutation } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { authApi } from "../../axiosApiBoilerplates/authApi";
import logger from "../../utils/logger";
import Button from './../reusable_components/Buttons';
import "./scss/checkout_form.scss";

const CheckoutForm = () => {
  const {idToken, userData} = useSelector((state)=>state.userAuth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: userData.displayName,
      email: userData.email,
      phone: userData.phoneNumber,
      address: "",
    },
  })

  const onSubmit = async(data) => {
    try{
      const res = await authApi(idToken).post(`/orders/user/${userData.userId}`, data)
      await authApi(idToken).post(`/user/${userData.userId}`, {cart: []})
      logger.info("Checkout order response", res)
      toast.success("Order made successfully")
      return res
    }catch(err){
      logger.error("Checkout order failed", err)
      toast.error("Couldn't place order, try again later")
      throw err
    }
  }

  const {mutateAsync, isPending} = useMutation({mutationFn: (data)=>onSubmit(data)})

  return (
    <section className="checkout_section">
      <h1>
        Checkout Details
      </h1>

      <form onSubmit={handleSubmit(mutateAsync)} className="checkout_form">
        {/* Full Name */}
        <div className="checkout_form_wrapper">
          <label className="checkout_form_wrapper_label">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="checkout_form_wrapper_input"
            placeholder="Enter your name"
          />
          {errors.fullName && (
            <p className="checkout_form_wrapper_errors">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div className="checkout_form_wrapper">
          <label className="checkout_form_wrapper_label">Email (optional)</label>
          <input
            type="email"
            {...register("email")}
            className="checkout_form_wrapper_input"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div className="checkout_form_wrapper">
          <label className="checkout_form_wrapper_label">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            className="checkout_form_wrapper_input"
            placeholder="+234 801 234 5678"
          />
          {errors.phone && (
            <p className="checkout_form_wrapper_errors">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="checkout_form_wrapper">
          <label className="checkout_form_wrapper_label">Delivery Address</label>
          <input
            type="text"
            {...register("address", { required: "Delivery address is required" })}
            className="checkout_form_wrapper_input"
            placeholder="Enter your delivery address"
          />
          {errors.address && (
            <p className="checkout_form_wrapper_errors">
              {errors.address.message}
            </p>
          )}
        </div>

        <Button isDisabled={isPending} buttonType="submit" rounded="6px">{isPending ? "..." : "Proceed To Payment"}</Button>
      </form>
    </section>
  )
}

export default CheckoutForm