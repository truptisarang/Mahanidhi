import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
    name: "Officer",
    initialState: {
        fullName:"",
        deptName: "",
        role: ""
    },
    reducers: {
        setOfficer: (state, action) => {
            if (action.payload.fullName !== undefined) {
                state.fullName = action.payload.fullName;
            }
            if (action.payload.deptName !== undefined) {
                state.deptName = action.payload.deptName;
            }
            if (action.payload.role !== undefined) {
                state.role = action.payload.role;
            }
        }
    }
});

export const { setOfficer } = userRoleSlice.actions;

export default userRoleSlice.reducer;
