import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Signup = (props) => {
    // Set state of input text of form
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });

    // Confirm password
    const [confirmPwd, setConfirmPwd] = useState('');

    // Set variable to redirect pages
    const navigate = useNavigate();

    // POST request to update values of credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password !== credentials.cpassword) {
            setConfirmPwd('Password does not match');
        } else {
            const { name, email, password } = credentials;
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const json = await response.json();
            if(json.success) {
                localStorage.setItem('authToken', json.authToken);
                navigate('/');
                props.showAlert('Account created successfully!', 'success');
            } else {
                props.showAlert('Invalid details', 'danger');
            }
        }
    };

    // To update state of text as user types
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    /*
    return (
        <Container className='mt-3' style={{ width: '70%' }}>
            <h2>Sign Up Here</h2>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' id='name' name='name' onChange={ onChange } aria-describedby='emailHelp' minLength={ 3 } required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' id='email' name='email' onChange={ onChange } aria-describedby='emailHelp' required />
                    <Form.Text id='emailHelp' className='text-muted'>We'll never share your email address with anyone</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' id='password' name='password' onChange={ onChange } minLength={ 8 } autoComplete='off' required />
                    <Form.Text id='emailHelp' className='text-muted'>Password must be at least 8 characters</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' id='cpassword' name='cpassword' onChange={ onChange } minLength={ 8 } autoComplete='off' required />
                    <Form.Text id='confirmPwd' name='confirmPwd' style={{ color: 'red' }}>{ confirmPwd }</Form.Text>
                </Form.Group>
                <Button type='submit' variant='primary'disabled={ credentials.password.length < 8 || credentials.cpassword.length < 8 }>Submit</Button>
            </Form>
        </Container>
    );
    */
   return (
     <div className="container mt-3" style={{ width: "70%" }}>
       <h2>Sign Up here</h2>
       <form onSubmit={handleSubmit}>
         <div className="mb-3">
           <label htmlFor="name" className="form-label">
             Name
           </label>
           <input
             type="text"
             className="form-control"
             id="name"
             name="name"
             onChange={onChange}
             aria-describedby="emailHelp"
             minLength={3}
             required
           />
         </div>
         <div className="mb-3">
           <label htmlFor="email" className="form-label">
             Email address
           </label>
           <input
             type="email"
             className="form-control"
             id="email"
             name="email"
             onChange={onChange}
             aria-describedby="emailHelp"
             required
           />
           <div id="emailHelp" className="form-text">
             We'll never share your email with anyone else.
           </div>
         </div>
         <div className="mb-3">
           <label htmlFor="password" className="form-label">
             Password
           </label>
           <input
             type="password"
             className="form-control"
             onChange={onChange}
             name="password"
             id="password"
             minLength={8}
             required
           />
           <div id="emailHelp" className="form-text">
             Password must be atleast 8 characters
           </div>
         </div>
         <div className="mb-3">
           <label htmlFor="cpassword" className="form-label">
             Confirm Password
           </label>
           <input
             type="password"
             className="form-control"
             onChange={onChange}
             id="cpassword"
             name="cpassword"
             minLength={8}
             required
           />
           <div
             id="confirmPWD"
             name="confirmPwd"
             className="form-text"
             style={{ color: "red" }}
           >
             {confirmPwd}
           </div>
         </div>
         <button
           disabled={
             credentials.password.length < 8 || credentials.cpassword.length < 8
           }
           type="submit"
           className="btn btn-dark"
         >
           Submit
         </button>
       </form>
     </div>
   );
};

export default Signup;