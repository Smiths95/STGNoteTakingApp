import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Signin.css';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Create handleSignin function:
    const handleSignin = (e) => {
        e.preventDefault();
        const user = { username, password };

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/users/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        }).then((res) => {
            console.log('User logged in');
            const token = res.data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        }).catch((error) => {
            alert('Authentication failed');
            setUsername('');
            setPassword('');
        });
    };

    // Create handleRegister function:
    const handleRegister = (e) => {
        e.preventDefault();
        const user = { username, password };

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/users/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        }).then((res) => {
            console.log('New user created');
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        }).catch((error) => {
            alert(error);
            setUsername('');
            setPassword('');
        });
    };

    return (
        <div className='signin'>
            <h1 className='signin-head'>STG Note-Taker</h1>
            <div className='signin-form'>
                <form>
                    <div className='form-username'>
                        <span className='form-label'>Username</span>
                        <input type='text' className='form-input' required value={ username } onChange={ (e) => { setUsername(e.target.value) } } />
                    </div>
                    <div className='form-password'>
                        <span className='form-label'>Password</span>
                        <input type='password' className='form-input' required value={ password } onChange={ (e) => { setPassword(e.target.value) } } />
                    </div>
                    <div className='form-btns'>
                        <button className='btns' onClick={ handleSignin }>Sign In</button>
                        <button className='btns register-btn' onClick={ handleRegister }>
                            { ' ' }
                            Create Account{ ' ' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;