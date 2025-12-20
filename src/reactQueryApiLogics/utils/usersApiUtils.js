import { authApi } from "../../axiosApiBoilerplates/authApi";
import logger from "../../utils/logger";

const updateUser = async (updatedData) => {
  try {
    const res = await authApi.post("/user/update", updatedData);
    logger.info("Updated user", res);
    return res.data;
  } catch (err) {
    logger.error("Failed to update user", err);
    return err;
  }
};


export { updateUser };
