import { regApi } from "../axiosApiBoilerplates/regApi";

const requestOtp = async (type, value) => {
  try {
    console.log("otp sent")
    await regApi.post("/auth/otp", { type: type, value: value });
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {requestOtp}