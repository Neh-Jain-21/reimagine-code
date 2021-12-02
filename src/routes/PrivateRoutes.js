/** @format */

import { Route, Switch } from "react-router-dom";
//components
import PostList from "src/containers/postlist/PostList";
import Posts from "src/containers/createpost/CreatePost";
import Profile from "src/containers/profile/Profile";
import ChangePass from "src/containers/changepass/ChangePass";

const routes = [
    {
        path: "/postlist",
        component: PostList,
        exact: true,
    },
    {
        path: "/createpost",
        component: Posts,
        exact: true,
    },
    {
        path: "/profile",
        component: Profile,
        exact: true,
    },
    {
        path: "/changepass",
        component: ChangePass,
        exact: true,
    },
];

const PrivateRoutes = () => {
    return (
        <div>
            <Switch>
                {routes.map((route) => {
                    return (
                        <Route
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    );
                })}
            </Switch>
        </div>
    );
};

export default PrivateRoutes;
