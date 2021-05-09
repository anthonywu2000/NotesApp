import './App.css';
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import {useState, useEffect} from 'react';
import uuid from "react-uuid";

// these are data that are shared between Sidebar and Main
function App() {

    // initial state will be the notes from previous entry OR empty notes if there is no previous entry
    const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.getItem("notes")) : []); // list of notes that can appear in the sidebar (both components need to access it)
    let [ith, setIth] = useState(1); // keep track the untitled note number starting from 1
    const [activeNote, setActiveNote] = useState(false); // note that is being selected for view and edit on Main

    // we want to store the list of notes that are kept into a string of notes via localStorage (side effects)
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    });

    // a note consists of these 4 things
    function addNotes() {
        const newNote = {
            noteID: uuid(),
            noteTitle: "Untitled Note " + ith,
            noteBody: "",
            noteLastModified: Date.now(),
        };

        // add a newNote onto the list of notes
        setNotes([newNote, ...notes]);
        // update index
        setIth(ith += 1);
        setActiveNote(newNote.noteID);
    }

    function deleteNotes(idDelete) {
        if (idDelete === notes[0].noteID && notes.length === 1) { // delete the final note in the list, then refresh the indexing
            setIth(ith = 1);
            setNotes(notes.filter((note) => note.noteID !== idDelete));
        } else if (idDelete === notes[0].noteID) {
            setIth(ith -= 1);
            setNotes(notes.filter((note) => note.noteID !== idDelete));
        } else {
            setNotes(notes.filter((note) => note.noteID !== idDelete));
        }
    }

    // helper function as a prop in order for Main to display all the details of the selected note in preview
    function getActiveNote() {
        return notes.find((note) => note.noteID === activeNote) // this is a note object returned
    }

    // update the note array with the whole new array that has the specific note updated with the current input text values
    function updateNote(updatedNote) {
        const updatedNotesArray = notes.map((note) => {
            if (note.noteID === updatedNote.noteID) {
                return updatedNote;
            }
            return note;
        });

        setNotes(updatedNotesArray);
    }

    return (
      <div className="App">
        <Sidebar
            notes = {notes}
            addNotes = {addNotes}
            deleteNotes = {deleteNotes}
            activeNote = {activeNote}
            setActiveNote = {setActiveNote}
        />
        <Main
            activeNote={getActiveNote()}
            updateNote={updateNote}
        />
      </div>
  );
}

export default App;
