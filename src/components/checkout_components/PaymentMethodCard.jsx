

const PaymentMethodCard = ({icon=<></>, title="", isSelected=false, inputProps={}, ...otherProps}) => {
  return (
    <>
      <label className='w-full flex gap-2 justify-between items-center' htmlFor={inputProps?.id ?? "payment_card"} {...otherProps}>
        <div className='p-3 text-lg bg-(--var(--main-tertiary)) rounded-md'>
          {icon}
        </div>
        <p className='text-base text-(--var(text-primary-light)) w-full text-center font-normal'>{title}</p>
        <div className='w-3 h-4 bg-(--var(--main-tertiary)) p-1 rounded-full'>
          {isSelected && <div className='w-full h-full bg-(--var(--text-primary-light)) rounded-full'></div>}
        </div>
        <input {...inputProps} id={inputProps?.id ?? "payment_card"} className='hidden' type="radio" />
      </label>
    </>
  )
}

export default PaymentMethodCard