import { redirect } from "next/navigation"
import AccountNavigation from "../../../src/components/page_layouts/AccountNavigation"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import { getUserServerSide } from "../../../src/utils/auth.server"

export const metadata = {
    title: "Lasu Mart-Vendor"
}


const VendorAccountLayout = async({children})=>{
    const {user} = await getUserServerSide()
    if (!user.isVerified.email || !user.isVerified.phone) redirect(`/${user.uid}/account/verify`)

    const navigationDetails = [
        {
            name: "Dashboard",
            path: `/${user.uid}/vendor`
        },
        {
            name: "Products",
            path: `/${user.uid}/vendor/products`
        },
        {
            name: "Orders",
            path: `/${user.uid}/vendor/orders`
        },
    ]


    return (
        <>
        <Link href={`/${user.uid}/account/profile`} className="text-[var(--main-secondary)] flex items-center gap-2 text-base py-2 font-semibold"><FaArrowLeft /> Back to Account Profile</Link>
        <div className={"flex flex-col gap-3 w-screen md:grid md:grid-cols-[25%_75%]"}>
            <AccountNavigation navigationDetails={navigationDetails} />
            <main className="py-3 px-5 w-full">
                {children}
            </main>
        </div>
        </>
    )
}

export default VendorAccountLayout