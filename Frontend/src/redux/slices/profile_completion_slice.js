import {createSlice} from "@reduxjs/toolkit";

export const profileCompletedSlice = createSlice({
    name:"Profile",
    initialState:{
        isProfileCompleted:false,
        username:""
    },
    reducers:{
        setProfileCompletionStatus:(state, action)=>{
            if(action.payload.isProfileCompleted !== undefined){
                state.isProfileCompleted = action.payload.isProfileCompleted;
            }if(action.payload.username !== undefined){
                state.username = action.payload.username;
            }
        }
    }
})

export const { setProfileCompletionStatus } = profileCompletedSlice.actions;

export default profileCompletedSlice.reducer;