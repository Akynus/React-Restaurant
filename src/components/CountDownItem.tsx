import * as React from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import PrepareSchedule from "src/models/PrepareSchedule";
import moment, {Moment} from "moment";
import {useDispatch} from "react-redux";
import MenuActions from "../redux/actions/MenuActions";

export default function CountDownItem(props: IProps): React.ReactElement<IProps> {
    const dispatch = useDispatch();
    let timer: NodeJS.Timeout;
    React.useEffect(() => {
        start();

        return stop;
    }, [props.schedule]);
    const [countdown, setCountdown] = React.useState<Moment>(moment("00:00", "mm:ss"));

    function start(): void {
        if (props.schedule && !timer) {
            timer = setInterval(() => {
                const end = props.schedule.endTime;
                const now = moment();
                const duration = end.diff(now);
                if (duration >= 0) {
                    setCountdown(moment(duration));
                } else {
                    if (timer) {
                        clearInterval(timer);
                        complete();
                    }

                }
            }, 100);
        }
    }

    function stop():void{
        if (timer) {
            clearInterval(timer);
        }
    }

    function complete(): void {
        dispatch(MenuActions.ADD_WALLET_VALUE(props.schedule.price));
        dispatch(MenuActions.REMOVE_SCHEDULE(props.schedule.item));
    }

    function buildText(): string {
        const minutes = countdown.format('mm');
        const seconds = countdown.format('ss');
        return `Pedido pronto em ${minutes}:${seconds}`;
    }

    return <ListItem dense={true}>
        <ListItemText primary={buildText()} primaryTypographyProps={{variant: "subtitle2"}}/>
    </ListItem>
}

interface IProps {
    schedule: PrepareSchedule;
}