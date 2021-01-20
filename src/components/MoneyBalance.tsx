import * as React from "react";
import {Button, Hidden, Icon, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "src/redux/reducers";
import MenuActions from "../redux/actions/MenuActions";
import ConvertMoney from "src/utils/ConvertMoney";

export default function MoneyBalance(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    const walletValue = useSelector<IReducer, number>(state => state.menu.walletValue);


    function onClick(): void {
        dispatch(MenuActions.SHOW_WALLET(true));
    }

    return <ListItem>
        <Hidden xsDown={true}>
            <ListItemIcon>
                <Icon className={'mdi mdi-cash-multiple'}/>
            </ListItemIcon>
        </Hidden>
        <ListItemText primary={ConvertMoney(walletValue)} secondary={'Valor em caixa'} primaryTypographyProps={{variant: "h6"}}
                      secondaryTypographyProps={{variant: "subtitle2"}}/>
        <ListItemSecondaryAction>
            <Button variant={"contained"} size={"large"} color={"primary"} disabled={walletValue < 100}
                    startIcon={<Icon className={'mdi mdi-database-arrow-right'}/>} onClick={onClick}>
                Retirada de Saldo
            </Button>
        </ListItemSecondaryAction>
    </ListItem>
}

interface IProps {

}