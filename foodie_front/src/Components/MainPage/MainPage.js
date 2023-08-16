import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Post from '../Post/Post';
import axios from "axios"
import config from '../../config';
const MainPage = () => {
    const [postArray, setPostArray] = useState([]);

    useEffect(() => {
        getPost();
    }, []);

    const getPost = () => {
        let data = [

        ];
        axios.get(`${config.baseUrl}/posts`).then((value) => {
            setPostArray(value.data)
        }).catch(err => {
            console.log("get posts failed " + err)
        })
        setPostArray(data);
    };

    return (
        <div>
            {postArray.map((item, index) => (
                <Post
                    key={item._id}
                    id={item._id}
                    userName={item.postedBy}
                    postImage={item.imageUrls[0]}
                    likes={item.likes.length}
                    comments = {item.comments}
                />
            ))}
        </div>
    );
};

export default MainPage;
