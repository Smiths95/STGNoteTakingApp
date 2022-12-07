import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;

        const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert('Account created successfully!', 'success');
        } else {
            props.showAlert('Invalid details', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container mt-2'>
            <h2 className='mb-2 text-center'>Create an Account for STG Note-Taker</h2>
            <form onSubmit={ handleSubmit }>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' className='form-control' id='name' name='name' onChange={ onChange } aria-describedby='emailHelp' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' id='email' name='email' onChange={ onChange } aria-describedby='emailHelp' />
                    <div id='emailHelp' className='form-text'>We'll never share your email address with anyone.</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' id='password' name='password' onChange={ onChange } minLenght={ 8 } required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='cpassword' className='form-label'>Confirm Password</label>
                    <input type='password' className='form-control' id='cpassword' name='cpassword' onChange={ onChange } minLenght={ 8 } required />
                </div>
                <button type='submit' className='btn btn-primary'>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;