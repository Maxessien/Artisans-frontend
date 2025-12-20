"use client"

import { usePathname } from "next/navigation";
import {
  CartIcon,
  HeartIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from "../svg_components/NavigationSvg";

const BottomNavigation = () => {
  const pathname = usePathname();
  const navIconsStyles = (path) =>
    `p-3 rounded-full text-lg ${
      pathname === path
        ? "bg-[var(--main-primary)] text-[var(--text-secondary-light)]"
        : "text-[var(--text-primary)]"
    }`;

  return (
    <>
      <nav className="w-full px-4 py-3 fixed left-0 bottom-6 bg-[var(--text-secondary-light)] rounded-full">
        <ul className="flex justify-evenly items-center gap-3">
          <li className={navIconsStyles("/explore")}>
            <HomeIcon />
          </li>
          <li className={navIconsStyles("/cart")}>
            <CartIcon />
          </li>
          <li className={navIconsStyles("/shop")}>
            <PlusIcon />
          </li>
          <li className={navIconsStyles("/wishlist")}>
            <HeartIcon />
          </li>
          <li className={navIconsStyles("/profile")}>
            <UserIcon />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavigation;
