import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const getCategory:any = createAsyncThunk('category/getCategory', async () => {
    const res = await fetch('http://localhost:8000/store/category');
    const data = await res.json();
    return data;
});

interface initialState {
    category : [],
    status : "idle"|"pending"|"succeeded"|"failed"
}

const initialState : initialState = {
    category : [],
    status : "idle"
}

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getCategory.pending, (state , action) => {
            state.status = "pending";
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            state.status = "succeeded";
        })
        builder.addCase(getCategory.rejected, (state , action) => {
            state.status = "failed";
        })
    },

})

export default categorySlice.reducer;

