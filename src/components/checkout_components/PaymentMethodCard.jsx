

const PaymentMethodCard = ({icon=<></>, title="", isSelected=false, ...otherProps}) => {
  return (
    <>
      <button className='w-full rounded-md bg-(--text-secondary-light) px-2 py-3 flex gap-2 justify-between items-center' htmlFor={inputProps?.id ?? "payment_card"} {...otherProps}>
        <div className='p-3 text-lg bg-(--var(--main-tertiary)) rounded-md'>
          {icon}
        </div>
        <p className='text-base text-(--var(text-primary-light)) w-full text-center font-normal'>{title}</p>
        <div className='w-3 h-4 bg-(--var(--main-tertiary)) p-1 rounded-full'>
          {isSelected && <div className='w-full h-full bg-(--var(--text-primary-light)) rounded-full'></div>}
        </div>
      </button>
    </>
  )
}

export default PaymentMethodCard