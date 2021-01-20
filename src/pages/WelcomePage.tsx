import * as React from "react";
import Background from "src/components/layouts/Background";
import {
    CardContent,
    Card,
    createStyles,
    makeStyles,
    Slide,
    Grid,
    ListItem,
    ListItemText,
    Button
} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import TextField from "src/components/fields/InputText";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import SystemActions from "../redux/actions/SystemActions";

//<editor-folder desc="collapsed" desc="Styles">
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        background: 'rgba(255,255,255,0.3)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    card: {
        maxWidth: 400
    },
    title: {
        textAlign: 'center'
    }
}));
//</editor-folder>

export default function WelcomePage(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = React.useState<boolean>(false);
    const classes = useStyles();
    const schema = yup.object().shape({
        name: yup.string().max(30).required()
    });
    const formController = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {name: ''}
    });

    React.useEffect(() => {
        setTimeout(() => setShow(true), 300);
    }, []);

    function onSubmit(data: any) {
        dispatch(SystemActions.SET_USE(data['name']));
        dispatch(SystemActions.ALLOW_ACCESS(true));

        history.push("/menu");
    }

    return <Background>
        <div className={classes.root}>
            <Slide direction="up" in={show}>
                <Card className={classes.card}>
                    <CardContent>
                        <form onSubmit={formController.handleSubmit(onSubmit)}>
                            <Grid container={true} spacing={2}>

                                <Grid item={true} xs={12}>
                                    <ListItem>
                                        <ListItemText className={classes.title}
                                                      primary={'Bem-vindo ao Restaurante Sabor da Casa'}
                                                      secondary={'Insira seu Nome para acessar o Menu'}/>
                                    </ListItem>
                                </Grid>

                                <Grid item={true} xs={12}>
                                    <TextField placeholder={'Seu nome'} control={formController.control}
                                               errors={formController.errors}
                                               name={'name'}/>
                                </Grid>

                                <Grid item={true} xs={12}>
                                    <Button variant="contained" fullWidth={true} color="secondary"
                                            onClick={formController.handleSubmit(onSubmit)}>
                                        Acessar Menu
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Slide>
        </div>
    </Background>
}

interface IProps {
}