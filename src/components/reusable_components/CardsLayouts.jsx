"use client"

import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from './Buttons';

const Cards = ({children, extraStyles, ...rest})=>{
    return (
        <div {...rest} style={extraStyles} className={`w-full shadow-[0px_0px_10px_-6px_black] rounded-md bg-[var(--text-secondary-light)]`}>
            {children}
        </div>
    )
}

const StatsCard = ({cardTitle, statsValue, statsIcon})=>{
    return (
        <>
        <Cards extraStyles={{padding: "15px 20px"}}>
            <div className="flex justify-between gap-2">
            <div className="flex flex-col justify-center items-start gap-3">
                <h2 className="text-base text-[var(--text-primary)] font-medium">{cardTitle}</h2>
                <p className="text-xl font-bold text-[var(--text-primary)]">{statsValue}</p>
            </div>
            <div className="text-lg text-[var(--text-primary)] bg-[var(--main-tertiary-light)] h-[max-content] rounded-full p-3">{statsIcon}</div>
            </div>
        </Cards>
        </>
    )
}

const PageHeader = ({headerText, subHeader, className=""})=>{
    return (
        <>
            <header className="mb-3">
                <h1 className={`font-bold text-[var(--text-primary)] text-2xl w-full text-left ${className}`}>{headerText}</h1>
                {subHeader && <p className="font-semibold text-[var(--main-secondary)] text-base text-left">{subHeader}</p>}
            </header>
        </>
    )
}

const OrdersCompactCards = ({productTitle, deliveryStatus, price})=>{
    const statusBgStyles = {
        pending: "bg-orange-500",
        delivered: "bg-green-600",
        cancelled: "bg-red-600",
    }

    return (
        <Cards>
            <div className="flex gap-2 items-center justify-between">
                <div className={`flex items-center gap-2`}>
                    <span className="text-base text-var font-semibold">{productTitle}</span>
                    <span className={`${statusBgStyles[deliveryStatus]} rounded-md px-2 py-1 text-center font-semibold text-white text-sm`}>{deliveryStatus}</span>
                </div>
                <span className="text-[var(--text-primary)] text-lg font-bold">{price}</span>
            </div>
        </Cards>
    )
}

const VendorProductCard = ({imageUrl, productName, price, productId, deleteFn, userId})=>{
    const router = useRouter()
    
    return (
        <div className="flex flex-col w-full min-w-[150px] border-1 border-solid border-[var(--main-secondary)] rounded-md bg-[var(--text-secondary-light)]">
            <div className="w-full aspect-square">
                <img src={imageUrl} alt={`${productName} image`} className="object-cover" />
            </div>
            <div className="space-y-2 px-3 py-4">
                <p className="text-lg text-left text-[var(--text-primary)] font-semibold">{productName}</p>
                <p className="text-lg text-left text-[var(--text-primary)] font-bold"><span>&#8358; {price}</span></p>
                <p className="grid grid-cols-[80%_20%] gap-2">
                    <Button type="secondary" width="100%" rounded="6px" buttonFn={()=>router.push(`/${userId}/vendor/products/${productId}`)}><FaEdit /> Edit</Button>
                    <Button rounded="6px" buttonFn={()=>deleteFn(productId)}><FaTrash /></Button>
                </p>
            </div>
        </div>
    )
}

export { Cards, OrdersCompactCards, PageHeader, StatsCard, VendorProductCard };
