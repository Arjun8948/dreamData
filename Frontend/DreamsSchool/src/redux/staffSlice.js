import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentStaff: null,
    loading: false,
    error: false
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        staffLoginStart: (state) => {
            state.loading = true;
        },
        staffLoginSucess: (state, action) => {
            state.loading = false;
            state.currentStaff = action.payload;
        },
        staffLogout: (state) => {
            state.currentStaff = null,
            state.loading = false,
            state.error = false
        },
        staffLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})

const {staffLoginStart, staffLoginSucess, staffLogout, staffLoginFailure} = staffSlice.actions;
export default staffSlice.reducer;
