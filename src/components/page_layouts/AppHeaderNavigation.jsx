import { useSelector } from "react-redux";
import "./scss/app_header_navigation.scss";
import Link from "next/link";


const AppHeaderNavigation = ({ navToggle = ()=>null, signOutFn }) => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const { isLoggedIn, userData } = useSelector((state) => state.userAuth);
  return (
    <>
{console.log(userData)}
      <div className="nav_container">
        <nav className="header_navigation">
          <Link
            href={"/"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links`}
          >
            Home
          </Link>
          <Link
            onClick={() => navToggle(false)}
            href={"/shop"}
            className={`header_navigation_links`}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links`}
          >
            Become a seller
          </Link>
          <Link
            href={"/contact"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links`}
          >
            Blog
          </Link>
          <Link
            href={"/contact"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links`}
          >
            Contact
          </Link>
          
          {currentSize <= 768 && (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    href={`/${userData?.userId}/cart`}
                    onClick={() => navToggle(false)}
                    className={`header_navigation_links`}
                  >
                    Cart
                  </Link>
                  <Link
                    href={`/${userData?.userId}/account/profile`}
                    onClick={() => navToggle(false)}
                    className={`header_navigation_links`}
                  >
                    Profile
                  </Link>
                  <Link
                    href={"/account/settings"}
                    onClick={() => navToggle(false)}
                    className={`header_navigation_links`}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      navToggle(false);
                      signOutFn();
                    }}
                    className={`header_navigation_links`}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    onClick={() => navToggle(false)}
                    className={`header_navigation_links`}
                  >
                    Login
                  </Link>
                  <Link
                    href={"/register"}
                    onClick={() => navToggle(false)}
                    className={`header_navigation_links`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default AppHeaderNavigation;
