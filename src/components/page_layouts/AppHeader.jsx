"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/fb_config";
import logger from "../../utils/logger";
import AppHeaderMain from "./AppHeaderMain";
import AppHeaderNavigation from "./AppHeaderNavigation";

const AppHeader = () => {
  const router = useRouter();
  const { currentSize } = useSelector((state) => state.screenSize);
  const [showNavigation, setShowNavigation] = useState(false);
  useEffect(() => {
    setShowNavigation(false);
  }, [currentSize]);
  const navigationToggle = () => {
    setShowNavigation(!showNavigation);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (err) {
      logger.error("Failed to log out", err);
      toast.error("There was an error logging out, please try again later");
    }
  };

  return (
    <>
    <header className="w-screen space-y-2 py-5 md:py-10 px-5 sm:px-10 md:px-13">
        {/* <div
          className={`flex ${
            currentSize <= 480
              ? "flex-col items-start justify-center"
              : "flex-row items-center justify-start"
          } gap-2`}
        >
          <p>
            <span className="text-[var(--text-primary)] font-bold text-2xl">
              Lasu
            </span>
            <span className="text-[var(--main-primary)] font-bold text-2xl">
              Mart
            </span>
          </p>
          {currentSize <= 480 && <Search />}
        </div> */}
        <div className="flex justify-between h-full align-center">
          {currentSize <= 768 ? (
            showNavigation && (
              <AppHeaderNavigation
                signOutFn={logOut}
                navToggle={navigationToggle}
              />
            )
          ) : (
            <AppHeaderNavigation />
          )}
          <AppHeaderMain
            signOutFn={logOut}
            navToggle={navigationToggle}
            navState={showNavigation}
          />
        </div>
      </header>
    </>
  );
};

export default AppHeader;
