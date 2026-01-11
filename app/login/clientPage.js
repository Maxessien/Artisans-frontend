"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { auth } from "../../firebase/fb_config";
import logger from "../../src/utils/logger";
import { findError } from "./../../public/fbAuthErrors";
import AuthFormField from "./../../src/components/form_components/AuthFormField";
import AuthFormLayout from "./../../src/components/form_components/AuthFormLayout";

const ClientLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const rememberMeRef = useRef(null);
  const loginFormSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      logger.info("User signed in", user);
      toast.success("Login Successful");
      router.replace("/explore");
    } catch (err) {
      logger.error("Login failed", err);
      const errorInfo = findError(err?.code);
      toast.error(errorInfo?.customMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="pt-15">
        <AuthFormLayout type={"login"}>
          <h2 className="text-lg w-full text-center text-[var(--main-secondary)] font-normal">
            Log in to continue shopping
          </h2>
          <AuthFormField
            submitFunction={loginFormSubmit}
            email
            password
            buttonText={isLoading ? "Signing In..." : "Sign In"}
            isSubmitting={isLoading}
          >
            <div className="flex justify-between gap-2">
              <label
                className="flex gap-1.5 items-center justify-start"
                htmlFor="rememberMe"
              >
                <div onClick={()=>setRememberMe(!rememberMe)} className="h-5 aspect-square rounded-md border-2 border-black">
                  {rememberMe && (
                    <>
                      <div className="h-full w-full bg-blue-900 text-[0.75rem] text-white font-bold flex items-center justify-center">
                        <FaCheck />
                      </div>
                    </>
                  )}
                </div>
                <input
                  className="hidden"
                  value={rememberMe}
                  ref={rememberMeRef}
                  id="rememberMe"
                  type="checkbox"
                />
                <span>Remember Me</span>
              </label>
              <Link
                href={"/reset-password"}
                className="text-base text-[var(--main-primary)] font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </AuthFormField>
        </AuthFormLayout>
      </main>
    </>
  );
};

export default ClientLogin;
