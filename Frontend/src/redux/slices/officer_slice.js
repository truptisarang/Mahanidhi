import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
    name: "Officer",
    initialState: {
        fullName: null,
        deptName: null,
        role: null,
        isLoggedIn:false
    },
    reducers: {
        OfficerloginSuccess: (state, action)=>{
            state.fullName = action.payload.fullName;
            state.deptName = action.payload.deptName;
            state.role = action.payload.role;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        Officerlogout:(state) =>{
            state.fullName = null;
            state.deptName = null;
            state.role = null;
            state.isLoggedIn = false
        }
    }
});

export const { OfficerloginSuccess, Officerlogout } = userRoleSlice.actions;

export default userRoleSlice.reducer;
