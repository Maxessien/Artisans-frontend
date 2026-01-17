import { toast } from "react-toastify";
import { auth } from "../../firebase/fb_config";
import { regApi } from "../axiosApiBoilerplates/regApi";
import logger from "./logger";
import { signOut } from 'firebase/auth';

const requestOtp = async (type, value) => {
  try {
    logger.info("OTP request initiated");
    await regApi.post("/auth/otp", { type: type, reciever: value });
    return { success: true };
  } catch (err) {
    logger.error("OTP request failed", err);
    throw err;
  }
};


const logOut = async()=>{
  try {
    await signOut(auth)
    toast.success("Sign out successful")
    return {success: true}
  } catch (err) {
    logger.error("Sign out err", err)
    toast.error("Unable to sign out")
    return {success: false}
  }
}

export { requestOtp, logOut };
