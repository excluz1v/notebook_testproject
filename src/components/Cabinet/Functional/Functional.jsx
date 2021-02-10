import React, { useState } from "react";
import Note from "../Note/Note";
import styles from "./Functional.module.css";
import { updateUser } from "../../../requests";
import { getDate, timeSince } from "../../../date";

export default function Functional(props) {
  const {
    notes,
    userInfo,
    user,
    changeNote,
    handleChangeNote,
    deleteNote,
  } = props;
  const [editMode, setEditMode] = useState(false);

  const [succes, setSucces] = useState("");
  const [errors, setErrors] = useState("");
  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    body: "",
  });
  const refreshNewNote = () => {
    setNewNote({
      id: "",
      title: "",
      body: "",
    });
  };

  const saveNote = () => {
    updateUser(user.sub, userInfo, setSucces, setErrors);
    refreshNewNote();
    // getUserMetadata(getAccessTokenSilently, user, setUserInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevState) => ({
      ...prevState,
      [name]: value,
      id: new Date().toJSON(),
      date: getDate(),
    }));
  };

  return (
    <div className={styles.functional}>
      <div className={styles.inner}>
        {notes
          ? notes.map((el, index) => {
              return (
                <Note
                  changeNote={changeNote}
                  note={el}
                  key={index}
                  saveNote={saveNote}
                  deleteNote={deleteNote}
                  timeSince={timeSince}
                />
              );
            })
          : null}
        {editMode ? (
          <div className={styles.newNote}>
            <input
              type="text"
              value={newNote.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              cols="40"
              rows="5"
              maxLength="200"
              value={newNote.body}
              name="body"
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={() => {
                handleChangeNote(newNote);
                refreshNewNote();
                setEditMode(!editMode);
              }}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <Note>
            <button
              className={styles.inner__create}
              onClick={() => setEditMode(!editMode)}
            ></button>
          </Note>
        )}
      </div>
    </div>
  );
}
