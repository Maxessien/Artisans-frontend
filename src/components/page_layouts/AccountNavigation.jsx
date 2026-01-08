"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import logger from "../../utils/logger";

const AccountNavigation = ({navigationDetails}) => {
  const pathName = usePathname();


  return (
    <>
      <nav className="h-full">
        <ul className="flex md:flex-col overflow-x-auto items-center justify-start h-full gap-3 w-full p-3 md:pt-6 bg-[var(--text-secondary-light)]">
          {navigationDetails?.map(({ name, path }) => {
            logger.info("Account navigation", { pathName, path });
            return (
              <li>
                <Link
                  href={path}
                  className={`text-lg font-semibold whitespace-nowrap ${
                    pathName === path ? "text-[var(--main-primary)] border-b-[2px] border-b-[var(--main-primary)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AccountNavigation;
