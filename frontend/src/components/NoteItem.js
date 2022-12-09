import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <Row xs={ 1 } md={ 2 } className="g-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>{ note.title }</Card.Title>
                        <Card.Text>{ note.description }</Card.Text>
                        {/* Clicking on the trashcan icon will call the delete function and pass the note id 
                        of that particular note. We are getting the note id as each and every element(object)
                        represents a card which has its id,t,d,tag*/}
                        <i className="fas fa-trash mx-2"
                            onClick={ () => {
                                deleteNote(note._id);
                                props.showAlert("Deleted succesfully", "success");
                            } }> 
                        </i>
                        <i className="fas fa-edit mx-2"
                            onClick={ () => {
                                updateNote(note);
                            } }>
                        </i>   
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default NoteItem;