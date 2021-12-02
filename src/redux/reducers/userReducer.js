/** @format */

import { NehImg, YashImg } from "src/assets";

const initialData = {
    users: [
        {
            image: NehImg,
            fname: "Neh",
            lname: "Jain",
            email: "neh.jain@openxcellinc.com",
            phone: "7096429580",
            password: "12345678",
            dob: "Sun Jan 21 2001 00:00:00 GMT+0530 (India Standard Time)",
            gender: "male",
        },
        {
            image: YashImg,
            fname: "Yash",
            lname: "Shah",
            email: "yash.shah@openxcellinc.com",
            phone: "1234567890",
            password: "12345678",
            dob: "Sun Jan 21 2001 00:00:00 GMT+0530 (India Standard Time)",
            gender: "male",
        },
    ],
};

const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                users: action.payload,
            };

        case "EDIT_USER":
            return {
                users: action.payload,
            };

        case "CHANGE_PASSWORD":
            return {
                users: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
