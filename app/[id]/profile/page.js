import BottomNavigation from "../../../src/components/page_layouts/BottomNavigation";
import ProfileCardsItems from "../../../src/components/profile_components/ProfileCardsItems";
import { Cards } from "../../../src/components/reusable_components/CardsLayouts";
import { getUserServerSide } from "../../../src/utils/auth.server";
import Button from './../../../src/components/reusable_components/Buttons';

const LineSeperator = ()=>{
  return (
    <span className="w-full h-1 bg-(--main-secondary-light)"></span>
  )
}

const ProfilePage = async() => {
  const {user} = await getUserServerSide()
  return (
    <>
    <main className="space-y-3 px-3 py-5">
      <h1 className="w-full text-center text-2xl text-(--text-primary) font-normal">My Profile</h1>
      <div className="relative w-25 h-25 rounded-full">
        <img className="object-cover" src={user.picture_url} alt={`${user.display_name} profile picture`} />
        <div className="absolute bottom-[-15px] right-[-15px]">
          <Button extraStyles={{padding: "1rem"}}>Camera Icon</Button>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="w-full text-center text-xl text-(--text-primary) font-normal">
          {user.display_name}
        </h2>
        <p className="w-full text-center text-lg text-(--text-primary-light) font-normal">{user.email}</p>
      </section>

      <Cards>
        <ProfileCardsItems title="Edit Profile" href="edit" />
        <LineSeperator />
        <ProfileCardsItems title="My Orders" href="edit" />
      </Cards>

      <Cards>
        <ProfileCardsItems title="My Posts" href="edit" />
        <LineSeperator />
        <ProfileCardsItems title="Followers" href="edit" />
        <LineSeperator />
        <ProfileCardsItems title="Ratings and Reviews" href="edit" />
      </Cards>

      <Cards>
        <ProfileCardsItems title="Account Settings" href="edit" />
        <LineSeperator />
        <ProfileCardsItems title="Help and Support" href="edit" />
      </Cards>
      <Button width="100%" rounded="6px">Log Out</Button>
      <BottomNavigation />
    </main>
    </>
  );
};

export default ProfilePage;
