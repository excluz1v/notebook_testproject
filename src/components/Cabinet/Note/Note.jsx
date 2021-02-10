import React, { useState } from "react";
import styles from "./note.module.css";

export default function Note(props) {
  const { note, changeNote, saveNote, deleteNote, timeSince } = props;
  const [createMode, setCreateMode] = useState(false);

  let editMode = createMode ? styles.editMode : "";
  return (
    <div className={styles.note + " " + editMode}>
      {note ? (
        <>
          {createMode ? (
            <>
              <input
                className={styles.note__title}
                value={note.title ? note.title : ""}
                onChange={(e) => changeNote(note.id, "title", e.target.value)}
              ></input>
              <textarea
                value={note.body}
                onChange={(e) => changeNote(note.id, "body", e.target.value)}
              ></textarea>
              <div className={styles.button__container}>
                <button
                  className={styles.save}
                  onClick={() => {
                    saveNote();
                    setCreateMode(!createMode);
                  }}
                >
                  Сохранить
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteNote(note.id)}
                ></button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.note__title}>
                {note.title ? note.title : ""}
              </div>
              {note.body && note.body.length > 20 ? (
                <div className={styles.note__body}>
                  {note.body.slice(0, 20)}...{" "}
                </div>
              ) : (
                <div className={styles.note__body}>{note.body} </div>
              )}
              <div className={styles.note__date}>
                {note.date ? note.date : ""}
              </div>
              <div className={styles.note__timeAgo}>{timeSince(note.id)}</div>
              <button
                className={styles.changeButton}
                onClick={() => setCreateMode(!createMode)}
              ></button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteNote(note.id)}
              ></button>
            </>
          )}
        </>
      ) : (
        <div>
          <div className={styles.note__title}>Название</div>
          <div className={styles.note__body}>Описание</div>
          <div className={styles.note__date}></div>
          {props.children}
        </div>
      )}
    </div>
  );
}
