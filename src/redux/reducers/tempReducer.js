/** @format */

const initialData = {
    isLoggedIn: sessionStorage.getItem("email"),
    email: "",
};

const tempReducer = (state = initialData, action) => {
    switch (action.type) {
        case "SET_TEMP_EMAIL":
            return {
                email: action.payload,
            };

        default:
            return state;
    }
};

export default tempReducer;
