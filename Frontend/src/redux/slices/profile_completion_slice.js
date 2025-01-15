import {createSlice} from "@reduxjs/toolkit";

export const profileCompletedSlice = createSlice({
    name:"Profile",
    initialState:{
        aadhaar:"",
        isProfileCompleted:false,
        username:""
    },
    reducers:{
        setProfileCompletionStatus:(state, action)=>{
            if(action.payload.isProfileCompleted !== undefined){
                state.isProfileCompleted = action.payload.isProfileCompleted;
            }if(action.payload.username !== undefined){
                state.username = action.payload.username;
            }if(action.payload.aadhaar !== undefined){
                state.aadhaar = action.payload.aadhaar;
            }
        }
    }
})

export const { setProfileCompletionStatus } = profileCompletedSlice.actions;

export default profileCompletedSlice.reducer;