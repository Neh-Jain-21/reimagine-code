/** @format */

const initialData = {
    posts: [
        {
            id: "nothing",
            email: "neh.jain@openxcellinc.com",
            date: "15/12/2020",
            time: "10:00AM",
            likes: [],
            media: [],
            description: "Hello",
        },
    ],
};

const postReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_POST":
            return {
                posts: [...state.posts, action.payload],
            };

        case "CHANGE_LIKE":
            return {
                posts: action.payload,
            };

        default:
            return state;
    }
};

export default postReducer;
