"use client"

import MobilePageHeader from "./../page_layouts/MobilePageHeader";
import { useRouter, useSearchParams } from "next/navigation";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";

const Notifications = ({ notifications = [] }) => {
  const { userData } = useSelector((state) => state.userAuth);
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <>
      <MobilePageHeader pageTitle="Notifications" />

      <div className="grid grid-cols-2 w-full shadow-[0px_0px_10px_-8px_black]">
        <button
          onClick={() =>
            router.push(`/${userData.user_id}/notifications?status=unread`)
          }
          className={`px-2 py-3 text-base text-(--text-primary) ${
            searchParams.get("status") === "unread"
              ? "bg-(--main-tertiary)"
              : "bg-(--text-secondary-light)"
          }`}
        >
          Unread
        </button>
        <button
          onClick={() =>
            router.push(`/${userData.user_id}/notifications?status=read`)
          }
          className={`px-2 py-3 text-base text-(--text-primary) ${
            searchParams.get("status") === "read"
              ? "bg-(--main-tertiary)"
              : "bg-(--text-secondary-light)"
          }`}
        >
          Read
        </button>
      </div>

      {notifications?.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((value) => {
            return <NotificationCard {...value} />;
          })}
        </div>
      ) : (
        <p className="text-center text-xl mt-4 text-(--text-primary-light) font-medium">
          No {searchParams.get("status") === "unread" ? "Unread" : "Read"}{" "}
          Notifications
        </p>
      )}
    </>
  );
};

export default Notifications;
