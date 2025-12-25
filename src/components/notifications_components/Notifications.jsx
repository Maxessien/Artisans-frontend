import MobilePageHeader from "./../page_layouts/MobilePageHeader";
import { useSearchParams } from "next/navigation";
import NotificationCard from "./NotificationCard";

const Notifications = ({ notifications = [] }) => {
  const searchParams = useSearchParams();
  return (
    <>
      <MobilePageHeader pageTitle="Notifications" />

      <div className="grid grid-cols-2 w-full">
        <button
          className={`px-2 py-3 text-base text-(--text-primary) ${
            searchParams.get("status") === "unread"
              ? "bg-(--main-secondary-light)"
              : "bg-(--text-secondary-light)"
          } rounded-[6px_0px_0px_6px]`}
        >
          Unread
        </button>
        <button
          className={`px-2 py-3 text-base text-(--text-primary) ${
            searchParams.get("status") === "read"
              ? "bg-(--main-secondary-light)"
              : "bg-(--text-secondary-light)"
          } rounded-[0px_6px_6px_0px]`}
        >
          Read
        </button>
      </div>

      <li className="space-y-3">
        {notifications.map((value) => {
          return <NotificationCard {...value} />;
        })}
      </li>
    </>
  );
};

export default Notifications;
