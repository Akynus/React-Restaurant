import * as React from "react";
import {Button, Card, CardContent, CardMedia, Dialog, DialogActions, Typography} from "@material-ui/core";
import MenuItem from "src/models/MenuItem";
import {useDispatch} from "react-redux";
import moment from "moment";
import PrepareSchedule from "src/models/PrepareSchedule";
import MenuActions from "src/redux/actions/MenuActions";

export interface PrepareConfirmRef {
    open(item: MenuItem): void;
}

const PrepareConfirm = React.forwardRef<PrepareConfirmRef, IProps>((props, ref) => {
    const dispatch = useDispatch();
    React.useImperativeHandle(ref, () => ({open: onOpen}));
    const [show, setShow] = React.useState<boolean>(false);
    const [current, setCurrent] = React.useState<MenuItem>(Object);

    function onOpen(item: MenuItem): void {
        setCurrent(item);
        setShow(true);
    }

    function onClose(): void {
        setShow(false);
    }

    function onSchedule(): void {

        const schedule: PrepareSchedule = {
            item: current.id,
            price: current.price,
            endTime: moment().add(current.leadTime, "seconds")
        }

        dispatch(MenuActions.INSERT_SCHEDULE(schedule));
        onClose();
    }

    return <Dialog open={show} onClose={onClose} maxWidth={"xs"}>
        <Card>
            {current.image && <CardMedia component="img" height={220} image={current.image} title={current.name}/>}
            <CardContent>
                <Typography gutterBottom={true} variant={"h6"}>
                    Preparar Pedido: {current.name}
                </Typography>

                <Typography variant={"body2"}>
                    Tempo de preparo: {current.leadTime} {current.leadTime > 1 ? 'minutos' : 'minuto'}
                </Typography>
            </CardContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" autoFocus>
                    Cancelar
                </Button>
                <Button onClick={onSchedule} color="primary">
                    Iniciar Preparo
                </Button>
            </DialogActions>
        </Card>
    </Dialog>
})

interface IProps {
}

export default PrepareConfirm;