const PaymentMethodCard = ({
  icon = <></>,
  title = "",
  isSelected = false,
  ...otherProps
}) => {
  return (
    <>
      <button
        className="w-full rounded-md bg-(--text-secondary-light) shadow-[0px_0px_10px_-7px_black] px-3 py-2 flex gap-2 justify-between items-center"
        {...otherProps}
      >
        <div className="flex gap-2 items-center justify-start">
          <div className="p-3 text-lg bg-(--main-tertiary) rounded-md">
            {icon}
          </div>
          <p className="text-base text-(text-primary-light) w-full text-center font-normal">
            {title}
          </p>
        </div>
        <div className="w-5 h-5 border-2 border-(--text-primary) rounded-full">
          {isSelected && (
            <div className="w-full h-full bg-(--main-primary) rounded-full"></div>
          )}
        </div>
      </button>
    </>
  );
};

export default PaymentMethodCard;
