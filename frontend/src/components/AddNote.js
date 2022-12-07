import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: '',
        content: '',
        tag: ''
    });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.content, note.tag);
        setNote({title: '', content: '', tag: '' });
        props.showAlert(`${note.title} note added successfully!`, 'success');
    };

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>Title</label>
                    <input type='text' className='form-control' value={ note.title } id='title' name='title' aria-describedby='emailHelp' onChange={ onChange } minLength={ 5 } required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='content' className='form-label'>Content</label>
                    <input type='text' className='form-control' value={ note.content } id='content' name='content' onChange={ onChange } minLength={ 5 } required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='tag' className='form-label'>Tags</label>
                    <input type='text' className='form-control' value={ note.tag } id='tag' name='tag' onChange={ onChange } />
                </div>
                <button disabled={ note.title.length < 5 || note.content.length < 5 }
                    type='submit' className='btn btn-primary' onClick={ handleClick } >Add Note</button>
            </form>
        </div>
    );
};


export default AddNote;