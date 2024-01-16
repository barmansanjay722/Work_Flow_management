import React, { useState} from "react";
import CoderHome from "./CoderHome";
import ToDoList from "./ToDoList";
// import CoderAttendancePop from "./CoderAttendancePop";
// import Modal from "react-bootstrap/Modal";
// import { attendingAPI } from "../../services/userService";
// import AuthContext from "../Auth/Middleware/AuthContext";
// import localStorageStore from "../../utils/localStorageStore";
// import Role from "../../utils/role";
import {useLocation} from "react-router-dom";

const Index = () => {
  // const [show, setShow] = useState(localStorage.getItem("attending") == null || localStorage.getItem("attending") === "false" ? true : false);
  // const [showtable, setShowtable] = useState(localStorage.getItem("attending") === "true" ? true : false);
  const [query, setQuery] = useState();
  const [filterForToDOList, setFilterForToDoList] = useState({})
  // const handleClose = () => {
  //   setShow(false);
  // };

  const attendanceProp = false;
  // const { data } = useContext(AuthContext);
  // const navigate = useNavigate();
  const location = useLocation();

  // const markIsAttending = async (isAttending) => {
  //   window.localStorage.setItem("attending", isAttending);
  //   const response = await attendingAPI(isAttending);
  //   if (response?.success === true) {
  //     setShowtable(isAttending);
  //   }
  //   handleClose();
  // };
  
  // const tokenReplaced = localStorage.getItem('tokenReplaced');

  // if(!tokenReplaced){
  //   navigate('/redirect')
  // }
 
  return (
    <>
      {/* {( tokenReplaced && (localStorageStore.getRole() === Role.Coder || localStorageStore.getRole() === Role.Auditor) && 
        <Modal className="welcome-popup" style={{ marginTop: "4rem" }} show={show}>
          {data != null && data !== undefined && <CoderAttendancePop profileData={data} showTable={showtable} markIsAttending={markIsAttending} handleClose={handleClose} />}
        </Modal>
      )} */}

      <CoderHome attendanceProp={attendanceProp} show={location?.state?.show} showtable={location?.state?.showtable} query={query} />
      <ToDoList showtable={location?.state?.showtable} onQuery={setQuery} setFilterForToDoList={setFilterForToDoList} filterForToDOList={filterForToDOList}  />
    </>
  );
};

export default Index;
