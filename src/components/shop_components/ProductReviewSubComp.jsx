import { FaStar } from "react-icons/fa";

export const RatingsStarsList = ({ data, stars }) => {
  return (
    <li className="flex gap-2 items-center w-full">
      <span className="w-max text-base text-[var(--main-tertiary)] font-medium">
        {stars} <FaStar color="rgb(255, 221, 0)" />
      </span>
      <span className="h-1 bg-[var(--main-tertiary)] inline-flex justify-start rounded-full w-full">
        <span
          style={{
            width: `${
              (data.filter((review) => review.rating === 5).length /
                data.length) *
              100
            }%`,
          }}
          className="h-full rounded-full"
        ></span>
      </span>
      <span className="text-lg text-[var(--text-primary)] font-medium">
        {(data.filter((review) => review.rating === 5).length / data.length) *
          100}
        %
      </span>
    </li>
  );
};

export const CommentCard = ({
  profileImageUrl,
  userName,
  comment,
  dateAdded,
  ratings,
}) => {
  return (
    <>
      <div className="border-t-[var(--main-tertiary)] border-t-2 py-3 flex gap-2 items-start justify-start w-full">
        <div className="h-4 w-4 rounded-full">
          <img
            className="object-cover w-full"
            src={profileImageUrl}
            alt={`${userName} profile image`}
          />
        </div>
        <div className="space-y-2 text-left">
          <p className="flex items-center justify-start text-lg text-[var(--text-primary)] font-medium">
            <span>{userName}</span> <span className="text-base text-[var(--main-tertiary)] font-normal">{dateAdded}</span>
          </p>
          <p className="text-base text-[var(--main-tertiary)] font-medium">{comment}</p>
          <p className="text-base text-[var(--main-tertiary)] font-normal">
            <span>
              {Array(5)
                .fill("stars")
                .map((_, index) => (
                  <FaStar
                    size={24}
                    color={`${
                      index <= ratings
                        ? "rgb(255, 221, 0)"
                        : "var(--main-tertiary)"
                    }`}
                  />
                ))}
            </span>{" "}
            <span>{ratings}</span>
          </p>
        </div>
      </div>
    </>
  );
};
