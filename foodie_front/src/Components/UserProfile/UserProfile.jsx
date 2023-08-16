import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Divider, message } from 'antd';
import { UserOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './UserProfilePage.css';
import Loading from '../Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import Title from 'antd/es/typography/Title';
import config from '../../config';
const UserProfilePage = () => {
    const [isFollwed, setFollowed] = useState(false)
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [followId,setFollowId] = useState("")
    const params = useParams()
    const id = params.id
    const uid = localStorage.getItem("uid")


    const handleFollowButtonClick = () => {
        const data = {
            "followedBy": uid,
            "followedTo": id
        }
        axios.post(`${config.baseUrl}/follow`, data).then((value) => {
            message("Followed succesully")
            setFollowed(true)
        }).catch(err => {
            console.log("follow failed " + err)
        })
    };

    const handleUnfollow = () => {
        axios.delete(`${config.baseUrl}/follow/${followId}`).then((value)=>{
            setFollowed(false)
        }).catch(err=>{
            console.log("handle unfollow failed "+err)
        })
    }

    const setIsFollowedFromDb = ()=>{
        axios.get(`${config.baseUrl}/follow/byFollowedBy/${id}`).then((value) => {
            if(value.data){
                console.log(value.data)
                
                setFollowed(true)
              //  setFollowId(value.data[0].id)
            }
            axios.get(`${config.baseUrl}/follow/byFollowedTo/${id}`).then((value) => {
                console.log(value.data)
                if(value.data){
                    
                    setFollowed(true)
                    
                   // setFollowId(value.data[0].id)
                }
            }).catch(err => {
                console.log("get unfollwed failed." + err)
            })
        }).catch(err => {
            console.log("get unfollwed failed." + err)
        })
    }

    // Fetch user data on mount
    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);

            }).then(() => {
                axios.get("http://localhost:8080/api/posts").then(value => {
                    setPosts(value.data)
                }).catch(err => {
                    console.log("get posts failed " + err)
                })
            }).then(()=>{
                setIsFollowedFromDb()
            });
    }, [isFollwed]);


    if (!user) {
        return <Loading />
    }
    return (
        <div>
            <div className="user-profile__container">
                <div className="user-profile__header">
                    <div className="user-profile__avatar">
                        <Avatar size={96} src={user.profilePictureImageUrl} icon={<UserOutlined />} />
                    </div>
                    <div className="user-profile__info">
                        <div className="user-profile__username">{user.username}</div>
                        <div className="user-profile__name">{`${user.firstName} ${user.lastName}`}</div>
                        <div className="user-profile__description">{user.email}</div>
                        <div className="user-profile__button">
                            {
                                isFollwed ?
                                    <Button danger
                                        onClick={(e) => {
                                            handleUnfollow()
                                        }}
                                    >
                                        UnFollow
                                    </Button>
                                    : <Button type="primary" onClick={handleFollowButtonClick}>
                                        Follow
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="user-profile__posts">
                    {
                        posts.filter((post) => { return post.postedBy === id }).length == 0 ?

                            <Title
                                style={{ textAlign: "center" }}
                                level={2}>
                                No posts by {user.username}
                            </Title>

                            :

                            posts.filter((post) => { return post.postedBy === id }).map(post => (
                                <Post key={post.id}
                                    post={post}
                                    id={post._id}
                                    userName={post.postedBy}
                                    postImage={post.imageUrls[0]}
                                    likes={post.likes.length}
                                    comments={post.comments}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};



export default UserProfilePage
