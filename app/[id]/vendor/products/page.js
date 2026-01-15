import { authApi } from "../../../../src/axiosApiBoilerplates/authApi"
import VendorProducts from "../../../../src/components/vendor_components/products/VendorProducts"
import { getServerAuthToken } from "../../../../src/utils/auth.server"
import { noNullFn } from "../../../../src/utils/fetchingHelpers"


const VendorProductPage = async()=>{
    const token = await getServerAuthToken()
    const products = await noNullFn(async ()=> await authApi(token).get("/product/vendor"))

    return (
        <VendorProducts products={products?.data} />
    )
}

export default VendorProductPage