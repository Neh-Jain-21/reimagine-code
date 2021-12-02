/** @format */

import { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
//components
import CommonLeft from "src/components/common/CommonLeft";
import ButtonOrange from "src/components/Buttons/ButtonsOrange";
import Footer from "src/components/footer/Footer";
//css
import "src/containers/emailverification/emailverification.css";

const Emailverification = () => {
    document.body.style.backgroundColor = "white";
    const snackBar = useSnackbar();
    const history = useHistory();

    //states
    const [input, setInput] = useState(["", "", "", ""]);
    const [random, setRandom] = useState(
        (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    );

    //data from redux
    const tempEmail = useSelector((state) => {
        return state.tempReducer.email;
    });

    if (tempEmail === "") {
        history.push("/signin");
    }

    useEffect(() => {
        alert(random);
    }, [random]);

    useEffect(() => {
        let focused1 = document.getElementById("field1");
        let focused2 = document.getElementById("field2");
        let focused3 = document.getElementById("field3");
        let focused4 = document.getElementById("field4");

        if (input[0] !== "") {
            focused1.blur();
            focused2.focus();
            focused3.blur();
            focused4.blur();
        }
        if (input[1] !== "") {
            focused1.blur();
            focused2.blur();
            focused3.focus();
            focused4.blur();
        }
        if (input[2] !== "") {
            focused1.blur();
            focused2.blur();
            focused3.blur();
            focused4.focus();
        }
    }, [input]);

    const handleSubmit = () => {
        if (input.join("") === random) {
            history.push("/resetpassword");
        } else {
            snackBar.enqueueSnackbar("OTP Incorrect", {
                variant: "error",
            });
        }
    };

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
                    <form className="signin-form">
                        <Grid
                            container
                            direction="column"
                            item
                            lg={5}
                            md={7}
                            xs={12}
                        >
                            <span className="signin-welcome">Verification</span>
                            <span className="forgotpass-login">
                                We have sent you OTP on your email address
                            </span>
                            <Grid
                                sx={{ mt: 4 }}
                                container
                                justifyContent="space-between"
                            >
                                <TextField
                                    sx={{
                                        backgroundColor: "#F9F9F9",
                                        ".MuiOutlinedInput-notchedOutline": {
                                            outline: "none",
                                            borderColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#000000",
                                            },
                                            "&.Mui-focused fieldset": {
                                                border: "1px solid rgb(255, 97, 97)",
                                            },
                                        },
                                    }}
                                    autoFocus
                                    id="field1"
                                    autoComplete="off"
                                    type="text"
                                    inputProps={{ maxLength: 1 }}
                                    className="emailverif-input"
                                    placeholder="0"
                                    variant="outlined"
                                    color="warning"
                                    name="email"
                                    value={input[0]}
                                    onChange={(e) => {
                                        let tempInp = [...input];
                                        tempInp[0] = e.target.value;
                                        setInput(tempInp);
                                    }}
                                />
                                <TextField
                                    sx={{
                                        backgroundColor: "#F9F9F9",
                                        ".MuiOutlinedInput-notchedOutline": {
                                            outline: "none",
                                            borderColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#000000",
                                            },
                                            "&.Mui-focused fieldset": {
                                                border: "1px solid rgb(255, 97, 97)",
                                            },
                                        },
                                    }}
                                    id="field2"
                                    autoComplete="off"
                                    type="text"
                                    inputProps={{ maxLength: 1 }}
                                    className="emailverif-input"
                                    placeholder="0"
                                    variant="outlined"
                                    color="warning"
                                    name="email"
                                    value={input[1]}
                                    onChange={(e) => {
                                        let tempInp = [...input];
                                        tempInp[1] = e.target.value;
                                        setInput(tempInp);
                                    }}
                                />
                                <TextField
                                    sx={{
                                        backgroundColor: "#F9F9F9",
                                        ".MuiOutlinedInput-notchedOutline": {
                                            outline: "none",
                                            borderColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#000000",
                                            },
                                            "&.Mui-focused fieldset": {
                                                border: "1px solid rgb(255, 97, 97)",
                                            },
                                        },
                                    }}
                                    id="field3"
                                    autoComplete="off"
                                    type="text"
                                    inputProps={{ maxLength: 1 }}
                                    className="emailverif-input"
                                    placeholder="0"
                                    variant="outlined"
                                    color="warning"
                                    name="email"
                                    value={input[2]}
                                    onChange={(e) => {
                                        let tempInp = [...input];
                                        tempInp[2] = e.target.value;
                                        setInput(tempInp);
                                    }}
                                />
                                <TextField
                                    sx={{
                                        backgroundColor: "#F9F9F9",
                                        ".MuiOutlinedInput-notchedOutline": {
                                            outline: "none",
                                            borderColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#000000",
                                            },
                                            "&.Mui-focused fieldset": {
                                                border: "1px solid rgb(255, 97, 97)",
                                            },
                                        },
                                    }}
                                    id="field4"
                                    autoComplete="off"
                                    type="text"
                                    inputProps={{ maxLength: 1 }}
                                    className="emailverif-input"
                                    placeholder="0"
                                    variant="outlined"
                                    color="warning"
                                    name="email"
                                    value={input[3]}
                                    onChange={(e) => {
                                        let tempInp = [...input];
                                        tempInp[3] = e.target.value;
                                        setInput(tempInp);
                                    }}
                                />
                            </Grid>
                            <span
                                className="forgot-reset-text"
                                onClick={() => {
                                    setRandom(
                                        (
                                            Math.floor(Math.random() * 10000) +
                                            10000
                                        )
                                            .toString()
                                            .substring(1)
                                    );
                                    snackBar.enqueueSnackbar("Email Sent!", {
                                        variant: "success",
                                    });
                                }}
                            >
                                RESEND
                            </span>
                            <ButtonOrange
                                text="Verify"
                                onClick={handleSubmit}
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    mb: 3,
                                    color: "#FF7F00",
                                    bgcolor: "white",
                                    textTransform: "capitalize",
                                    borderColor: "#FF7F00",
                                    "&:hover": {
                                        bgcolor: "#FF7F00",
                                        color: "white",
                                        borderColor: "#FF7F00",
                                    },
                                }}
                                size="large"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                Change Email
                            </Button>
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

export default Emailverification;
