import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import postimage from "../../images/post.jpg";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";
import { Button } from 'antd';
import axios from "axios"
import config from '../../config';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
const Post = (props) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [isLiked, setIslLiked] = useState(false)
    useEffect(() => {
        axios.get(`${config.baseUrl}/comments`).then((value) => {
            setComments(value.data)
        }).catch(err => {
            console.log("get comments failed " + err)
        })
    }, [comments,isLiked]);



    return (
        <div className="post__container">
            {/* Header */}
            <div className="post__header">
                <Avatar className="post__image" src="" />
                <div className="post__username">{props.userName}</div>
            </div>

            {/* Image */}
            <div>
                <img

                    src={props.postImage} width="615px" />
            </div>

            {/* Analytics */}
            <div>
                <div style={{ "marginLeft": "10px" }}>
                    {
                        isLiked ?
                            <HeartFilled
                                style={{color:"red"}}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIslLiked(false)
                                }}

                            />
                            :

                            <HeartOutlined
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIslLiked(true)
                                }}
                            />}
                    <img src={comment} className="post_reactimage" />
                    <img src={share} className="post_reactimage" />
                </div>
                <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                    {props.likes} likes
                </div>
            </div>

            {/* Comment Section */}
            <div>
                {comments.map((item, index) => (
                    <div className="post_comment">{item.userId}: {item.text}</div>
                ))}
                <input
                    value={comment}
                    text="text"
                    className="post__commentbox"
                    placeholder="Add a comment..."
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                />
                <Button
                    type="primary"
                    onClick={async (e) => {
                        e.preventDefault()
                        const data = {
                            "commentId": "1",
                            "postId": props.id,
                            "userId": "currUserId",
                            "text": comment
                        }
                        await axios.post(`${config.baseUrl}/comments`, data).catch(err => {
                            console.log("add comment failed " + err)
                        })
                        setComment("")
                    }}>Comment</Button>
            </div>
        </div>
    );
};

export default Post;
