import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <h2 className='footer-title'>STG Note-Taker</h2>
            <div className='router'>
                <span className='routes'>About</span>
                <span className='routes'>Contact</span>
                <span className='routes'>Support</span>
                <span className='routes'>Terms</span>
                <span className='routes'>Privacy</span>
            </div>
        </div>
    );
};

export default Footer;