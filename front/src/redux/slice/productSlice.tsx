import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';

export const getProduct:any = createAsyncThunk('product/getProduct' , async ()=>{
    const res = await fetch('http://localhost:8000/store/product');
    const data = await res.json();
    return data;
})

interface initialState {
    product : [],
    status:'idle'|'pending'|'succeeded'|'failed'
}

const initialState: initialState = {
    product : [],
    status:'idle'
}


const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(getProduct.pending, (state , action) => {
            state.status = "pending";
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";
        })
        builder.addCase(getProduct.rejected, (state , action) => {
            state.status = "failed";
        })

    },

})



export default productSlice.reducer;