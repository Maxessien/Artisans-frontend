"use client"

import { Cards, OrdersCompactCards,StatsCard } from "../../reusable_components/CardsLayouts"
import { FaArrowRight, FaShoppingBag } from "react-icons/fa"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import MobilePageHeader from './../../page_layouts/MobilePageHeader';

const VendorDashboard = ({totalProducts=0, recentOrders=[]})=>{
    const {userData} = useSelector((state)=>state.userAuth)
    const router = useRouter()
    return (
        <>
        <MobilePageHeader pageTitle={"Dashboard"} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            <StatsCard cardTitle={"Total Products"} statsValue={totalProducts} statsIcon={<FaShoppingBag />} />
        </div>

        <Cards extraStyles={{padding: "15px 20px"}}>
            <div className="flex justify-between mb-2">
                <h3 className="text-lg text-[var(--text-primary)] font-medium">Recent Orders</h3>
                <Link className="flex gap-2 items-center text-[var(--main-primary)] font-medium text-base" href={`/${userData.userId}/vendor/orders`}>View All <FaArrowRight /></Link>
            </div>

            <div className="flex flex-col gap-2">
                {recentOrders && recentOrders.length > 0 ? (recentOrders.map(({product_name, delivery_status, price, order_id})=>{
                    return (
                        <div key={order_id} onClick={()=>router.push(`/${userData.userId}/vendor/orders/${order_id}`)}>
                            <OrdersCompactCards productTitle={product_name} deliveryStatus={delivery_status} price={price} />
                        </div>
                    )
                })): (
                    <p className="text-lg font-semibold text-[var(--text-primary)] mt-5 text-center">You have not received any orders</p>
                )}
            </div>
        </Cards>
        </>
    )
}

export default  VendorDashboard