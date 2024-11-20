import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const onClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added", "Success");
    }

    return (
        <div>
            <h2>Add a Note</h2>
            <div className='container my-3'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInput1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInput2" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={onClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
