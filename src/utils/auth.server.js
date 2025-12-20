import { cookies } from "next/headers";
import { authApi } from "../axiosApiBoilerplates/authApi";
import logger from "./logger";

const getUserServerSide = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userSessionToken");
    const user = token
      ? await authApi(token.value).get("/auth/verify")
      : { data: null };
    logger.info("Verified user server-side", { token, user });
    return { user: user?.data, token: token.value };
  } catch (err) {
    logger.error("Failed to verify user server-side", err);
    return { user: null, token: null };
  }
};

const getServerAuthToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userSessionToken");
    return token?.value || null;
  } catch (err) {
    logger.error("Failed to get server auth token", err);
    return null;
  }
};

export { getServerAuthToken, getUserServerSide };

