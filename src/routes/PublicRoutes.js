/** @format */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// components
import PrivateRoutes from "src/routes/PrivateRoutes";
import Signin from "src/containers/signin/Signin";
import Register from "src/containers/register/Register";
import Forgotpass from "src/containers/forgotpass/Forgotpass";
import Emailverification from "src/containers/emailverification/Emailverification";
import ResetPassword from "src/containers/resetpassword/ResetPassword";
import NavBar from "src/containers/navbar/NavBar";

const routes = [
    {
        path: "/",
        component: Signin,
        exact: true,
    },
    {
        path: "/signin",
        component: Signin,
        exact: true,
    },
    {
        path: "/register",
        component: Register,
        exact: true,
    },
    {
        path: "/forgotpass",
        component: Forgotpass,
        exact: true,
    },
    {
        path: "/emailverification",
        component: Emailverification,
        exact: true,
    },
    {
        path: "/resetpassword",
        component: ResetPassword,
        exact: true,
    },
];

const PublicRoutes = () => {
    const history = useHistory();

    const isLoggedIn = useSelector((state) => {
        return state.tempReducer.isLoggedIn;
    });

    useEffect(() => {
        if (sessionStorage.getItem("email")) {
            history.push("/postlist");
        }
        // eslint-disable-next-line
    }, [isLoggedIn]);

    return (
        <>
            <NavBar />
            <Switch>
                {routes.map((route) => {
                    return (
                        <Route exact={route.exact} path={route.path} component={route.component} />
                    );
                })}
                <Route
                    render={() =>
                        isLoggedIn ? (
                            <PrivateRoutes />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/signin",
                                }}
                            />
                        )
                    }
                />
            </Switch>
        </>
    );
};

export default PublicRoutes;
