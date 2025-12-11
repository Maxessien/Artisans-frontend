"use client";

import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/fb_config";
import { findError } from "./../../public/fbAuthErrors";
import AuthFormLayout from "./../../src/components/form_components/AuthFormLayout";
import AuthFormField from "./../../src/components/form_components/AuthFormField";
import { FaCheck } from "react-icons/fa";

const ClientLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const rememberMeRef = useRef(null);
  const loginFormSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      toast.success("Login Successful");
      router.replace("/");
    } catch (err) {
      console.log(err);
      const errorInfo = findError(err.code);
      toast.error(errorInfo.customMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <AuthFormLayout type={"login"}>
          <h2 className="text-lg text-[var(--main-secondary)] font-normal">
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
                className="flex gap-1.5 justify-start"
                htmlFor="rememberMe"
              >
                <div className="h-6 aspect-square rounded-md border-2 border-black">
                  {rememberMe && (
                    <>
                      <div className="h-full w-full bg-blue-900 text-[0.4rem] font-bold flex items-center justify-center">
                        <FaCheck />
                      </div>
                    </>
                  )}
                </div>
                <input
                  className="hidden"
                  value={rememberMe}
                  ref={rememberMeRef}
                  onChange={({ target: { value } }) => setRememberMe(value)}
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
