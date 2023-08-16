import React, { useState } from 'react';
import "./NavBar.css";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import dp from "../../images/dp6.png"
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import InfoSection from '../InfoSection/InfoSection';

const NavBar = ({dp}) => {
    const [state, setState] = useState({});
    const navigate = useNavigate()
    const _id = localStorage.getItem("uid")
    return (
        <div>
            <div className="navbar__barContent">
                <Grid container>
                    <Grid item xs={2}> </Grid>
                    <Grid item xs={3}>
                        <Title
                            onClick={(e) => {
                                navigate("/")
                            }}
                            className="navbar_logo" level={1}>FoodiFy</Title>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={0} style={{ "display": "flex" }}>
                        
                        {/*<Avatar
                            onClick={() => {
                                navigate(`/profile/${_id}`)
                            }}
                            src={dp ?? config.noDp} className="navbar__img" style={{
                                "cursor": "pointer",
                            }} />**/}
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <InfoSection />
            </div>
        </div>
    );
}

export default NavBar;
