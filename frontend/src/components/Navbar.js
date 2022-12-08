import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    let location = useLocation();

    return (
        <Navbar expand='lg' bg='light'>
            <Container fluid>
                <Navbar.Brand>STG Note-Taker</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Item>
                            <Link className={ `nav-link ${location.pathname === '/' ? 'active' : ''}` } aria-current='page' to='/'>HOME</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={ `nav-link ${location.pathname === '/about' ? 'active' : ''}` } to='/about'>ABOUT</Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        {!localStorage.getItem('authToken')
                        ?
                            <Form className='d-flex' role='search'>
                                <Link className='btn btn-primary mx-1' to='/login' role='button'>LOG IN</Link>
                                <Link className='btn btn-primary mx-1' to='/signup' role='button'>SIGN UP</Link>
                            </Form>
                        : 
                            <Button onClick={ handleLogout } className='btn btn-primary mx-1' >LOG OUT</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};

export default Header;