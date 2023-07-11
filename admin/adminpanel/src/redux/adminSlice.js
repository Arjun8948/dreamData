import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentAdmin: null,
    loading: false,
    error: false
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state,action) => {
            state.currentAdmin = action.payload,
            state.loading= false,
            state.error= false
        },
        loginFailure: (state) => {
            state.currentAdmin = null,
            state.loading= false,
            state.error= true

        },
        adminUpdate: (state,action) => {
            state.currentAdmin = action.payload,
            state.loading= false,
            state.error= false
        },
        logout: (state) => {
            state.currentAdmin = null,
            state.loading= false,
            state.error= false
        }
    }
})

 export const {loginStart ,loginSuccess,adminUpdate,loginFailure,logout} = adminSlice.actions
export default adminSlice.reducer;