import MenuReducer from "./MenuReducer";
import MenuItem from "src/models/MenuItem";
import PrepareSchedule from "src/models/PrepareSchedule";
import SystemReducer from "./SystemReducer";

//<editor-fold desc="Interfaces">
export interface IReducerMenu {
    showForm: boolean;
    showWallet: boolean;
    listItems: MenuItem[];
    listPrepare: PrepareSchedule[];
    walletValue: number;
    bankValue: number;
}

export interface IReducerSystem {
    allowAccess: boolean;
    user: string;
}

export interface IReducer {
    menu: IReducerMenu;
    system: IReducerSystem;
}

//</editor-fold>

const reducer = {
    menu: MenuReducer,
    system: SystemReducer
}

export default reducer;