import { regApi } from "../axiosApiBoilerplates/regApi";
import logger from "./logger";

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

export { requestOtp };
