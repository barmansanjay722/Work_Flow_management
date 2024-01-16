import React, { useState } from "react";
import AuditorHome from "./AuditorHome";
import ToDoList from "../Coder/ToDoList";
import CoderAttendancePop from "../Coder/CoderAttendancePop";
import Modal from "react-bootstrap/Modal";
import { attendingAPI } from "../../services/userService";
const Index = () => {
  const [show, setShow] = useState(localStorage.getItem("attending") == null ? true : false);
  const [showtable, setShowtable] = useState(localStorage.getItem("attending") === "true" ? true : false);

  const handleClose = () => {
    setShow(false);
  };
  
  const markIsAttending = (isAttending) => {
    window.localStorage.setItem("attending", isAttending);
    setShowtable(isAttending);
    attendingAPI(isAttending);
    handleClose();
  };

  return (
    <>
      <Modal style={{ marginTop: "4rem" }} show={show} className="welcome">
        <CoderAttendancePop showTable={showtable} markIsAttending={markIsAttending} handleClose={handleClose} />
      </Modal>
      <AuditorHome show={show} />
      <ToDoList showtable={showtable} />
    </>
  );
};
export default Index;
