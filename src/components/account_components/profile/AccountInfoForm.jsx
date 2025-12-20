"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import { setUserAuth } from "../../../store_slices/userAuthSlice";
import { formStyles } from "./formStyle";

const AccountInfoForm = () => {
  const { idToken, userData } = useSelector((state) => state.userAuth);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { formLabel, labelText, formInput, errorMessage } = formStyles;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { ...userData },
  });

  const updateAccount = async (data) => {
    console.log(data);
    try {
      const updatedUser = await authApi(idToken).post(`/user/${userData.userId}`, data);
      dispatch(setUserAuth({ stateProp: "userData", value: updatedUser.data }));
      return updatedUser.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const editBtnFn = () => {
    if (isEditing) reset();
    setIsEditing(!isEditing);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => updateAccount(data),
    onSuccess: () => setIsEditing(false),
  });

  return (
    <>
      <form className="form" onSubmit={handleSubmit(mutateAsync)}>
        <label className={formLabel} htmlFor="name">
          <p className={labelText}>Name</p>
          <input
            className={formInput}
            disabled={!isEditing}
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("displayName", {
              required: "Name cannot be empty",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
              maxLength: {
                value: 16,
                message: "Name must be below 16 characters long",
              },
            })}
          />
          {errors?.name && (
            <p className={errorMessage}>{errors.name.message}</p>
          )}
        </label>
        <label className={formLabel} htmlFor="email">
          <p className={labelText}>Email</p>
          <input
            className={formInput}
            disabled={!isEditing}
            type="text"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email cannot be empty",
              // pattern: { value: "22222", message: "Invalid email address" },
            })}
          />
          {errors?.email && (
            <p className={errorMessage}>{errors.email.message}</p>
          )}
        </label>
        <label className={formLabel} htmlFor="phoneNumber">
          <p className={labelText}>Phone Number</p>
          <input
            className={formInput}
            disabled={!isEditing}
            type="phoneNumber"
            id="phoneNumber"
            placeholder="Enter your phone number"
            {...register("phoneNumber", {
              required: "Phone Number cannot be empty",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              maxLength: {
                value: 11,
                message: "Phone number cannot be more than 11 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Can only contain numbers",
              },
            })}
          />
          {errors?.phone && (
            <p className={errorMessage}>{errors.phone.message}</p>
          )}
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            className="bg-[var(--main-tertiary)] text-base text-[var(--text-primary)] font-semibold px-3 py-2 rounded-md"
            onClick={() => editBtnFn()}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            disabled={!isEditing}
            type="submit"
            className="bg-[var(--main-primary)] text-base text-[var(--main-tertiary-light)] disabled:opacity-[0.6] font-semibold px-3 py-2 rounded-md"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AccountInfoForm;
