import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Notes = (props) => {
    let navigate = useNavigate();

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({
        eid: '',
        etitle: '',
        edescription: '',
        etag: ''
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            eid: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    };

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };



    const handleClick = (e) => {
        refClose.current.click();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        props.showAlert('Note updated successfully!', 'success');
    };

/*
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
        </>
    )
    */

    return (
        <>
            <div>
                <Button type="button" ref={ ref } className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </Button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Edit Title</label>
                  <input type="text" className="form-control"  minLength={5} required  id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Edit Description</label>
                  <input type="text" className="form-control"  minLength={5} required  id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Edit Tags</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} className="btn btn-dark">Update Note</button>
            </div>
          </div>
        </div>
      </div>
            <div className='row my-3'>
                    <h2>Your Notes</h2>
                    { notes.length === 0 && 'No Notes to display' }
                    { notes.map((note) => {  
                        return <NoteItem key={ note._id } updateNote={ updateNote } showAlert={ props.showAlert } note={ note } />
                    }) }
            </div>
        </div>
    </>
  )

};

export default Notes;