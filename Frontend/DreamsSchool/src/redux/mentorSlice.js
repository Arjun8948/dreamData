import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentMentor: null,
    loading: false,
    error: false
}

const mentorSlice = createSlice({
    name: 'mentor',
    initialState,
    reducers: {
        mentorLoginStart: (state) => {
            state.loading = true;
        },
        mentorLoginSucess: (state, action) => {
            state.loading = false;
            state.currentMentor = action.payload;
        },
        mentorLogout: (state, action) => {
            state.currentMentor = null,
            state.loading = false,
            state.error = false
        },
        mentorLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

const {mentorLoginStart, mentorLoginSucess, mentorLogout, mentorLoginFailure} = mentorSlice.actions;
export default mentorSlice.reducer;
