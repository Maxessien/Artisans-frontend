import { getUserServerSide } from '../../src/utils/auth.server';
import SignOutUser from './../../src/components/reusable_components/SignOutUser';



const UserLayout = async ({children}) => {
  try {
  const {user} = await getUserServerSide();
	if(!user) throw new Error("User not logged in")
    return children
  } catch (err) {
    console.log(err);
    return <SignOutUser />
  }
};

export default UserLayout;
