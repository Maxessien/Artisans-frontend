// import { Circles } from "react-loader-spinner";

const variantStyles = {
  primary:
    "bg-[var(--main-primary)] text-[var(--text-secondary-light)] hover:bg-[var(--main-primary-light)]",
  secondary:
    "text-[var(--main-primary)] shadow-[0px_0.4px_10_-6px_black] bg-[var(--main-primary-lighter)] hover:bg-[var(--text-red-200)]",
  tertiary:
    "bg-transparent text-[var(--main-primary)] border-[2px] border-[var(--main-primary)]",
};

const sizeStyles = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const baseStyles = "inline-flex items-center justify-center font-semibold disabled:opacity-[0.7]";

const Button = ({
  children,
  buttonFn=undefined,
  size = "medium",
  type = "primary",
  rounded = "9999px",
  isLoading = false,
  isDisabled = false,
  width = "max-content",
  extraStyles = {},
  buttonType="button",
}) => {
  const allStyles = `${baseStyles} ${sizeStyles[size]} ${
    variantStyles[type]
  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${
    isLoading ? "cursor-not-allowed" : ""
  }`;

  return (
    <>
      <button style={{width: width, borderRadius: rounded, ...extraStyles}} type={buttonType} disabled={isDisabled} onClick={buttonFn} className={allStyles}>
        {children}{" "}
        {/* {isLoading && (
          <Circles
            visible={true}
            width={20}
            height={20}
            color={
              type === "secondary" ? "var(--orange-600)" : "var(--white-300)"
            }
            radius={2}
            wrapperClass="ml-2"
          />
        )} */}
      </button>
    </>
  );
};

export default Button;
