"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./scss/auth_form_field.scss";
import React, { useState } from "react";

const AuthFormField = ({
  children,
  email = false,
  password = false,
  confirmPassword = false,
  submitFunction,
  name = false,
  storeName = false,
  phone = false,
  hasDefault = false,
  buttonText = "",
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: hasDefault
      ? {
          name: hasDefault.name ? hasDefault.name : "",
          email: hasDefault.email ? hasDefault.email : "",
          password: hasDefault.password ? hasDefault.password : "",
          gender: hasDefault.gender ? hasDefault.gender : "",
          phone: hasDefault.phone ? hasDefault.phone : "",
        }
      : {
          name: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
        },
    mode: "onTouched",
  });

  const passwordWatch = watch("password");

  const submitForm = (data) => {
    submitFunction(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        {name && (
          <label className="form_labels" htmlFor="name">
            <p className="form_labels_names">Name</p>
            <input
              className="form_labels_inputs"
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", {
                required: "This field is required",
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
            {errors.name && (
              <p className="form_labels_error">{errors.name.message}</p>
            )}
          </label>
        )}

        {storeName && (
          <label className="form_labels" htmlFor="storeName">
            <p className="form_labels_names">Name</p>
            <input
              className="form_labels_inputs"
              type="text"
              id="storeName"
              placeholder="Enter your store name"
              {...register("storeName", {
                required: "This field is required",
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
            {errors.storeName && (
              <p className="form_labels_error">{errors.storeName.message}</p>
            )}
          </label>
        )}
        {email && (
          <label className="form_labels" htmlFor="email">
            <p className="form_labels_names">Email</p>
            <input
              className="form_labels_inputs"
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="form_labels_error">{errors.email.message}</p>
            )}
          </label>
        )}
        {phone && (
          <label className="form_labels" htmlFor="phone">
            <p className="form_labels_names">phone</p>
            <div className="phone_wrapper">
              <div className="country_code">+234</div>
              <input
                className="phone_wrapper_input"
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "This field is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 11,
                    message: "Phone number cannot be more than 11 digits",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="form_labels_error">{errors.phone.message}</p>
            )}
          </label>
        )}
        {password && (
          <label className="form_labels" htmlFor="password">
            <p className="form_labels_names">Password</p>
            <div>
              <input
                className="form_labels_inputs"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your passsword"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "password must be at least 8 characters long",
                  },
                  validate: (value) => {
                    if (
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*._+=-])[A-Za-z0-9!@#$%^&*._+=-]+$/.test(
                        value
                      )
                    )
                      return "Password must contain one uppercase, lowercase and a special character";
                    return true;
                  },
                })}
              />
              <button type="button">
                {showPassword ? (
                  <FaEye
                    className="text-xl"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-xl"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="form_labels_error">{errors.password.message}</p>
            )}
          </label>
        )}
        {confirmPassword && (
          <label className="form_labels" htmlFor="confirmPassword">
            <p className="form_labels_names">Password</p>
            <div>
              <input
                className="form_labels_inputs"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your passsword"
                {...register("confirmPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "password must be at least 8 characters long",
                  },
                  validate: (value) => {
                    if (value !== passwordWatch)
                      return "Must be the same as password";
                    if (
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*._+=-])[A-Za-z0-9!@#$%^&*._+=-]+$/.test(
                        value
                      )
                    )
                      return "Password must contain one uppercase, lowercase and a special character";
                    return true;
                  },
                })}
              />
              <button type="button">
                {showConfirmPassword ? (
                  <FaEye
                    className="text-xl"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-xl"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="form_labels_error">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
        )}
        {children && React.cloneElement(children)}
        <button disabled={isSubmitting} type="submit" className="submit_button">
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default AuthFormField;
