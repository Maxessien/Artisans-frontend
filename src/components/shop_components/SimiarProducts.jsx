"use client"
import ProductCards from "../home_components/ProductCards"


const SimilarProducts = ({products})=>{
    return (
        <>
        <h2 className="text-xl text-[var(--text-primary)] font-semibold">Similar Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-[minmax(200px,300px)] gap-2 justify-between">
            {products?.map(({images: {url}, name, price, productId})=>{
                return <ProductCards imageUrl={url} name={name} price={price} productId={productId} />
            })}
        </div>
        </>
    )
}

export default SimilarProducts