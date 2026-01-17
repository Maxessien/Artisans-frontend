import { redirect } from "next/navigation";
import BottomNavigation from "../../../src/components/page_layouts/BottomNavigation";
import ProfileCardsItems from "../../../src/components/profile_components/ProfileCardsItems";
import { Cards } from "../../../src/components/reusable_components/CardsLayouts";
import {
  FollowersIcon,
  HelpAndSupportIcon,
  LogoutIcon,
  OrderPackageIcon,
  SellerPostsIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "../../../src/components/svg_components/ProfileSvg";
import { logOut } from "../../../src/utils/auth.client";
import { getUserServerSide } from "../../../src/utils/auth.server";
import Button from "./../../../src/components/reusable_components/Buttons";

const LineSeperator = () => {
  return <span className="w-full h-1 bg-(--main-secondary-light)"></span>;
};

const ProfilePage = async () => {
  const { user } = await getUserServerSide();
  return (
    <>
      <main className="space-y-3 px-3 py-5">
        <h1 className="w-full text-center text-2xl text-(--text-primary) font-normal">
          My Profile
        </h1>
        <div className="relative w-25 h-25 mx-auto rounded-full">
          <img
            className="object-cover"
            src={user.picture_url}
            alt={`${user.display_name} profile picture`}
          />
          <div className="absolute bottom-[-15px] right-[-15px]">
            <Button extraStyles={{ padding: "1rem" }}>Cam</Button>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="w-full text-center text-xl text-(--text-primary) font-normal">
            {user.display_name}
          </h2>
          <p className="w-full text-center text-lg text-(--text-primary-light) font-normal">
            {user.email}
          </p>
        </section>

        <Cards>
          <ProfileCardsItems
            icon={<UserIcon />}
            title="Edit Profile"
            href={`/${user.uid}/profile/edit`}
          />
          <LineSeperator />
          <ProfileCardsItems
            icon={<OrderPackageIcon />}
            title="My Orders"
            href={`/${user.uid}/profile/orders`}
          />
        </Cards>

        <Cards>
          <ProfileCardsItems
            icon={<SellerPostsIcon />}
            title="My Posts"
            href={`/${user.uid}/profile/edit`}
          />
          <LineSeperator />
          <ProfileCardsItems
            icon={<FollowersIcon />}
            title="Followers"
            href={`/${user.uid}/profile/edit`}
          />
          <LineSeperator />
          <ProfileCardsItems
            icon={<StarIcon />}
            title="Ratings and Reviews"
            href={`/${user.uid}/profile/edit`}
          />
        </Cards>

        <Cards>
          <ProfileCardsItems
            icon={<SettingsIcon />}
            title="Account Settings"
            href={`/${user.uid}/profile/settings`}
          />
          <LineSeperator />
          <ProfileCardsItems
            icon={<HelpAndSupportIcon />}
            title="Help and Support"
            href={`/${user.uid}/profile/help`}
          />
        </Cards>
        <Button buttonFn={async()=>{
          const {success} = await logOut()
          if (success) redirect("/explore")
        }} width="100%" rounded="6px">
          <LogoutIcon className="mr-2" /> Log Out
        </Button>
        <BottomNavigation />
      </main>
    </>
  );
};

export default ProfilePage;
