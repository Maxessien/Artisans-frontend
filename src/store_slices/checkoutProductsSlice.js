import { createSlice } from "@reduxjs/toolkit";


const checkoutProducts = createSlice({
    name: "checkoutProducts",
    initialState: [],
    reducers: {
        addCheckoutProducts: (state, {payload})=>{
            state = [...state, payload]
        }
    }
})

export default checkoutProducts.reducer
export const {addCheckoutProducts} = checkoutProducts.actions