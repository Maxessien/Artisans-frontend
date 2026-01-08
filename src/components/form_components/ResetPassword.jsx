"use client"

import { toast } from "react-toastify";
import logger from "../../src/utils/logger";
import AuthFormField from "./../../src/components/form_components/AuthFormField";
import { useMutation } from "@tanstack/react-query";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../backend/configs/fbConfigs";
import ButtonLink from "../../src/components/reusable_components/ButtonLink";

const ForgotPassword = () => {
  const resetPassword = async ({ email }) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin-link?email=${email}`,
      });
      return { success: true };
    } catch (err) {
      logger.log("Reset password err", err);
      toast.error("Unable to reset password right now, try again later");
      throw err;
    }
  };

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: resetPassword,
  });

  if (isSuccess) {
    return (
      <>
        <h1 className="text-2xl text-(--text-primary) text-center font-normal">Email verification link sent</h1>
        <p className="text-base text-(--text-primary) text-center font-normal">Check inbox for password reset link</p>
        <ButtonLink rounded="6px" width="100%" href="/reset-password">
          Change Email
        </ButtonLink>
      </>
    );
  }

  return (
    <>
      <div className="form_page_section">
        <h1>Forgot Password</h1>
        <AuthFormField
          submitFunction={mutateAsync}
          isSubmitting={isPending}
          email
          buttonText="Reset"
        />
      </div>
    </>
  );
};

export default ForgotPassword;
