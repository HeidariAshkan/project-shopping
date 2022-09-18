import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSelfProduct: any = createAsyncThunk('selfProduct/getSelfProduct' , async (id:string | undefined)=>{
    const res = await fetch(`http://localhost:8000/store/product/id/${id}`);
    const data = await res.json();
    return data;
})

interface initialState {
    selfProduct:any,
    status:'idle'|'pending'|'succeeded'|'failed'
}

const initialState: initialState = {
    selfProduct:{},
    status:'idle'
}

const selfProductSlice = createSlice({
    name: 'selfProduct',
    initialState: initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder.addCase(getSelfProduct.pending, (state , action) => {
            state.status = "pending";
        }) 
        builder.addCase(getSelfProduct.fulfilled, (state, action) => {
            state.selfProduct = action.payload;
            state.status = "succeeded";
        })
        builder.addCase(getSelfProduct.rejected, (state , action) => {
            state.status = "failed";
        })
    },
})


export default selfProductSlice.reducer;
