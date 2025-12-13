"use client";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setScreenSize } from "../src/store_slices/windowSizesSlice";
import { onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/fb_config";
import { setUserAuth } from "../src/store_slices/userAuthSlice";
import Loader from "./../src/components/reusable_components/Loader";
import { regApi } from "../src/axiosApiBoilerplates/regApi";
import { authApi } from "../src/axiosApiBoilerplates/authApi";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AppClientWrapper({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const router = useRouter()

  const fetchLoggedInUser = async (userId, token) => {
    try {
      const user = await authApi(token).get(`/user/${userId}`);
      dispatch(setUserAuth({ stateProp: "userData", value: user.data }));
      return user.data;
    } catch (err) {
      console.log(err);
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
    console.log(data, "datattttt");
    dispatch(setScreenSize());
    const handleResize = () => dispatch(setScreenSize());
    window.addEventListener("resize", handleResize);
    const unsubscribeAuthStateListener = onAuthStateChanged(
      auth,
      async (user) => {
        console.log("running auth");
        if (user) {
          console.log(user);
          const idToken = await user.getIdToken();
          const {claims} = await user.getIdTokenResult()
          if (!claims?.isVerified?.email) router.push(`/verify?type=email&value=${user.email}`)
          setUserInfo({ userId: user.uid, token: idToken });
          dispatch(setUserAuth({ stateProp: "isLoggedIn", value: true }));
          dispatch(setUserAuth({ stateProp: "idToken", value: idToken }));
        } else {
            await regApi.delete("/auth/logout", {withCredentials: true})
          dispatch(setUserAuth({ stateProp: "isLoggedIn", value: false }));
          dispatch(setUserAuth({ stateProp: "idToken", value: "" }));
          dispatch(setUserAuth({ stateProp: "userData", value: {} }));
        }
      }
    );
    
    const unsubscribeTokenListener = onIdTokenChanged(auth, async (user) => {
      console.log("running idtoken");
      if (user) {
        try {
          const token = await user.getIdToken();
          await regApi.post(
            "/auth/login",
            { idToken: token },
            { withCredentials: true }
          );
        } catch (err) {
          console.log(err);
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
        <ToastContainer position="top-center" pauseOnHover newestOnTop theme="colored" />
        </>
      )}
    </>
  );
}
