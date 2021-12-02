/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//imgs
import { Logo } from "src/assets";
//css
import "src/containers/navbar/navbar.css";

const NavBar = (props) => {
    const path = props.location.pathname;
    const email = sessionStorage.getItem("email");

    const LoggedOutPath = () => {
        return (
            <>
                <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/signin">
                    <Button
                        sx={
                            path === "/signin"
                                ? {
                                      bgcolor: "#FF7F00",
                                      textTransform: "capitalize",
                                      color: "white",
                                      borderColor: "whitesmoke",
                                      ":hover": {
                                          borderColor: "white",
                                          bgcolor: "#FF7F00",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                                : {
                                      color: "white",
                                      borderColor: "white",
                                      textTransform: "capitalize",
                                      ":hover": {
                                          borderColor: "white",
                                      },
                                      mr: 2,
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                        }
                        variant={path === "/signin" ? "contained" : "outlined"}
                    >
                        Log In
                    </Button>
                </NavLink>
                <NavLink tabIndex={-1} className="navlink-common  navlink-mr" to="/register">
                    <Button
                        sx={
                            path === "/register"
                                ? {
                                      bgcolor: "#FF7F00",
                                      textTransform: "capitalize",
                                      color: "white",
                                      borderColor: "whitesmoke",
                                      ":hover": {
                                          borderColor: "white",
                                          bgcolor: "#FF7F00",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                                : {
                                      color: "white",
                                      borderColor: "white",
                                      textTransform: "capitalize",
                                      ":hover": {
                                          borderColor: "white",
                                      },
                                      width: { xs: 75, md: 95 },
                                      height: { xs: 25, md: 35 },
                                  }
                        }
                        variant={path === "/register" ? "contained" : "outlined"}
                    >
                        Register
                    </Button>
                </NavLink>
            </>
        );
    };

    const LoggedInPath = () => {
        const [userName, setUserName] = useState("");

        const users = useSelector((state) => {
            return state.userReducer.users;
        });

        useEffect(() => {
            const email = sessionStorage.getItem("email");
            // eslint-disable-next-line
            users.map((user) => {
                if (user.email === email) {
                    setUserName(user.fname + " " + user.lname);
                }
            });
        }, [users]);

        return (
            <>
                {path !== "/createpost" ? (
                    <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/createpost">
                        <Button
                            sx={{
                                color: "white",
                                borderColor: "white",
                                textTransform: "capitalize",
                                ":hover": {
                                    borderColor: "white",
                                },
                                height: { xs: 25, md: 35 },
                            }}
                            variant="outlined"
                        >
                            Create Post
                        </Button>
                    </NavLink>
                ) : null}
                <NavLink tabIndex={-1} className="navlink-common navlink-mr" to="/profile">
                    <Button
                        sx={{
                            color: "white",
                            textTransform: "capitalize",
                            height: { xs: 25, md: 35 },
                        }}
                        variant="text"
                        startIcon={<AccountCircleIcon />}
                    >
                        {userName}
                    </Button>
                </NavLink>
            </>
        );
    };

    return (
        <>
            <div className="publicnav-header">
                <img className="publicnav-logo" src={Logo} alt="" />
                <div className="publicnav-align-right">
                    {email !== null ? LoggedInPath() : LoggedOutPath()}
                </div>
            </div>
        </>
    );
};

export default withRouter(NavBar);
