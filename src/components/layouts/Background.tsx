import * as React from "react";
import {createStyles, makeStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";

//<editor-folder desc="collapsed" desc="Styles">
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        background: theme.palette.primary.main,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
    }
}));
//</editor-folder>

const Background: React.FunctionComponent = props => {
    const classes = useStyles();

    return <div className={classes.root}>
            {props.children}
    </div>
}

export default Background;