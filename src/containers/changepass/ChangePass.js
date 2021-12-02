/** @format */

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
//css
import "src/containers/changepass/changepass.css";
//components
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import InputText from "src/components/TextField/InputText";
import ErrorMessage from "src/components/errormessage/ErrorMessage";
import TextFieldWithIcon from "src/components/TextField/TextFieldWithIcon";
import Footer from "src/components/footer/Footer";

const ChangePass = () => {
    document.body.style.backgroundColor = "white";
    const history = useHistory();
    const snackbar = useSnackbar();
    const dispatch = useDispatch();

    const users = useSelector((state) => {
        return state.userReducer.users;
    });

    const formik = useFormik({
        initialValues: {
            oldpass: "",
            newpass: "",
            cpass: "",
        },
        validationSchema: Yup.object({
            oldpass: Yup.string()
                .min(8, "Min 8 char")
                .required("Required")
                .trim(),
            newpass: Yup.string()
                .min(8, "Min 8 char")
                .required("Required")
                .trim(),
            cpass: Yup.string()
                .required("Required")
                .min(8, "Min 8 Char")
                .equals([Yup.ref("newpass"), null], "Password Mismatch")
                .trim(),
        }),
        onSubmit: (values) => {
            const email = sessionStorage.getItem("email");
            let password_changed = false;

            // eslint-disable-next-line
            users.map((user) => {
                if (user.email === email) {
                    if (user.password === values.oldpass) {
                        user.password = values.newpass;
                        password_changed = true;
                    } else {
                        snackbar.enqueueSnackbar("Incorrect Old Password", {
                            variant: "error",
                        });
                    }
                }
            });
            if (password_changed) {
                dispatch({ type: "CHANGE_PASSWORD", payload: users });
                snackbar.enqueueSnackbar("Password Changed", {
                    variant: "success",
                });
                history.push("/profile");
            } else {
                snackbar.enqueueSnackbar("Something Wrong!", {
                    variant: "error",
                });
            }
        },
    });

    return (
        <>
            <Grid
                sx={{ p: 3, minHeight: "100vh", pt: "10vh" }}
                container
                justifyContent="center"
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    item
                    xs={12}
                    md={5}
                >
                    <div>
                        <p className="changepass-heading-text">
                            Change Password
                        </p>
                        <p className="changepass-text">
                            Please enter your new password
                        </p>

                        <form onSubmit={formik.handleSubmit}>
                            <InputText text="Old password" />
                            <TextFieldWithIcon
                                placeholder="Old Password"
                                name="oldpass"
                                value={formik.values.oldpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.oldpass}
                                errors={formik.errors.oldpass}
                            />

                            <div className="changepass-mt"></div>
                            <InputText text="New password" />
                            <TextFieldWithIcon
                                placeholder="New Password"
                                name="newpass"
                                value={formik.values.newpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.newpass}
                                errors={formik.errors.newpass}
                            />

                            <div className="changepass-mt"></div>
                            <InputText text="Confirm password" />
                            <TextFieldWithIcon
                                placeholder="Confirm Password"
                                name="cpass"
                                value={formik.values.cpass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <ErrorMessage
                                touched={formik.touched.cpass}
                                errors={formik.errors.cpass}
                            />

                            <ButtonOrange text="Save" />
                        </form>
                    </div>
                    <Footer className="changepass-footer-text" />
                </Grid>
            </Grid>
        </>
    );
};

export default ChangePass;
