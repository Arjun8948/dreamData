import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentStudent: null,
    loading: false,
    error: false
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        studentLoginStart: (state) => {
            state.loading = true
        },
        studentLoginSucess: (state, action) => {
            state.loading = false
            state.currentStudent = action.payload
        },


        studentupdate: (state, action) => {
            state.loading = false
            state.currentStudent = action.payload
        },

        studentLogout: (state) => {
            state.currentStudent = null,
            state.error = false,
            state.loading = false
        },
        studentLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})

export const {studentLoginStart, studentLoginSucess, studentupdate,
     studentLoginFailure, studentLogout} = studentSlice.actions

export default studentSlice.reducer
