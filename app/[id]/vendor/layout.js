import { redirect } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import { getUserServerSide } from "../../../src/utils/auth.server"
import VendorNavigaton from "../../../src/components/page_layouts/VendorNavigaton"

export const metadata = {
    title: "Lasu Mart-Vendor"
}


const VendorAccountLayout = async({children})=>{
    const {user} = await getUserServerSide()


    return (
        <>
        {/* <Link href={`/${user.uid}/account/profile`} className="text-[var(--main-secondary)] flex items-center gap-2 text-base py-2 font-semibold"><FaArrowLeft /> Back to Account Profile</Link> */}
        <div className={"flex flex-col gap-3 w-screen md:grid md:grid-cols-[25%_75%]"}>
            <VendorNavigaton />
            <main className="py-3 px-5 min-w-0">
                {children}
            </main>
        </div>
        </>
    )
}

export default VendorAccountLayout