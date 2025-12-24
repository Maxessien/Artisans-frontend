"use client"

import { useRouter } from "next/router"


const MobilePageHeader = ({pageTitle=""}) => {
    const router = useRouter()

  return (
    <header className="space-y-1">
        <div className="w-full">
            <button onClick={()=>router.back()}><BackArrowIcon /></button>
        </div>
        <h1 className="w-full text-center text-2xl text-(--var(text-primary)) font-normal">{pageTitle}</h1>
    </header>
  )
}

export default MobilePageHeader