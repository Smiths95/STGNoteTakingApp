import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    // Create handleSignout function:
    const handleSignout = () => {
        const token = localStorage.getItem('token');

        axios({
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/logout`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async () => {
            const isTokenExists = await localStorage.getItem('token');
            if(isTokenExists) {
                localStorage.removeItem('token');
                navigate('/');
            }
        });
    };

    // Create handleDeleteAccount function
    const handleDeleteAccount = () => {
        const token = localStorage.getItem('token');

        axios({
            url: `${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/users/delete`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            console.log('User Account deleted');
            localStorage.removeItem('token');
            navigate('/');
        });
    };


    return (
        <div className='navbar'>
            <div className='nav-title'>
                <Link className='nav-title' to='/dashboard'>
                    <h1 className='title-text'>STG Note-Taker</h1>
                </Link>
            </div>
            <div className='nav-routers'>
                <Link className='nav-routers routes' to='/dashboard'>
                    <span className='routes'>Dashboard</span>
                </Link>
            </div>
            <div className='nav-btns'>
                <button className='create-note' onClick={ handleSignout }>Sign Out</button>
                <button className='create-note del-account-btn' onClick={ handleDeleteAccount }>Delete Account</button>
            </div>
        </div>
    )
};

export default Navbar;