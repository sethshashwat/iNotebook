import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="container d-flex align-items-center">
                        <h5 className="card-title">{props.note.title}</h5>
                        <FontAwesomeIcon icon={faPenToSquare} className='card-text mx-3' onClick={() => { updateNote(note) }} />
                        <FontAwesomeIcon icon={faTrash} className='card-text mx-3' onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted", "Success")}} />
                    </div>
                    <p className="card-text">{props.note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
