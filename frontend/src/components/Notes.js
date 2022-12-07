import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: '',
        etitle: '',
        econtent: '',
        etag: ''
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            econtent: currentNote.content,
            etag: currentNote.tag
        });
    };


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.econtent, note.etag);
        refClose.current.click();
        props.showAlert('Note updated successfully!', 'success');
    };

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <AddNote showAlert={ props.showAlert } />
            <button type='button' ref={ ref } className='btn btn-primary d-none' data-bs-toggle='modal' data-bs-target='#exampleModal'>Launch demo modal</button>
            <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>Edit Note</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <form className='my-3'>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Title</label>
                                    <input type='text' className='form-control' id='etitle' name='etitle' aria-describedby='emailHelp' value={ note.etitle } onChange={ onChange } minLength={ 2 } required />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='content' className='form-label'>Content</label>
                                    <input type='text' className='form-control' id='econtent' name='econtent' value={ note.econtent } onChange={ onChange } minLength={ 5 } required />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='tag' className='form-label'>Tags</label>
                                    <input type='text' className='form-control' id='etag' name='etag' value={ note.etag } onChange={ onChange } />
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button ref={ refClose } type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                            <button disabled={ note.etitle.length < 1 || note.econtent.length < 1 } onClick={ handleClick } type='button' className='btn btn-primary'>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='container mx-2'>
                    { notes.length === 0 && 'No notes to display' }
                </div>
                { notes.map((note) => {
                    return <NoteItem key={ note._id } updateNote={ updateNote } showAlert={ props.showAlert } note={ note } />;
                }) }
            </div>
        </>
    )
};

export default Notes;