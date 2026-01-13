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
import { useRouter } from "next/navigation.js";
import { regApi } from "../../axiosApiBoilerplates/regApi.js";

const AuthFormLayout = ({ children, type }) => {
  const router = useRouter()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  const googlePopup = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider);
      await regApi.post("/auth/register", res.user);
      logger.info("Google sign-in result", res)
      toast.success("Sign In successful")
      router.replace("/explore")
    } catch (error) {
      logger.error("Google sign-in failed", error);
      toast.error("Failed to sign in")
    }
  };
  const facebookSignIn = async()=>{
    try {
      const provider = new FacebookAuthProvider()
      const res = await signInWithPopup(auth, provider)
      await regApi.post("/auth/register", res.user);
      logger.info("Google sign-in result", res)
      toast.success("Sign In successful")
      router.replace("/explore")
    } catch (error) {
      logger.error("Facebook sign-in failed", error)
      toast.error("Failed to sign in")
    }
  }


  //Remove social sign in from UI for now until logic is ready
  const showSocialSignIn = false
  return (
    <>
      <section className="form_page_section">
        <h1>{type == "login" ? "Welcome Back" : "Create Account"}</h1>
        {children}

        <p className="line_seperator"><div></div><span>Or continue with</span><div></div></p>

        {showSocialSignIn && <div className="socials">
          <button type="button" onClick={() => googlePopup()}>
            <GoogleIcon />
          </button>
          <button type="button" onClick={() => facebookSignIn()}>
            <FacebookIcon />
          </button>
        </div>}

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
