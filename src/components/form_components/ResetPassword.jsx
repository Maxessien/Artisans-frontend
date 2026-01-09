"use client"

import { toast } from "react-toastify";
import logger from "../../utils/logger";
import AuthFormField from "./AuthFormField";
import { useMutation } from "@tanstack/react-query";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../firebase/fb_config.js";
import ButtonLink from "../reusable_components/ButtonLink";

const ForgotPassword = () => {
  const resetPassword = async ({ email }) => {
	logger.log("Email info", email)
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin-link?email=${email}`,
	handleCodeInApp: true,
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
	<div className="space-y-3 px-6 pt-7">
        <h1 className="text-2xl text-(--text-primary) text-center font-normal">Email verification link sent</h1>
        <p className="text-base text-(--text-primary) text-center font-normal">Check inbox for password reset link</p>
        <ButtonLink rounded="md" width="full" href="/reset-password">
          Change Email
        </ButtonLink>
	</div>
      </>
    );
  }

  return (
    <>
      <div className="px-6 space-y-3 pt-10">
        <h1 className="text-2xl text-(--text-primary) text-center font-normal">Forgot Password</h1>
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
