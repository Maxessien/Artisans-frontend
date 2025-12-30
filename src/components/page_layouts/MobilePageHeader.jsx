"use client"

import { useRouter } from "next/navigation"
import {BackArrowIcon} from "../svg_components/NavigationSvg"


const MobilePageHeader = ({pageTitle=""}) => {
    const router = useRouter()

  return (
    <header className="space-y-1 py-5 px-3">
        <div className="w-full">
            <button onClick={()=>router.back()}><BackArrowIcon /></button>
        </div>
        <h1 className="w-full text-center text-2xl text-(--var(text-primary)) font-normal">{pageTitle}</h1>
    </header>
  )
}

export default MobilePageHeader