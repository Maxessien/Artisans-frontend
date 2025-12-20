import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/fb_config.js";
import logger from "../../utils/logger";
import { FacebookIcon, GoogleIcon } from "../svg_components/FormSvg.jsx";
import "./scss/auth_form_layout.scss";

const AuthFormLayout = ({ children, type }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  const googlePopup = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider);
      logger.info("Google sign-in result", res)
    } catch (error) {
      logger.error("Google sign-in failed", error);
      toast.error("Failed to sign in")
    }
  };
  const facebookSignIn = async()=>{
    try {
      const provider = new FacebookAuthProvider()
      const res = await signInWithPopup(auth, provider)
      logger.info("Facebook sign-in result", res)
    } catch (error) {
      logger.error("Facebook sign-in failed", error)
      toast.error("Failed to sign in")
    }
  }
  return (
    <>
      <section className="form_page_section">
        <h1>{type == "login" ? "Welcome Back" : "Create Account"}</h1>
        {children}

        <p className="line_seperator"><div></div><span>Or continue with</span><div></div></p>

        <div className="socials">
          <button onClick={() => googlePopup()}>
            <GoogleIcon />
          </button>
          <button onClick={() => facebookSignIn()}>
            <FacebookIcon />
          </button>
        </div>

        <p className="text-lg text-center text-[var(--text-primary-light)] font-normal">
          {type == "login" ? (
            <>
              Don't have an account
              <Link
                href={"/register"}
                className="text-[var(--main-primary)] hover:text-[var(--main-primary-light)] cursor-pointer"
              >
                {" "}
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account
              <Link
                href={"/login"}
                className="text-[var(--main-primary)] hover:text-[var(--main-primary-light)] cursor-pointer"
              >
                {" "}
                Sign in
              </Link>
            </>
          )}
        </p>
      </section>
    </>
  );
};

export default AuthFormLayout;
