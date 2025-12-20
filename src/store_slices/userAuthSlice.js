import { createSlice } from "@reduxjs/toolkit";
import logger from "../utils/logger";

const userAuth = createSlice({
  name: "userAuth",
  initialState: { isLoggedIn: false, idToken: "", userData: {} },
  reducers: {
    setUserAuth: (state, action) => {
      logger.info("Dispatching setUserAuth", action);
      state[action.payload.stateProp] = action.payload.value;
    },
  },
});

export const { setUserAuth } = userAuth.actions;
export default userAuth.reducer;
