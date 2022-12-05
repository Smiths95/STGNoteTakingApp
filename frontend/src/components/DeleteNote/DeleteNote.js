import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './DeleteNote.css';

const DeleteNote = () => {
    const [noteE, setNote] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    axios({
        url: `${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/notes/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            setNote(res.data.content);
        })
        .catch((error) => {
            console.log(error.message);
        });

    const handleYesDelete = () => {
        axios({
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(navigate('/dashboard'));
    };

    const handleNoDelete = () => {
        navigate('/dashboard');
    };

    return (
        <div className='delete-note'>
            <h2 className='delete-question'>Are you sure you want to delete this note?</h2>
            <div className='delete-note-content'>{ noteE }</div>
            <div className='delete-btns'>
                <button onClick={ handleNoDelete } className='no-delete-button delete-button'>No</button>
                <button onClick={ handleYesDelete } className='yes-delete-button delete-button'>Yes</button>
            </div>
        </div>
    );
};

export default DeleteNote;