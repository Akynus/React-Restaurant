import * as React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "src/redux/reducers";
import MenuActions from "src/redux/actions/MenuActions";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextField from "src/components/fields/InputText";
import ConvertMoney from "../../utils/ConvertMoney";

export default function WalletForm(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    const show = useSelector<IReducer, boolean>(state => state.menu.showWallet);
    const walletValue = useSelector<IReducer, number>(state => state.menu.walletValue);
    const bankValue = useSelector<IReducer, number>(state => state.menu.bankValue);
    const schema = yup.object().shape({
        value: yup.number().min(1, 'Valor deve ser maior que 1').max(walletValue, 'Valor não pode ser maior que o Saldo').required('Campo Obrigatório'),
    });
    const formController = useForm<{ value: number }>({
        resolver: yupResolver(schema),
        defaultValues: {
            value: walletValue
        }
    });

    function onClose(): void {
        dispatch(MenuActions.SHOW_WALLET(false));
    }

    function onSubmit(data: any): void {
        dispatch(MenuActions.SET_WALLET_VALUE(walletValue - data['value']));
        alert(`Transferencia realizada com sucesso. \n Saldo atual da conta é de ${ConvertMoney(bankValue + data['value'])}`);
        dispatch(MenuActions.ADD_BANK_VALUE(data['value']));
        onClose();
    }

    return <Dialog open={show} onClose={onClose} maxWidth={"sm"} keepMounted={false}>
        <DialogTitle>Transferencia de Saldo</DialogTitle>
        <DialogContent>
            <form onSubmit={formController.handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <TextField label={'Valor da Transferencia'} type={'number'} control={formController.control}
                                   errors={formController.errors}
                                   name={'value'}/>
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="inherit" autoFocus>
                Cancelar
            </Button>
            <Button onClick={formController.handleSubmit(onSubmit)} color="primary">
                Salvar
            </Button>
        </DialogActions>
    </Dialog>
}

interface IProps {

}