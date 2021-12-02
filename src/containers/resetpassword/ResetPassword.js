/** @format */

import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
//components
import CommonLeft from "src/components/common/CommonLeft";
import Footer from "src/components/footer/Footer";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
//css
import "src/containers/resetpassword/resetpassword.css";

const ResetPassword = () => {
    document.body.style.backgroundColor = "white";
    const snackBar = useSnackbar();
    const history = useHistory();
    const dispatch = useDispatch();

    //data from redux
    const users = useSelector((state) => {
        return state.userReducer.users;
    });
    const tempEmail = useSelector((state) => {
        return state.tempReducer.email;
    });

    if (tempEmail === "") {
        history.push("/signin");
    }

    const Formik = useFormik({
        initialValues: {
            password: "",
            cpassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Required")
                .min(8, "Min 8 Char")
                .trim(),
            cpassword: Yup.string()
                .required("Required")
                .min(8, "Min 8 Char")
                .equals([Yup.ref("password"), null], "Password Mismatch")
                .trim(),
        }),
        onSubmit: (values) => {
            // eslint-disable-next-line
            users.map((user) => {
                if (user.email === tempEmail) {
                    user.password = values.password;
                }
            });
            dispatch({ type: "SET_TEMP_EMAIL", payload: "" });
            snackBar.enqueueSnackbar("Password Changed", {
                variant: "success",
            });
            history.push("/signin");
        },
    });

    return (
        <>
            <Grid sx={{ minHeight: "100vh", pt: "calc(5vh + 6px)" }} container>
                <CommonLeft />
                <Grid
                    sx={{
                        px: {
                            xs: 3,
                            lg: 5,
                        },
                        pt: 5,
                        pb: 3,
                    }}
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    md={7}
                    xs={12}
                >
                    <form
                        className="signin-form"
                        onSubmit={Formik.handleSubmit}
                    >
                        <Grid
                            container
                            direction="column"
                            item
                            lg={5}
                            md={7}
                            xs={12}
                        >
                            <span className="signin-welcome">
                                Reset Password
                            </span>
                            <span className="forgotpass-login">
                                Please enter your new password.
                            </span>
                            <span className="rpass-newpass-text">
                                New Password
                            </span>
                            <TextFieldWithIcon
                                placeholder="New Password"
                                name="password"
                                value={Formik.values.password}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <p className="signin-error">
                                {Formik.touched.password &&
                                    Formik.errors.password}
                            </p>
                            <span className="rpass-cpass-text">
                                Confirm Password
                            </span>
                            <TextFieldWithIcon
                                placeholder="Confirm Password"
                                name="cpassword"
                                value={Formik.values.cpassword}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            <p className="signin-error">
                                {Formik.touched.cpassword &&
                                    Formik.errors.cpassword}
                            </p>
                            <ButtonOrange text="Save" />
                        </Grid>
                    </form>
                    <Grid container>
                        <Footer className="forgotpass-copyright" />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ResetPassword;
