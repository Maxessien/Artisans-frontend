import { FaFilter } from "react-icons/fa"
import Button from "../reusable_components/Buttons"

const ShopHeader = ({openFilterFn})=>{
    return (
        <>
        <div className="w-screen px-10 py-4">
            <Button rounded="6px" size="small"  buttonFn={()=>openFilterFn()}>
                <FaFilter /> <span>Filter</span>
            </Button>
        </div>
        </>
    )
}

export default ShopHeader