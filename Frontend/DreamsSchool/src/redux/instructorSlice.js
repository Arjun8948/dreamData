import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentInstructor: null,
    loading: false,
    error: false
}

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        instructorLoginStart: (state) => {
            state.loading = true;
        },
        instructorLoginSucess: (state, action) => {
            state.loading = false;
            state.currentInstructor = action.payload;
        },
        instructorLogout: (state, action) => {
            state.currentInstructor = null,
            state.loading = false,
            state.error = false
        },

        instructorLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        instructorUpdateSucess: (state, action) => {
            state.loading = false;
            state.currentInstructor = action.payload;
        }
    }
})

 export const {instructorLoginStart, instructorLoginSucess,instructorUpdateSucess, instructorLogout, instructorLoginFailure} = instructorSlice.actions;
export default instructorSlice.reducer;
