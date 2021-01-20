import * as React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import WelcomePage from "src/pages/WelcomePage";
import MenuPage from "../pages/MenuPage";
import {useSelector} from "react-redux";
import {IReducer} from "src/redux/reducers";

export default function RouterConfig(): React.ReactElement {
    const allowAccess = useSelector<IReducer, boolean>(state => state.system.allowAccess);

    function redirect(): any {
        return <Redirect to={'/'}/>;
    }

    return <BrowserRouter>
        <Switch>
            <Route path={'/'} exact={true} component={WelcomePage}/>
            {allowAccess && <Route path={'/menu'} exact={true} component={MenuPage}/>}
            <Route path={'*'} render={redirect}/>
        </Switch>
    </BrowserRouter>
}