/** @format */

import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Checkbox, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
//imgs
import { SigninImg } from "src/assets";
//css
import "src/containers/signin/signin.css";
//componenets
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import Footer from "src/components/footer/Footer";
import Carousel from "src/components/carousel";

const Signin = () => {
    document.body.style.backgroundColor = "white";
    const history = useHistory();
    const snackBar = useSnackbar();

    //data from redux
    const users = useSelector((state) => {
        return state.userReducer.users;
    });

    const Formik = useFormik({
        initialValues: {
            // email: "neh.jain@openxcellinc.com",
            // password: "12345678",
            email: "",
            password: "",
            remember: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email Invalid").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (value) => {
            let userFound = false;
            let correctCred = false;
            for (let index = 0; index < users.length; index++) {
                if (users[index].email === value.email) {
                    userFound = true;
                    if (users[index].password === value.password) {
                        correctCred = true;
                    }
                }
            }

            if (userFound) {
                if (correctCred) {
                    sessionStorage.setItem("email", value.email);
                    snackBar.enqueueSnackbar("Welcome", {
                        variant: "success",
                    });
                    history.push("/postlist");
                } else {
                    snackBar.enqueueSnackbar("Invalid Credentials", {
                        variant: "error",
                    });
                }
            } else {
                snackBar.enqueueSnackbar("User Not Found", {
                    variant: "error",
                });
            }
        },
    });

    return (
        <>
            <Grid
                sx={{
                    minHeight: "100vh",
                    pt: "calc(5vh + 6px)",
                }}
                container
                direction="row"
            >
                <Grid
                    sx={{
                        bgcolor: "#2F80ED",
                        display: { xs: "none", md: "flex" },
                    }}
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    md={8}
                >
                    <Carousel>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                        <div className="signin-img-container">
                            <img className="signin-img" src={SigninImg} alt="..." />
                        </div>
                    </Carousel>
                </Grid>
                <Grid
                    sx={{
                        px: {
                            xs: 3,
                            lg: 10,
                        },
                        pt: 5,
                        pb: 3,
                    }}
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    md={4}
                    xs={12}
                >
                    <form className="signin-form" onSubmit={Formik.handleSubmit}>
                        <Grid container direction="column">
                            <span className="signin-welcome">Welcome Back!</span>
                            <span className="signin-login">Login to your account</span>
                            <InputText text="Email" />
                            <InputField
                                placeholder="Email"
                                name="email"
                                value={Formik.values.email}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={Formik.touched.email}
                                errors={Formik.errors.email}
                            />
                            <InputText text="Password" />
                            <TextFieldWithIcon
                                placeholder="Enter Your Password"
                                name="password"
                                value={Formik.values.password}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={Formik.touched.password}
                                errors={Formik.errors.password}
                            />
                            <Grid
                                sx={{ mt: 2 }}
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid justifyContent="center">
                                    <Checkbox
                                        sx={{ ml: -1.3 }}
                                        name="remember"
                                        color="warning"
                                        checked={Formik.values.remember}
                                        value={Formik.values.remember}
                                        size="small"
                                        onChange={Formik.handleChange}
                                    />
                                    <span className="signin-forgot">Remember Me</span>
                                </Grid>
                                <Grid justifyContent="center">
                                    <NavLink className="navlink-common" to="/forgotpass">
                                        <span className="signin-forgot">Forgot Password?</span>
                                    </NavLink>
                                </Grid>
                            </Grid>
                            <ButtonOrange text="Sign In" />
                        </Grid>
                    </form>
                    <Footer className="signin-copyright" />
                </Grid>
            </Grid>
        </>
    );
};

export default Signin;
