// import { Circles } from "react-loader-spinner";

import Link from "next/link";

const variantStyles = {
  primary:
    "bg-[var(--main-primary)] text-[var(--text-secondary-light)] hover:bg-[var(--main-primary-light)]",
  secondary:
    "text-[var(--main-primary)] shadow-[0px_0.4px_10px_-7.6px_black] bg-[var(--main-primary-lighter)] hover:bg-[var(--text-secondary-light)]",
  tertiary:
    "bg-transparent text-[var(--text-primary-light)] border-[2px] border-[var(--text-primary)] hover:bg-orange-200 border-md border-[var(--text-primary-light)]",
};

const sizeStyles = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const baseStyles = "inline-flex items-center justify-center font-normal disabled:opacity-[0.7]";

const ButtonLink = ({
  children,
  size = "medium",
  type = "primary",
  rounded = "full",
  isDisabled = false,
  width = "[max-content]",
  className = "",
  href="#"
}) => {
  const allStyles = `rounded-${rounded} ${baseStyles} ${sizeStyles[size]} ${
    variantStyles[type]
  } w-${width} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <>
      <Link disabled={isDisabled} href={href} className={allStyles}>
        {children}{" "}
      </Link>
    </>
  );
};

export default ButtonLink;
