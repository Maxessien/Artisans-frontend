import Link from "next/link";
import Button from './../reusable_components/Buttons';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { logOut } from "../../utils/auth.client";

const NavListItem = ({
  title = "",
  icon = <></>,
  isActive = false,
  location = "",
}) => {
  const path = usePathname()
  return (
    <li className="w-full cursor-pointer">
      <Link
        href={location}
        className={`w-full p-2 rounded-md flex justify-center items-center text-base ${
          (isActive || path === location)
            ? "bg-(--main-primary) text-(--text-secondary)"
            : "text-(--text-primary-light)"
        } font-medium`}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </Link>
    </li>
  );
};

const VendorNavigaton = () => {
  const {userData} = useSelector((state)=>state.userAuth)
  const router =  useRouter()
  return (
    <aside className="w-full bg-(--text-secondary-light) shadow-[0px_0px_10px_-7px_black] p-3 space-y-3 h-screen overflow-y-auto rounded-md">
      <h2 className="text-lg text-(--text-primary) font-medium">Menu</h2>

      <ul className="flex flex-col justify-start items-center gap-2 w-full">
        <NavListItem title="Dashboard" location={`/${userData.userId}/vendor`} />
        <NavListItem title="Analytics" location={`/${userData.userId}/vendor/analytics`} />
        <NavListItem title="Orders" location={`/${userData.userId}/vendor/orders`} />
        <NavListItem title="Products" location={`/${userData.userId}/vendor/products`} />
        <NavListItem title="Reviews" location={`/${userData.userId}/vendor/reviews`} />
        <NavListItem title="Transactions" location={`/${userData.userId}/vendor/transactions`} />
      </ul>

      <section className="space-y-2 w-full">
        <h3 className="text-lg text-(--text-primary) font-medium">General</h3>
        <NavListItem title="Settings" location={`/${userData.userId}/vendor/settings`} />
        <Button buttonFn={async()=>{
          const {success} = logOut()
          if (success) router.replace("/explore")
        }} type="secondary" width="100%" rounded="6px">Log out</Button>
      </section>
    </aside>
  );
};

export default VendorNavigaton;
