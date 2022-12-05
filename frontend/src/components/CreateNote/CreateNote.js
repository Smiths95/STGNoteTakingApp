import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNote.css';

const CreateNote = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = { content };

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/notes`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: note
        }).then(() => {
            console.log('New note added');
            navigate('/dashboard');
        });
    };

    return (
        <div className='create-form'>
            <div className='form-content'>
                <form onSubmit={ handleSubmit }>
                    <div className='note-form'>
                        <h3 className='text-head'>Note</h3>
                        <textarea className='note-text' required value={ content } onChange={ (e) => setContent(e.target.value) } />
                    </div>
                    <button className='create-note-btn' onClick={ handleSubmit }>Create Note</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;