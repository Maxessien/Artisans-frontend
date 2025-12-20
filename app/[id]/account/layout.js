import AccountNavigation from "../../../src/components/page_layouts/AccountNavigation"
import { getUserServerSide } from "../../../src/utils/auth.server"

export const metadata = {
	title: "Lasu Mart-Account"
}

export const accountHeadersStyles = "font-bold text-3xl text-[var(--text-primary)] text-center mb-1"

const UserAccountPageLayout = async({children})=>{
    const {user} = await getUserServerSide()
    const isVerified = user?.isVerified.email && user?.isVerified.phone
    

  const generalNavigation = [
    {
      name: "Profile",
      path: `/${user.uid}/account/profile`,
    },
    {
      name: "Order History",
      path: `/${user.uid}/account/orders`,
    },
    {
      name: "Settings",
      path: `/${user.uid}/account/settings`,
    },
  ];

  const protectedNavs = [
    {
      name: "Vendor Account",
      path: `/${user.uid}/vendor`,
    }
  ]

  const navigationDetails = !isVerified ? [
    ...generalNavigation, 
    {
      name:  "Sell Products",
      path: `/${user.uid}/account/verify`,
    }
  ] : [...generalNavigation, ...protectedNavs]
    return (
        <>
        <div className={"flex flex-col gap-3 w-screen md:grid md:grid-cols-[25%_75%]"}>
            <AccountNavigation navigationDetails={navigationDetails} />
            <main className="py-3 px-5 w-full">
             {children}
            </main>
        </div>
        </>
    )
}

export default UserAccountPageLayout