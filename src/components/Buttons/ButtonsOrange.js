/** @format */

import { Button } from "@mui/material";

const ButtonOrange = (props) => {
    const { onClick, text } = props;

    return (
        <>
            <Button
                type="submit"
                sx={{
                    my: 3,
                    color: "white",
                    bgcolor: "#FF7F00",
                    textTransform: "capitalize",
                    "&:hover": {
                        bgcolor: "#FF7F00",
                    },
                }}
                size="large"
                onClick={onClick}
                fullWidth
            >
                {text}
            </Button>
        </>
    );
};

export default ButtonOrange;
