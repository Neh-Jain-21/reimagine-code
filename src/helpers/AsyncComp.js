/** @format */

import React from "react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { Backdrop, CircularProgress } from "@mui/material";

export default function asyncComponent(importComponent) {
    class asyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null,
            };
            Nprogress.configure({ showSpinner: false });
            Nprogress.start();
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        async componentDidMount() {
            this.mounted = true;
            const { default: Component } = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />,
                });
            }
        }

        render() {
            return (
                <>
                    {this.state.component ? (
                        this.state.component
                    ) : (
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                </>
            );
        }
    }

    return asyncComponent;
}
