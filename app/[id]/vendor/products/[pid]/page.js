import { authApi } from "../../../../../src/axiosApiBoilerplates/authApi"
import ProductForm from "../../../../../src/components/vendor_components/products/ProductForm"
import { getServerAuthToken } from "../../../../../src/utils/auth.server"
import logger from "../../../../../src/utils/logger"


const ProductEditPage = async({params})=>{
    const productParams = await params
    const token = getServerAuthToken()
    const {data} = productParams.pid !== "new" ? await authApi(token).get(`/product/single`, {params: {id: productParams.pid}}) : {data: undefined}
	logger.info("Editing vendor product", data)

    return (
        <ProductForm hasDefault={data} availableCategories={["Food", "Sports", "Music", "Academics"]} />
    )
}

export default ProductEditPage