import ReactMarkdown from "react-markdown";

function Main({ activeNote, updateNote }) { // the activeNote object with 4 properties
    // activeNote is the note object! (see function in App)

    function editNote(key, value) {
        updateNote({
            ...activeNote, // keep what is unchanged in the activeNote object
            [key]: value, // change the values of the keys that are specified in the
            noteLastModified: Date.now(),
        });
    }

    return <div className = "app-main">
        <div className = "app-main-note-edit">
            <input
                type = "text"
                id = "title"
                value = {activeNote ? activeNote.noteTitle : ""}
                onChange = {(e) => editNote("noteTitle", e.target.value)} // change the noteTitle to what is in the input field DOM
                autoFocus
            />
            <textarea
                id = "body"
                placeholder = "Input your text here...."
                value = {activeNote ? activeNote.noteBody : ""}
                onChange = {(e) => editNote("noteBody", e.target.value)} // change the noteBody to what is in the input field DOM
            />
        </div>

        {/* Check this: https://stackoverflow.com/questions/62730044/uncaught-typeerror-cannot-read-property-username-of-undefined */}
        <div className = "app-main-note-preview">
            <div className = "preview-title">
                <h1>{activeNote ? activeNote.noteTitle : ""}</h1>
            </div>
            <ReactMarkdown className = "markdown-preview">
                {activeNote ? activeNote.noteBody : ""}
            </ReactMarkdown>
        </div>
    </div>;
}

export default Main;