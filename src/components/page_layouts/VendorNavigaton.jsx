import Link from "next/link";
import Button from './../reusable_components/Buttons';

const NavListItem = ({
  title = "",
  icon = <></>,
  isActive = false,
  location = "",
}) => {
  return (
    <li className="w-full cursor-pointer">
      <Link
        href={location}
        className={`w-full p-2 rounded-md flex justify-center items-center text-base ${
          isActive
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
  return (
    <aside className="w-full bg-(--text-secondary-light) shadow-[0px_0px_10px_-7px_black] p-3 space-y-3 h-screen overflow-y-auto rounded-md">
      <h2 className="text-lg text-(--text-primary) font-medium">Menu</h2>

      <ul className="flex flex-col justify-start items-center gap-2 w-full">
        <NavListItem title="Dashboard" location="/dashboard" />
        <NavListItem title="Analytics" location="/analytics" />
        <NavListItem title="Orders" location="/orders" />
        <NavListItem title="Products" location="/products" />
        <NavListItem title="Reviews" location="/dashboard" />
        <NavListItem title="Transactions" location="/dashboard" />
      </ul>

      <section className="space-y-2 w-full">
        <h3 className="text-lg text-(--text-primary) font-medium">General</h3>
        <NavListItem title="Settings" location="/dashboard" />
        <Button type="secondary" width="100%" rounded="6px">Log out</Button>
      </section>
    </aside>
  );
};

export default VendorNavigaton;
