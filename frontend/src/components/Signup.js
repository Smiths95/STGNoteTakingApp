import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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

        const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
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
        <Container className='mt-2'>
            <h2 className='mb-2 text-center'>Create an Account for STG Note-Taker</h2>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' id='name' name='name' onChange={ onChange } aria-describedby='emailHelp' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' id='email' name='email' onChange={ onChange } aria-describedby='emailHelp' />
                    <div id='emailHelp' className='form-text'>We'll never share your email address with anyone.</div>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' id='password' name='password' onChange={ onChange } minLength={ 8 } required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' id='cpassword' name='cpassword' onChange={ onChange } minLength={ 8 } required />
                </Form.Group>
                <Button type='submit' className='primary'>Sign Up</Button>
            </Form>
        </Container>
    );
};

export default Signup;