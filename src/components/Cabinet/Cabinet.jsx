import React, { useEffect, useState } from "react";
import Functional from "./Functional/Functional";
import UsersInformation from "./UsersInformation/UsersInformation";
import styles from "./cabinet.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import defaultAvatar from "../../images/iconfinder_ninja-simple_479476.svg";
import {
  updateUser,
  getUserMetadata,
  createNewNote,
  filterNote,
} from "../../requests";
import { getDate } from "../../date";

export default function Cabinet() {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState({
    title: "",
    type: "",
    fullName: "",
    avatar: defaultAvatar,
    notes: [],
  });
  useEffect(() => {
    getUserMetadata(getAccessTokenSilently, user, setUserInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeNote = (id, property, value) => {
    let newNotes = userInfo.notes.map((el, index) => {
      if (el.id === id) {
        el[property] = value;
        el["date"] = getDate();
        el["id"] = new Date().toJSON();
        return el;
      }
      return el;
    });
    setUserInfo((prevState) => ({
      ...prevState,
      notes: newNotes,
    }));
  };
  const handleChangeNote = (newNote) => {
    setUserInfo((prevState) => ({
      ...prevState,
      notes: [...prevState.notes, newNote],
    }));
    createNewNote(user.sub, userInfo, newNote);
  };

  const deleteNote = (noteId) => {
    let filteredNotes = userInfo.notes.filter((el) => el.id !== noteId);
    setUserInfo((prevState) => ({
      ...prevState,
      notes: filteredNotes,
    }));
    filterNote(user.sub, userInfo, filteredNotes);
  };

  return (
    <div className={styles.wrapper}>
      <UsersInformation
        user={user}
        userInfo={userInfo}
        handleChange={handleChange}
        logout={logout}
        updateUser={updateUser}
      />
      <Functional
        notes={userInfo.notes}
        user={user}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        changeNote={changeNote}
        handleChangeNote={handleChangeNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}
