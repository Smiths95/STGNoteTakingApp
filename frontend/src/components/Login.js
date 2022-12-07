import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let navigate = useNavigate;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert('Logged in successfully!', 'success');
        } else {
            props.showAlert('Invalid credentials!', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className='mt-3'>
            <h2 className='mb-4 text-center'>Log in to continue to STG Note-Taker</h2>
            <form onSubmit={ handleSubmit }>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' value={credentials.email} id='email' name='email' onChange={ onChange } aria-describedby='emailHelp' />
                    <div id='emailHelp' className='form-text'>We'll never share your email address with anyone.</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' value={ credentials.password } id='password' name='password' onChange={ onChange } />
                </div>
                <button type='submit' className='btn btn-primary'>Log In</button>
            </form>
        </div>
    );

};


export default Login;