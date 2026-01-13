import { getUserServerSide } from '../../src/utils/auth.server';
import logger from "../../src/utils/logger";
import SignOutUser from './../../src/components/reusable_components/SignOutUser';



const UserLayout = async ({children}) => {
  try {
  const {user} = await getUserServerSide();
	if(!user?.uid) throw new Error("User not logged in")
    return children
  } catch (err) {
	logger.error("User layout auth check failed", err);
    return <SignOutUser />
  }
};

export default UserLayout;
