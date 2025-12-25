

const NotificationCard = ({icon_url="", title="", message="", time_notified=""}) => {
  return (
    <>
    <section className="w-full p-2 py-3 bg-(--text-secondary-light) rounded-md">
        <header className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
                <span className="p-1 bg-(--main-primary) text-(--text-secondary-light) rounded-full">
                    <img className="w-2" src={icon_url} alt={`${title}-icon`} />
                </span>
                <h3 className="text-base text-(--text-primary) font-normal">{title}</h3>
            </div>
            <span className="text-sm text-(--main-secondary) font-normal">{time_notified}</span>
        </header>
        <p className="w-full text-(--main-secondary) text-left text-base font-normal">{message}</p>
    </section>
    </>
  )
}

export default NotificationCard