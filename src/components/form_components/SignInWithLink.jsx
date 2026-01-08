"use client"

import { signInWithEmailLink } from "firebase/auth";
import { notFound, useRouter } from "next/navigation";
import { auth } from "../../../../backend/configs/fbConfigs";
import logger from "../../../../backend/utils/logger";
import { useEffect } from "react";

const SignInWithLink = ({ email }) => {
  const router = useRouter();

  const redirect = async () => {
    try {
      const user = await signInWithEmailLink(auth, email, window.location.href);
      router.push(`/${user?.uid}/profile`);
    } catch (err) {
      logger.error("Invalid link", err);
      return notFound();
    }
  };

  useEffect(redirect, []);

  return <></>;
};

export default SignInWithLink;
