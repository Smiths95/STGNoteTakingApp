import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = () => {
    const [noteList, setNotes] = useState([]);

    const callFn = () => {
        const token = localStorage.getItem('token');

        axios
            .get(`${process.env.REACT_APP_STGNOTETAKINGAPP_BACKEND}/notes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setNotes(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        callFn();
    }, []);

    useEffect(() => {
        callFn();
    }, [setNotes]);

    return (
        <div className='home'>
            <h1 className='home-notes'>Notes</h1>

            <Link to='/create'>
                <button className='add-btn'>+</button>
            </Link>

            { !noteList || (noteList.length === 0 && (<h2 className='no-notes'>No Notes Found</h2>)) }

            <div className='note-list'>
                {noteList && (
                    <div>
                        { ' ' }
                        { noteList.map((note) => (
                            <div className='note'>
                                <div className='note-content'>{ note.content }</div>
                                <Link to={ `/delete/${note._id}` }>
                                    <button className='del-btn'>-</button>
                                </Link>
                            </div>
                        )) }
                        { ' ' }
                    </div>
                ) }
            </div>
        </div>
    );
};

export default Home;