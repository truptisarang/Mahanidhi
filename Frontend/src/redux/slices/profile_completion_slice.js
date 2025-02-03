import {createSlice} from "@reduxjs/toolkit";

export const profileCompletedSlice = createSlice({
    name:"Profile",
    initialState:{
        isProfileCompleted:false,
        username:null,
        aadhaar:null,
        isLoggedIn:false
    },
    reducers:{
        loginSuccess: (state, action)=>{
            state.isProfileCompleted = action.payload.isProfileCompleted;
            state.username = action.payload.username;
            state.aadhaar = action.payload.aadhaar;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        updateProfileStatus: (state, action) => {
            state.isProfileCompleted = action.payload.isProfileCompleted;
        },
        logout:(state) =>{
            state.isProfileCompleted = null;
            state.username = null;
            state.aadhaar = null;
            state.isLoggedIn = false
        }
    }
})

export const { loginSuccess, logout, updateProfileStatus } = profileCompletedSlice.actions;

export default profileCompletedSlice.reducer;