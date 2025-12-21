"use client"

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authApi } from "../../../axiosApiBoilerplates/authApi";
import logger from "../../../utils/logger";
import Button from "../../reusable_components/Buttons";
import {
  PageHeader,
  VendorProductCard,
} from "../../reusable_components/CardsLayouts";

const VendorProducts = ({ products }) => {
  const {
    userData: { userId },
	idToken
  } = useSelector((state) => state.userAuth);
  const router = useRouter();
	
	const delFn = async(id)=>{
		try{
			await authApi(idToken).delete(`/product/${id}`, {params: {productId: id}})
			toast.success("Product deleted")
			router.replace(`/${userId}/vendor/products`)
		}catch(err){
      logger.error("Failed to delete vendor product", err)
			toast.error("Unable to delete product")
		}
	}
  return (
    <>
      <PageHeader headerText={"Products"} />
      <Button
        buttonFn={() => router.push(`/${userId}/vendor/products/new`)}
        extraStyles={{ display: "block", marginBottom: "12px" }}
        type="secondary"
      >
        Add New Products
      </Button>
      {products && products.length > 0 ? (
        <div className="grid sm:grid-cols-[minmax(250px,300px)] max-w-[1440px]">
          {products.map(({ name, price, productId, images }) => {
            return (
              <VendorProductCard
		userId={userId}
                productName={name}
                price={price}
                productId={productId}
                imageUrl={images[0].url}
		deleteFn={delFn}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-[var(--main-secondary)] text-lg font-semibold">
          You haven't added any product
        </p>
      )}
    </>
  );
};

export default VendorProducts;
