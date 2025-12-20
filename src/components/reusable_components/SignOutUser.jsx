"use client";

import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../../firebase/fb_config";
import { useRouter } from "next/navigation";

const SignOutUser = () => {
  const router = useRouter();
  useEffect(() => {
    const handleSignOut = async () => {
      await signOut(auth);
      router.replace("/login");
    };
    handleSignOut();
  }, [router]);

  return <></>;
};

export default SignOutUser;
