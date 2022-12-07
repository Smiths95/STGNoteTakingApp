import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'


const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    let location = useLocation();

    return (
        <Navbar bg='light' expand='lg'>
            <Container fluid>
                <Link className='navbar-brand' to='/'>STG Note-Taker</Link>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                        <Link className={ `nav-link ${location.pathname === '/' ? 'active' : ''}` } aria-current='page' to='/'>HOME</Link>
                        <Link className={ `nav-link ${location.pathname === '/about' ? 'active' : ''}` } to='/about'>ABOUT</Link>
                    </Nav>
                    <Nav>
                        {!localStorage.getItem('token') ? <form className='d-flex' role='search'>
                            <Link className='btn btn-primary mx-1' to='/login' role='button'>LOG IN</Link>
                            <Link className='btn btn-primary mx-1' to='/signup' role='button'>SIGN IN</Link>
                        </form>: <button onClick={ handleLogout } className='btn btn-primary mx-1' >LOG OUT</button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;