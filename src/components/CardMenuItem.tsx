import * as React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Chip,
    createStyles,
    Icon,
    makeStyles,
    Typography
} from "@material-ui/core";
import MenuItem from "src/models/MenuItem";
import {Theme} from "@material-ui/core/styles";
import PrepareSchedule from "../models/PrepareSchedule";
import {useSelector} from "react-redux";
import {IReducer} from "../redux/reducers";
import CountDownItem from "./CountDownItem";
import ConvertMoney from "../utils/ConvertMoney";

//<editor-folder desc="collapsed" desc="Styles">
const useStyles = makeStyles((theme: Theme) => createStyles({
    name: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    description: {
        display: '-webkit-box',
        height: 60,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '-webkitLineClamp': 3,
        '-webkitBoxOrient': 'vertical'
    },
    content: {
        position: 'relative'
    },
    chip: {
        position: 'absolute',
        top: -17,
        right: theme.spacing(2)
    }
}));
//</editor-folder>

export default function CardMenuItem(props: IProps): React.ReactElement<IProps> {
    const classes = useStyles();
    const schedules = useSelector<IReducer, PrepareSchedule[]>(state => state.menu.listPrepare);

    function getUrl(): string {
        if (props.item.image) {
            return props.item.image;
        } else {
            return 'https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
        }
    }

    function getSchedule(): PrepareSchedule | undefined {
        return schedules.find(value => value.item === props.item.id);
    }

    return <Card>
        <CardMedia component="img" height={180} image={getUrl()} title={props.item.name}/>
        <CardContent className={classes.content}>
            <Chip className={classes.chip} color={"secondary"} label={ConvertMoney(props.item.price)}/>
            <Typography className={classes.name} gutterBottom={true} variant={"h6"} component={"h3"}>
                {props.item.name}
            </Typography>
            <Typography className={classes.description} gutterBottom={true} variant={"body2"} color={"textSecondary"}
                        component={"p"}>
                {props.item.description}
            </Typography>
            <Typography variant={"body2"} color={"initial"} component={"p"}>
                Tempo de preparo: {props.item.leadTime} {props.item.leadTime > 1 ? 'segundos' : 'segundo'}
            </Typography>
        </CardContent>

        {!getSchedule() && <CardActions>
            <Button size="small" color="primary" onClick={props.onPrepare}
                    startIcon={<Icon className={'mdi mdi-chef-hat'}/>}>
                Preparar
            </Button>
            <Button size="small" color="primary" onClick={props.onRemove}
                    startIcon={<Icon className={'mdi mdi-delete'}/>}>
                Remover
            </Button>
        </CardActions>}

        {getSchedule() && <CardActions>
            <CountDownItem schedule={getSchedule()!}/>
        </CardActions>}
    </Card>
}

interface IProps {
    onPrepare(): void;

    onRemove(): void;

    item: MenuItem;
}