import React from 'react';
import ReactDOM from 'react-dom';
import "src/index.css";
import {CssBaseline} from "@material-ui/core";
import ThemeConfig from "src/resource/ThemeConfig";
import RouterConfig from "src/resource/RouterConfig";
import { Provider } from 'react-redux';
import store from "src/redux/store";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>

        <Provider store={store}>
            <ThemeConfig>
                <RouterConfig/>
            </ThemeConfig>
        </Provider>

    </React.StrictMode>,
    document.getElementById('application')
);
