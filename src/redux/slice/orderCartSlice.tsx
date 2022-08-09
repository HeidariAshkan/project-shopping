import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface OrderCartState {
    description: string;
    featured: boolean;
    final_price: any;
    id: string;
    main_image: string;
    name: string;
    count: any;
    idProduct:number
    options:string
}
interface initialState {
    cart:any,
    status:'idle'|'pending'|'succeeded'|'failed'
}

const initialState: initialState ={
    cart:[],
    status:'idle'
}

const orderCartSlice = createSlice({
    name:'cartList',
    initialState: initialState,
    reducers:{
        addToCart:(state,action)=>{
            if(state.cart.find((item:any)=>item.id === action.payload.id && item.options === action.payload.options)){
                state.cart.find((item:any)=>item.id === action.payload.id).count += 1
            }
            else{
                state.cart.push(action.payload);
            }
        },
        DecreseToCart:(state,action)=>{
            const count = state?.cart.find((item:any)=>item.id === action.payload.id)?.count 
            console.log(count)
            if((count - 1) === 0){
                // delete item
                state.cart = state.cart.filter((item:any)=>item.id !== action.payload.id)
            }
            else{
                state.cart.find((item:any)=>item.id === action.payload.id).count -= 1
            }
        },
        removeAllCart:(state)=>{
            state.cart = []
        }
    },
})

export const {addToCart , DecreseToCart , removeAllCart} = orderCartSlice.actions;

export default orderCartSlice.reducer;