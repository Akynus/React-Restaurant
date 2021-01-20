import * as React from "react";
import {Theme, ThemeProvider} from "@material-ui/core/styles";
import {createMuiTheme} from "@material-ui/core";


const ThemingConfig: React.FunctionComponent = function (props) {

    function theme(): Theme {
        return createMuiTheme({
            palette: {
                primary: {
                    main: '#ef6c00'
                },
                secondary: {
                    main: '#e64a19'
                }
            },
            shape: {
                borderRadius: 6
            },
            overrides: {
                MuiIcon: {
                    root: {
                        lineHeight: 1
                    }
                },
                MuiListItem: {
                    container: {
                        display: "block"
                    }
                },
                MuiListItemIcon: {
                    root: {
                        marginLeft: 10
                    }
                }
            }
        });
    }

    return <ThemeProvider theme={theme()}>
        {props.children}
    </ThemeProvider>

};

export default ThemingConfig;