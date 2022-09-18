import { createSlice } from '@reduxjs/toolkit'


interface initialState {
    isAdmin:boolean
}

const initialState:initialState = {
    isAdmin:false
}

const isAdminSlice = createSlice({
    name:'isAdmin',
    initialState:initialState,
    reducers:{
        checkAdmin:(state , action)=>{
            if(action.payload === true){
                state.isAdmin = true
            }
            else{
                state.isAdmin = false
            }
        }
    }
})

export const { checkAdmin } = isAdminSlice.actions

export default isAdminSlice.reducer;