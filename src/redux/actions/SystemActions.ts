import {createAction} from "@reduxjs/toolkit";

const SystemActions = {
    ALLOW_ACCESS: createAction<boolean>('ALLOW_ACCESS'),
    SET_USE: createAction<string>('SET_USER')
}

export default SystemActions;