import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaBars,
    FaShoppingCart,
    FaTimes,
    FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import logger from "../../utils/logger";
import Button from "../reusable_components/Buttons";

const AppHeaderMain = ({ navToggle, navState }) => {
  const [accountDropDowm, setAccountDropDown] = useState(false);
  const { currentSize } = useSelector((state) => state.screenSize);
  const { isLoggedIn, userData } = useSelector((state) => state.userAuth);

  const user = userData;
  const loggedIn = isLoggedIn;

  useEffect(() => {
    setAccountDropDown(false);
  }, [isLoggedIn]);

  return (
    <>
      {logger.info("AppHeaderMain current size", currentSize)}
      <div className="flex items-center justify-between px-3 sm:px-5 md:px-10">
        {currentSize >= 768 ? (
          <>
            {loggedIn ? (
              <div className="flex items-center justify-end gap-3 relative">
                <button
                  onClick={() => setAccountDropDown(!accountDropDowm)}
                  className="flex items-center p-3 hover:bg-[var(--main-primary-light)] rounded-full hover:text-[var(--main-tertiary)] justify-center gap-[2px] font-semibold text-[var(--text-primary-light)] text-xl"
                >
                  {/* <span>
                    <MdKeyboardArrowDown />
                  </span> */}
                  <span>
                    <FaUser />
                  </span>
                </button>


                <Link
                  href={`/${user?.userId}/cart`}
                  className="relative font-semibold p-2 rounded-full hover:bg-[var(--main-primary-light)] text-[var(--text-primary-light)] text-2xl"
                >
                  {user?.cart?.length > 0 && (
                    <span
                      className={`rounded-full absolute top-[-5px] left-[-5px] bg-[var(--main-primary)] font-semibold text-[var(--text-secondary-light)] text-[1rem] py-1 px-2`}
                    >
                      {user?.cart?.length}
                    </span>
                  )}
                  <FaShoppingCart />
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <Link href={"/register"}>
                  <Button>Sign Up</Button>
                </Link>
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            <div onClick={() => navToggle()} className="z-999 cursor-pointer">
              {navState ? (
                <FaTimes className="text-3xl fixed top-3 right-2 font-normal text-[var(--main-tertiary-light)]" />
              ) : (
                <FaBars className="text-2xl font-bold text-[var(--text-primary)]" />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AppHeaderMain;
