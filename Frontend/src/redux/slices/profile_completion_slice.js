import {createSlice} from "@reduxjs/toolkit";

export const profileCompletedSlice = createSlice({
    name:"Profile",
    initialState:{
        isProfileCompleted:false,
        username:""
    },
    reducers:{
        setProfileCompletionStatus:(state, action)=>{
            state.isProfileCompleted = action.payload.isProfileCompleted;
            state.username = action.payload.username;
            state.aadhaar = action.payload.aadhaar;
        }
    }
})

export const { setProfileCompletionStatus } = profileCompletedSlice.actions;

export default profileCompletedSlice.reducer;