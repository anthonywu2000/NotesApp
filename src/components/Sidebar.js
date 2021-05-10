function Sidebar({ notes, addNotes, deleteNotes, activeNote, setActiveNote }) {

    let sortedNotes = notes.sort((x, y) => y.noteLastModified - x.noteLastModified); // sort from most recent to the oldest modified note

    return <div className = "app-sidebar">
        <div className = "app-sidebar-header">
            <h1>NOTES</h1>
            <button onClick = {addNotes}>ADD</button> {/* adding a note to list of notes */}
        </div>

        {/* Notes being looped through to create individual note via map function */}
        <div className = "app-sidebar-notes">
            {/* If the selected note is the same as the current activeNote, then we highlight the note in blue (active)
             activeNote is treated as the ID of currently selected note*/}
            {sortedNotes.map((note) => (
                <div
                    className = {`app-sidebar-note ${note.noteID === activeNote && "active"}`}
                    onClick={() => setActiveNote(note.noteID)}>
                    <div className = "sidebar-note-title">
                        <strong>{note.noteTitle}</strong>
                        <button onClick = {() => deleteNotes(note.noteID)}>DELETE</button>
                    </div>
                    {/* If the notes' body is not empty, then display the first 120 characters with ... */}
                    <p>{note.noteBody && note.noteBody.slice(0, 121) + "..."}</p>
                    <small className = "note-meta">Last Modified {new Date(note.noteLastModified)
                        .toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })}</small>
                </div>
            ))}

        </div>
    </div>
}

export default Sidebar;
