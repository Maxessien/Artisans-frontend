"use client"

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import logger from "../../../utils/logger";
import Button from '../../reusable_components/Buttons';
import { formStyles } from "./formStyle";

const ChangeAccountPasswordForm = () => {
  const { idToken,  userData: {userId} } = useSelector((state) => state.userAuth);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  const {formLabel, labelText, formInput, errorMessage} = formStyles

  const changePassword = async ({newPassword}) => {
    try {
      const res = await authApi(idToken).post(`/user/${userId}`, {password: newPassword}, {params: {type: "authOnly"}});
      return res.data;
    } catch (err) {
      logger.error("Failed to change password", err);
      throw err;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => changePassword(data),
    onMutate: ()=>reset()
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(mutateAsync)}
        className="flex flex-col gap-3"
      >
        <label className={formLabel} htmlFor="newPassword">
          <p className={labelText}>New Password</p>
          <div>
            <input
              className={formInput}
              type={"text"}
              id="newPassword"
              {...register("newPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters long",
                },
              })}
            />
          </div>
          {errors?.newPassword && (
            <p className={errorMessage}>{errors.newPassword.message}</p>
          )}
        </label>
        <label className={formLabel} htmlFor="confirmNewPassword">
          <p className={labelText}>
            Confirm New Password
          </p>
          <div>
            <input
              className={formInput}
              type={"text"}
              id="confirmNewPassword"
              {...register("confirmNewPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters long",
                },
              })}
            />
          </div>
          {errors?.confirmNewPassword && (
            <p className={errorMessage}>{errors.confirmNewPassword.message}</p>
          )}
        </label>
          <Button buttonType="submit" className="w-full max-w-[540px]" rounded="md">{isPending? "Saving..." : "Change Password"}</Button>
      </form>
    </>
  );
};

export default ChangeAccountPasswordForm;
