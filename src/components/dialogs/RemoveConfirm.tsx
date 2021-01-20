import * as React from "react";
import {Button, Card, CardContent, CardMedia, Dialog, DialogActions, Typography} from "@material-ui/core";
import MenuItem from "src/models/MenuItem";
import {useDispatch} from "react-redux";
import MenuActions from "src/redux/actions/MenuActions";

export interface RemoveConfirmRef {
    open(item: MenuItem): void;
}

const RemoveConfirm = React.forwardRef<RemoveConfirmRef, IProps>((props, ref) => {
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

    function onRemove(): void {
        dispatch(MenuActions.REMOVE_ITEM(current.id));
        onClose();
    }

    return <Dialog open={show} onClose={onClose} maxWidth={"xs"}>
        <Card>
            {current.image && <CardMedia component="img" height={220} image={current.image} title={current.name}/>}
            <CardContent>
                <Typography gutterBottom={true} variant={"h6"} component={"span"}>
                    Remover {current.name} do cardápio
                </Typography>
            </CardContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" autoFocus>
                    Cancelar
                </Button>
                <Button onClick={onRemove} color="primary">
                    Remover
                </Button>
            </DialogActions>
        </Card>
    </Dialog>
})

interface IProps {
}

export default RemoveConfirm;