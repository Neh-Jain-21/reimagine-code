/** @format */

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
//components
import InputText from "src/components/TextField/InputText";
import InputField from "src/components/TextField/InputField";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import CommonLeft from "src/components/common/CommonLeft";
import Footer from "src/components/footer/Footer";
//css
import "src/containers/forgotpass/forgotpass.css";

const Forgotpass = () => {
    document.body.style.backgroundColor = "white";
    const snackBar = useSnackbar();
    const history = useHistory();
    const dispatch = useDispatch();

    //data from redux
    const users = useSelector((state) => {
        return state.userReducer.users;
    });

    //formik
    const Formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email").required("Required"),
        }),
        onSubmit: (values) => {
            let userFound = false;
            for (let index = 0; index < users.length; index++) {
                if (users[index].email === values.email) {
                    userFound = true;
                }
            }
            if (userFound) {
                snackBar.enqueueSnackbar("Email Sent!", {
                    variant: "success",
                });
                dispatch({ type: "SET_TEMP_EMAIL", payload: values.email });
                history.push("/emailverification");
            } else {
                snackBar.enqueueSnackbar("User not Found", {
                    variant: "error",
                });
            }
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
                                Forgot password?
                            </span>
                            <span className="forgotpass-login">
                                Please enter your registered email address we'll
                                send you reset instruction
                            </span>
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
                            <span
                                className="forgot-reset-text"
                                onClick={Formik.resetForm}
                            >
                                RESET
                            </span>
                            <ButtonOrange text="Send" />
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

export default Forgotpass;
