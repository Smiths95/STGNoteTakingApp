import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


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
        <Container className='mt-3'>
            <h2 className='mb-4 text-center'>Log In to Continue to STG Note-Taker</h2>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={ credentials.email } id='email' name='email' onChange={ onChange } />
                    <Form.Text id='emailHelp' className='text-muted'>We'll never share your email address with anyone.</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={ credentials.password } id='password' name='password' onChange={ onChange } />
                </Form.Group>
                <Button type='submit' variant='primary'>Log In</Button>
            </Form>
        </Container>
    );
};


export default Login;