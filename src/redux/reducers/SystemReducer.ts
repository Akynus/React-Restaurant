import {createReducer} from "@reduxjs/toolkit";
import SystemActions from "src/redux/actions/SystemActions";
import {IReducerSystem} from "./index";

const initialState: IReducerSystem = {
    allowAccess: false,
    user: ''
}

export default createReducer(initialState, builder => {
    builder.addCase(SystemActions.ALLOW_ACCESS, (state, action) => {
        state.allowAccess = action.payload;
    }).addCase(SystemActions.SET_USE, (state, action) => {
        state.user = action.payload;
    });
})
