import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CircleAvatar from './CircleAvatar';
import User from '../../model/User'; // assuming the model class is in a file called User.js
import Loading from '../Loading';
import NavBar from '../NavBar/NavBar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const history = useNavigate();
    const id = localStorage.getItem("uid")
    // Fetch user data on mount
    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setMobileNumber(response.data.mobileNumber);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Handle form submit for updating user data
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = new User(user.id, user.username, email, firstName, lastName, user.profilePictureImageUrl, address, mobileNumber);
        axios.put(`http://localhost:8080/api/users/${id}`, updatedUser)
            .then(response => {
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setMobileNumber(response.data.mobileNumber);
                alert('User data updated successfully');
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Handle deleting the user data
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(response => {
                alert('User data deleted successfully');
                history('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Render loading state while waiting for user data
    if (!user) {
        return <Loading/>;
    }

    return (
       <>
       <NavBar/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: 600, marginTop: 50 }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <CircleAvatar imageUrl={user.profilePictureImageUrl} size={100} />
                    </div>
                    <Typography variant="h5" component="h2">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color="textSecondary">
                        {user.email}
                    </Typography>
                    <Typography color="textSecondary">
                        {user.address}
                    </Typography>
                    <Typography color="textSecondary">
                        {user.mobileNumber}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            style={{ marginTop: 10 }}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            style={{ marginTop: 10 }}
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ marginTop: 10 }}
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            style={{ marginTop: 10 }}
                            fullWidth
                        />
                        <TextField
                            label="Mobile Number"
                            value={mobileNumber}
                            onChange={(event) => setMobileNumber(event.target.value)}
                            style={{ marginTop: 10 }}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20 }}
                            fullWidth
                        >
                            Update
                        </Button>
                    </form>
                    <Button
                        onClick={handleDelete}
                        variant="outlined"
                        color="secondary"
                        style={{ marginTop: 20 }}
                        fullWidth
                    >
                        Delete
                    </Button>
                </CardContent>
            </Card>
        </div>
       </>
    );
};

export default Profile;