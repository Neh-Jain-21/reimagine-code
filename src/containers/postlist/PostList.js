/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton, Dialog, DialogContent } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CloseIcon from "@mui/icons-material/Close";
//css
import "src/containers/postlist/postlist.css";
//img & video
import { UserImg } from "src/assets";

const PostList = (props) => {
    document.body.style.backgroundColor = "#E5E5E5";
    const dispatch = useDispatch();

    const posts = useSelector((state) => {
        return state.postReducer.posts;
    });

    const users = useSelector((state) => {
        return state.userReducer.users;
    });

    const [open, setOpen] = useState(false);
    const [tempPost, setTempPost] = useState({
        id: "",
        email: "",
        date: "",
        time: "",
        likes: [],
        media: [],
        description: "",
    });

    const handleLike = (id) => {
        const email = sessionStorage.getItem("email");
        // eslint-disable-next-line
        posts.map((post) => {
            if (post.id === id) {
                if (post.likes.find((elem) => elem === email)) {
                    post.likes = post.likes.filter((like) => like !== email);
                } else {
                    post.likes = [...post.likes, email];
                }
            }
        });
        dispatch({ type: "CHANGE_LIKE", payload: [...posts] });
    };

    return (
        <>
            <Grid
                sx={{ py: 2, px: 3, pt: "calc(5vh + 40px)" }}
                container
                direction="column"
            >
                <p className="posts-heading">Post List</p>

                {posts.map((post) => {
                    let name = "";
                    let userImage = "";

                    //eslint-disable-next-line
                    users.map((user) => {
                        if (user.email === post.email) {
                            name = user.fname + " " + user.lname;
                            userImage = user.image;
                        }
                    });

                    return (
                        <>
                            <Grid
                                key={post.id}
                                sx={{
                                    mt: 3,
                                    px: { xs: 1, md: 3 },
                                    py: 2,
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                }}
                                container
                                direction="column"
                            >
                                {/* post-header */}
                                <Grid
                                    sx={{ flexWrap: "nowrap" }}
                                    container
                                    direction="row"
                                    alignItems="center"
                                >
                                    <img
                                        className="postlist-user-img"
                                        src={
                                            userImage === undefined
                                                ? UserImg
                                                : userImage
                                        }
                                        alt="..."
                                    />
                                    <Grid container direction="column">
                                        <p className="postlist-username">
                                            {name}
                                        </p>
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <div className="postlist-time">
                                                <DateRangeOutlinedIcon
                                                    sx={{
                                                        color: "#9494AE",
                                                        mr: 1,
                                                    }}
                                                />
                                                <p className="postlist-details">
                                                    {post.date}
                                                </p>
                                            </div>
                                            <div className="postlist-time">
                                                <AccessTimeOutlinedIcon
                                                    sx={{
                                                        color: "#9494AE",
                                                        mr: 1,
                                                        ml: { xs: 0, sm: 1 },
                                                    }}
                                                />
                                                <p className="postlist-details">
                                                    {post.time}
                                                </p>
                                            </div>
                                            <div className="postlist-time">
                                                <IconButton
                                                    sx={{
                                                        ml: {
                                                            xs: 0,
                                                            sm: 1,
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        handleLike(post.id);
                                                    }}
                                                >
                                                    <ThumbUpOutlinedIcon
                                                        sx={{
                                                            color: "#9494AE",
                                                        }}
                                                    />
                                                </IconButton>
                                                <p
                                                    className="postlist-likes"
                                                    onClick={() => {
                                                        setTempPost(post);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    {post.likes.length} likes
                                                </p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Grid>

                                {/* post description */}
                                <Grid
                                    sx={{
                                        my: 3,
                                        maxWidth: { xs: "100%", md: "75%" },
                                    }}
                                >
                                    <p className="postlist-description">
                                        {post.description}
                                    </p>
                                </Grid>

                                {/* post-media */}
                                <Grid container>
                                    {post.media.map((med) => {
                                        if (med.type.includes("image")) {
                                            return (
                                                <img
                                                    key={med.url}
                                                    className="postlist-image"
                                                    src={med.url}
                                                    alt="..."
                                                />
                                            );
                                        } else {
                                            return (
                                                <video
                                                    key={med.url}
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
                                                        src={med.url}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            );
                                        }
                                    })}
                                </Grid>
                            </Grid>
                        </>
                    );
                })}

                {/* post */}
            </Grid>

            {/* Likes Dialog */}
            <Dialog
                fullWidth
                open={open}
                scroll="paper"
                maxWidth="sm"
                onClose={() => {
                    setOpen(false);
                }}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: 4,
                        maxHeight: 500,
                    },
                }}
            >
                <div className="likes-header">
                    <p className="likes-header-text">Liked By</p>
                    <IconButton
                        sx={{ position: "absolute", right: 0 }}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                </div>

                <DialogContent dividers={true}>
                    {tempPost.likes.length !== 0
                        ? tempPost.likes.map((a) => {
                              let name = "";
                              let image = "";
                              // eslint-disable-next-line
                              users.map((user) => {
                                  if (user.email === a) {
                                      name = user.fname + " " + user.lname;
                                      image = user.image;
                                  }
                              });
                              return (
                                  <>
                                      {/* users who liked */}
                                      <Grid
                                          key={a}
                                          sx={{
                                              flexWrap: "nowrap",
                                              mb: 4,
                                              px: 4,
                                          }}
                                          container
                                          alignItems="center"
                                      >
                                          <img
                                              className="postlist-user-img"
                                              src={image}
                                              alt=""
                                          />
                                          <p className="postlist-username">
                                              {name}
                                          </p>
                                      </Grid>
                                  </>
                              );
                          })
                        : null}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PostList;
