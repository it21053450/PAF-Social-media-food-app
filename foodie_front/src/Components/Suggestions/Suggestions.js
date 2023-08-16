import React, { useState, useEffect } from 'react';
import "./Suggestions.css"
import { Avatar } from '@mui/material';
import imageSrc1 from '../../images/pp1.png'
import imageSrc2 from '../../images/pp2.png'
import imageSrc3 from '../../images/pp3.jpeg'
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const Suggestions = () => {
    const [users, setUsers] = useState([]);
    const uid = localStorage.getItem("uid")
    useEffect(() => {
        fetch(`${config.baseUrl}/users`)
            .then(response => response.json())
            .then(data => setUsers(data.slice(0, 10)))

            .catch(error => console.log(error));
    }, []);

    const history = useNavigate();

    const handleUserClick = user => {
        history(`/user-profile/${user.id}`);
    };

    return (
        <div
            style={{
                marginLeft: "16px",
                backgroundColor: "lighrBlue"
            }}
        >
            <div className="suggestions__container">
                <div className="suggestions__header">
                    <div>Suggestions For You</div>
                </div>
                <div className="suggestions__body">
                    {
                        users.filter((user) => user.id !== uid).map((user, index) =>
                            <div className="suggestions__friends" key={index}
                                onClick={() => {
                                    handleUserClick(user);
                                }}
                            >
                                <Avatar src={user.imageUrl} className="suggestions__image" />
                                <div className="suggestions__username">{user.username}</div>
                            </div>)
                    }

                </div>
            </div>
        </div>
    );
};

export default Suggestions;
