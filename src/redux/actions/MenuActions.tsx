import {createAction} from "@reduxjs/toolkit";
import MenuItem from "src/models/MenuItem";
import PrepareSchedule from "src/models/PrepareSchedule";

const MenuActions = {
    SHOW_FORM: createAction<boolean>("SHOW_FORM"),
    SHOW_WALLET: createAction<boolean>('SHOW_WALLET'),

    INSERT_ITEM: createAction<MenuItem>("INSERT_ITEM"),
    REMOVE_ITEM: createAction<any>("REMOVE_ITEM"),

    INSERT_SCHEDULE: createAction<PrepareSchedule>('INSERT_SCHEDULE'),
    REMOVE_SCHEDULE: createAction<any>('REMOVE_SCHEDULE'),

    ADD_WALLET_VALUE: createAction<number>('ADD_WALLET_VALUE'),
    SET_WALLET_VALUE: createAction<number>('SET_WALLET_VALUE'),
    ADD_BANK_VALUE: createAction<number>('ADD_BANK_VALUE')
}

export default MenuActions;