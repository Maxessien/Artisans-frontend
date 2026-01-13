"use client"

import { Cards, OrdersCompactCards, PageHeader, StatsCard } from "../../reusable_components/CardsLayouts"
import { FaArrowRight, FaCheckCircle, FaClock, FaShoppingBag, FaShoppingCart } from "react-icons/fa"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const VendorDashboard = ({totalOrders=0, totalProducts=0, pendingOrders=0, completedOrders=0, recentOrders=[]})=>{
    const {userData} = useSelector((state)=>state.userAuth)
    const router = useRouter()
    return (
        <>
        <PageHeader headerText={"Dashboard"} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            <StatsCard cardTitle={"Total Products"} statsValue={totalProducts} statsIcon={<FaShoppingBag />} />
        </div>

        <Cards>
            <div className="flex justify-between mb-2">
                <h3 className="text-lg text-[var(--text-primary)] font-semibold">Recent Orders</h3>
                <Link className="flex gap-2 items-center text-[va(--text-primary)] font-semibold text-base" href={`/${userData.userId}/vendor/orders`}>View All <FaArrowRight /></Link>
            </div>

            <div className="flex flex-col gap-2">
                {recentOrders && recentOrders.length > 0 ? (recentOrders.map(({name, deliveryStatus, price, orderId})=>{
                    return (
                        <div onClick={()=>router.push(`/${userData.userId}/vendor/orders/${orderId}`)}>
                            <OrdersCompactCards productTitle={name} deliveryStatus={deliveryStatus} price={price} />
                        </div>
                    )
                })): (
                    <p className="text-lg font-semibold text-[var(--text-primary)] text-center">You have not received any orders</p>
                )}
            </div>
        </Cards>
        </>
    )
}

export default  VendorDashboard