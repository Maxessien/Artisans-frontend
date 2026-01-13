"use client";

import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth } from "../firebase/fb_config";
import { authApi } from "../src/axiosApiBoilerplates/authApi";
import { regApi } from "../src/axiosApiBoilerplates/regApi";
import { setUserAuth } from "../src/store_slices/userAuthSlice";
import { setScreenSize } from "../src/store_slices/windowSizesSlice";
import logger from "../src/utils/logger";
import Loader from "./../src/components/reusable_components/Loader";

export default function AppClientWrapper({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchLoggedInUser = async (userId, token) => {
    try {
      const user = await authApi(token).get(`/user/${userId}`);
      console.log("User Data", user)
      const {
        user_id,
        email,
        display_name,
        phone_number,
        picture_url,
        preferred_payment_method,
        total_cart_items,
      } = user.data;
      dispatch(
        setUserAuth({
          stateProp: "userData",
          value: {
            userId: user_id,
            email,
            displayName: display_name,
            phoneNumber: phone_number,
            pictureUrl: picture_url,
            paymentMethod: preferred_payment_method,
            cartCount: total_cart_items,
          },
        })
      );
      return user.data;
    } catch (err) {
      logger.error("Failed to fetch logged in user", err);
      await signOut(auth);
      throw err;
    }
  };

  const { isFetching, data } = useQuery({
    queryKey: ["loggedInUserData", userInfo.userId],
    queryFn: () => fetchLoggedInUser(userInfo.userId, userInfo.token),
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    logger.info("Logged in user data", data);
    dispatch(setScreenSize());
    const handleResize = () => dispatch(setScreenSize());
    window.addEventListener("resize", handleResize);
    const unsubscribeAuthStateListener = onAuthStateChanged(
      auth,
      async (user) => {
        logger.log("Auth state change detected");
        if (user) {
          logger.info("User authenticated", user);
          const idToken = await user.getIdToken();
          const { claims } = await user.getIdTokenResult();
          if (!claims?.isVerified?.email && !user?.emailVerified)	
            router.push(`/verify?type=email&value=${user.email}`);
          setUserInfo({ userId: user.uid, token: idToken });
          dispatch(setUserAuth({ stateProp: "isLoggedIn", value: true }));
          dispatch(setUserAuth({ stateProp: "idToken", value: idToken }));
        } else {
          await regApi.delete("/auth/logout", { withCredentials: true });
          dispatch(setUserAuth({ stateProp: "isLoggedIn", value: false }));
          dispatch(setUserAuth({ stateProp: "idToken", value: "" }));
          dispatch(setUserAuth({ stateProp: "userData", value: {} }));
        }
      }
    );

    const unsubscribeTokenListener = onIdTokenChanged(auth, async (user) => {
      logger.log("ID token change detected");
      if (user) {
        try {
          const token = await user.getIdToken();
          await regApi.post(
            "/auth/login",
            { idToken: token },
            { withCredentials: true }
          );
        } catch (err) {
          logger.error("Failed to refresh ID token", err);
          await signOut(auth);
        }
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribeAuthStateListener();
      unsubscribeTokenListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isFetching ? (
        <>
          <Loader
            size={"w-screen h-screen"}
            position={"fixed top-0 bottom-0"}
          />
        </>
      ) : (
        <>
          {children}
          <ToastContainer
            position="top-center"
            pauseOnHover
            newestOnTop
            theme="colored"
          />
        </>
      )}
    </>
  );
}
