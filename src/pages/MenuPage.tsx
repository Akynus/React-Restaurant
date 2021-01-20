import * as React from "react";
import Background from "src/components/layouts/Background";
import {
    Button,
    Card, CardContent,
    Container,
    createStyles, Divider,
    Grid, Icon,
    ListItem,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import MoneyBalance from "src/components/MoneyBalance";
import MenuItem from "src/models/MenuItem";
import CardMenuItem from "src/components/CardMenuItem";
import MenuItemForm from "src/components/dialogs/MenuItemForm";
import {useDispatch, useSelector} from "react-redux";
import MenuActions from "src/redux/actions/MenuActions";
import {IReducer} from "../redux/reducers";
import PrepareConfirm, {PrepareConfirmRef} from "../components/dialogs/PrepareConfirm";
import RemoveConfirm, {RemoveConfirmRef} from "../components/dialogs/RemoveConfirm";
import WalletForm from "../components/dialogs/WalletForm";

//<editor-folder desc="collapsed" desc="Styles">
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        background: 'rgba(255,255,255,0.3)',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: theme.spacing(2)
    }
}));
//</editor-folder>

export default function MenuPage(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    const classes = useStyles();
    const prepareConfirmRef = React.createRef<PrepareConfirmRef>();
    const removeConfirmRef = React.createRef<RemoveConfirmRef>();
    const userName = useSelector<IReducer,string>(state => state.system.user);
    const datasource = useSelector<IReducer, MenuItem[]>(state => state.menu.listItems);

    function onAddItem(): void {
        dispatch(MenuActions.SHOW_FORM(true));
    }

    function onPrepareItem(item: MenuItem): void {
        if (prepareConfirmRef.current) prepareConfirmRef.current.open(item);
    }

    function onRemoveItem(item: MenuItem): void {
        if (removeConfirmRef.current) removeConfirmRef.current.open(item);
    }

    function items(): React.ReactNode {
        return <React.Fragment>
            {datasource.map((item, index) => <Grid key={index} item={true} xs={12} sm={6} md={4}>
                <CardMenuItem onPrepare={() => onPrepareItem(item)} onRemove={() => onRemoveItem(item)} item={item}/>
            </Grid>)}
        </React.Fragment>
    }

    return <React.Fragment>
        <Background>
            <div className={classes.root}>
                <Container maxWidth={"md"}>
                    <Grid container={true} spacing={2}>
                        <Grid item={true} xs={12}>
                            <Card elevation={4}>
                                <ListItem>
                                    <ListItemText primary={`Bem-vindo ${userName}`} primaryTypographyProps={{variant: "h4"}}
                                                  secondary={'Cardápio de Itens'}
                                                  secondaryTypographyProps={{variant: "subtitle2"}}/>
                                </ListItem>
                            </Card>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container={true} spacing={2}>
                                        <Grid item={true} xs={12}>
                                            <MoneyBalance/>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Divider/>
                                        </Grid>
                                        <Grid xs={12} item={true}>
                                            <Button onClick={onAddItem} startIcon={<Icon className={'mdi mdi-plus'}/>}
                                                    color={"primary"}
                                                    variant={"contained"}>
                                                Inserir Item
                                            </Button>
                                        </Grid>
                                        {items()}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Background>

        <MenuItemForm/>
        <WalletForm/>
        <PrepareConfirm ref={prepareConfirmRef}/>
        <RemoveConfirm ref={removeConfirmRef}/>

    </React.Fragment>
}

interface IProps {
}