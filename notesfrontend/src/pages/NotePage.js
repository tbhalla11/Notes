import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ReactComponent as LeftArrow} from "../assets/arrow-left.svg";


const NotePage = ({history, match}) => {
    const {id} = useParams();

    let [note, setNote] = useState(null);

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        if (id === 'new') return
        let resp = await fetch(`/api/notes/${id}`)
        let data = await resp.json();
        setNote(data)
    }

    let updateNote = async () => {
        await fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
    }

    let handleSubmit = () => {
        if (id !== 'new'&& !note.body){
            deleteNote()
        }else if(id !== 'new'){
            updateNote()
        }else if(id === 'new'){
            createNote()
        }

        window.location.assign("/")
    }

    let deleteNote = async () => {
        await fetch(`/api/notes/${id}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        window.location.assign("/")
    }

    let createNote = async () => {
        await fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
    }

    return (
        <div className="note">
            <div className="notes-header">
                <h3>
                    <LeftArrow onClick={handleSubmit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}> Done </button>
                )}

            </div>
            <textarea value={note?.body} onChange={(e) => setNote({...note, 'body':e.target.value})}></textarea>

        </div>
    )
}

export default NotePage;