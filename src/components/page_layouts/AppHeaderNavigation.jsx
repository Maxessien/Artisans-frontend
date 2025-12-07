import { useSelector } from "react-redux";
import "./scss/app_header_navigation.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";


const AppHeaderNavigation = ({ navToggle = ()=>null, signOutFn }) => {
  const { currentSize } = useSelector((state) => state.screenSize);
  const { isLoggedIn, userData } = useSelector((state) => state.userAuth);
  const pathname = usePathname()
  return (
    <>
{console.log(userData)}
      <div className="nav_container">
        <nav className="header_navigation">
          <Link
            href={"/"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            onClick={() => navToggle(false)}
            href={"/shop"}
            className={`header_navigation_links ${pathname === "/shop" ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            href={"/sell"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links ${pathname === "/sell" ? "active" : ""}`}
          >
            Become a seller
          </Link>
          <Link
            href={"/blog"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links ${pathname === "/blog" ? "active" : ""}`}
          >
            Blog
          </Link>
          <Link
            href={"/contact"}
            onClick={() => navToggle(false)}
            className={`header_navigation_links ${pathname === "/contact" ? "active" : ""}`}
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
