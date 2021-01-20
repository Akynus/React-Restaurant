import * as React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {IReducer} from "src/redux/reducers";
import MenuActions from "src/redux/actions/MenuActions";
import {useDispatch, useSelector} from 'react-redux';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MenuItem from "src/models/MenuItem";
import TextField from "src/components/fields/InputText";
import MakeId from "src/utils/MakeId";

export default function MenuItemForm(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    const showDialog = useSelector<IReducer, boolean>(state => state.menu.showForm);
    const schema = yup.object().shape({
        name: yup.string().max(40, 'Não pode ser mairo que 40 characteres').required('Campo Obrigatório'),
        description: yup.string().required('Campo Obrigatório'),
        price: yup.number().min(1, 'Valor deve ser maior que 1').required('Campo Obrigatório'),
        leadTime: yup.number().min(1, 'Valor deve ser maior que 1').required('Campo Obrigatório'),
        image: yup.string().url('Não é uma URL valida')
    });
    const formController = useForm<MenuItem>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            leadTime: 0,
            image: ''
        }
    });

    function onClose(): void {
        dispatch(MenuActions.SHOW_FORM(false));
    }

    function onSubmit(data: MenuItem): void {
        data.id = MakeId(5);
        dispatch(MenuActions.INSERT_ITEM(data));
        onClose();
    }

    return <Dialog open={showDialog} maxWidth={"sm"} onClose={onClose} fullWidth={true}>
        <DialogTitle>Cadastro de Item</DialogTitle>
        <DialogContent>
            <form onSubmit={formController.handleSubmit(onSubmit)}>
                <Grid container={true} spacing={2}>
                    <Grid item={true} sm={6} xs={12}>
                        <TextField label={'Nome'} control={formController.control}
                                   errors={formController.errors}
                                   name={'name'}/>
                    </Grid>
                    <Grid item={true} sm={6} xs={12}>
                        <TextField label={'Preço'} type={'number'} control={formController.control}
                                   errors={formController.errors}
                                   name={'price'}/>
                    </Grid>
                    <Grid item={true} sm={12} xs={12}>
                        <TextField label={'Descrição'} control={formController.control}
                                   errors={formController.errors}
                                   name={'description'}/>
                    </Grid>
                    <Grid item={true} sm={6} xs={12}>
                        <TextField label={'Tempo de Preparo em Segundos'} type={'number'}
                                   control={formController.control}
                                   errors={formController.errors}
                                   name={'leadTime'}/>
                    </Grid>
                    <Grid item={true} sm={6} xs={12}>
                        <TextField label={'Imagem(url)'} type={'url'} control={formController.control}
                                   errors={formController.errors}
                                   name={'image'}/>
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