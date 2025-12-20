import { FaFilter } from "react-icons/fa"
import Button from "../reusable_components/Buttons"

const ShopHeader = ({openFilterFn})=>{
    return (
        <>
        <div className="w-screen px-10 py-4">
            <Button rounded="md" size="small"  buttonFn={()=>openFilterFn()} className="flex md:block text-lg items-center justify-start font-semibold space-x-1">
                <FaFilter /> <span>Filter</span>
            </Button>
        </div>
        </>
    )
}

export default ShopHeader