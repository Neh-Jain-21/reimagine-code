/** @format */

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";
//css
import "src/containers/createpost/createpost.css";

const Posts = () => {
    document.body.style.backgroundColor = "#E5E5E5";
    const dispatch = useDispatch();
    const history = useHistory();

    const [inputMedia, setInputMedia] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (description === "" && inputMedia.length === 0) {
            setError("Required");
        } else {
            setError("");
            dispatch({
                type: "ADD_POST",
                payload: {
                    id: Date.now() + Math.random(),
                    email: sessionStorage.getItem("email"),
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    likes: [],
                    media: inputMedia,
                    description: description.trim(),
                },
            });
            history.push("/postlist");
        }
    };

    const handleInput = (event) => {
        if (event.target.files !== undefined) {
            let temp = [];
            // eslint-disable-next-line
            Array.from(event.target.files).map((file) => {
                temp.push({ type: file.type, url: URL.createObjectURL(file) });
            });
            setInputMedia(inputMedia.concat([...temp]));
        }
    };

    return (
        <>
            <Grid sx={{ minHeight: "100vh", pt: "calc(5vh + 20px)" }} container>
                <Grid item xs={12} md={7} sx={{ px: 5, py: 3 }}>
                    <p className="posts-heading">Create Post</p>
                    <p className="posts-desc">Add a Description</p>

                    {/* Description input */}
                    <TextField
                        sx={{ backgroundColor: "white" }}
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        fullWidth
                        placeholder="Add Post Description"
                        multiline
                        rows={10}
                    />

                    <p className="signin-error">{error}</p>
                    {/* Add Media */}
                    <Grid sx={{ mt: 2 }} container>
                        <label htmlFor="posts-media-input">
                            <input
                                style={{ display: "none" }}
                                accept="video/*,image/*"
                                id="posts-media-input"
                                multiple
                                type="file"
                                onChange={handleInput}
                            />
                            <Button
                                sx={{
                                    bgcolor: "#FF7F00",
                                    textTransform: "capitalize",
                                    color: "white",
                                    borderColor: "white",
                                    ":hover": {
                                        borderColor: "white",
                                        bgcolor: "#FF7F00",
                                    },
                                }}
                                disableElevation
                                variant="contained"
                                component="span"
                            >
                                Add Media
                            </Button>
                        </label>
                    </Grid>

                    {/* Show Selected Medias */}
                    <Grid sx={{ my: 3 }} container alignItems="center">
                        {inputMedia.map((media) => {
                            if (media.type.includes("image")) {
                                return (
                                    <img
                                        className="posts-image"
                                        src={media.url}
                                        alt="..."
                                    />
                                );
                            } else {
                                return (
                                    <video
                                        style={{
                                            marginRight: 20,
                                            marginBottom: 20,
                                        }}
                                        width="144"
                                        height="100%"
                                        autoPlay
                                        controls
                                    >
                                        <source
                                            src={media.url}
                                            type="video/*"
                                        />
                                    </video>
                                );
                            }
                        })}
                    </Grid>
                    <Grid
                        sx={{ backgroundColor: "white", p: 3 }}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <NavLink className="navlink-common" to="/postlist">
                            <Button
                                sx={{
                                    mr: 3,
                                    textTransform: "capitalize",
                                    color: "#222A33",
                                }}
                                variant="text"
                            >
                                Cancel
                            </Button>
                        </NavLink>
                        <Button
                            sx={{
                                bgcolor: "#FF7F00",
                                textTransform: "capitalize",
                                color: "white",
                                borderColor: "white",
                                ":hover": {
                                    borderColor: "white",
                                    bgcolor: "#FF7F00",
                                },
                            }}
                            disableElevation
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Create Post
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Posts;
