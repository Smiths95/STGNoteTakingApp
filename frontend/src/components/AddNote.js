import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: ''
    });

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Added new note successfully', 'success');
    };

/*
    return (
        <div className='container my-3' style={{ "width": "80%" }}>
            <h2>Add a Note</h2>
            <form>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>Add Title</label>
                    <input type='text' className='form-control' value={ note.title } id='title' name='title' aria-describedby='emailHelp' onChange={ onChange } minLength={ 5 } required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>Add Description</label>
                    <input type='text' className='form-control' value={ note.description } id='description' name='description' onChange={ onChange } minLength={ 5 } required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='tag' className='form-label'>Add Tags</label>
                    <input type='text' className='form-control' value={ note.tag } id='tag' name='tag' onChange={ onChange } />
                </div>
                <button disabled={ note.title.length < 2 || note.description.length < 5 }
                    type='submit' className='btn btn-primary' onClick={ handleClick } >Add Note</button>
            </form>
        </div>
    );
*/

    return (
        <div>
            <div className="container my-3" style={{ "width": "80%" }}>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Add Title</label>
                        {/* we gave the 'name' to our input tag and a function onChange to update the state as we type and gave the value as the state object*/}
                        <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Add Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name="description"  minLength={5} required  onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Add Tags</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<2 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-dark">Add Note</button>
                </form>
            </div>
        </div>
    );
};


export default AddNote;