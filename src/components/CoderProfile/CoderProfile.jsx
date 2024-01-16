import CoderAttendence from "./CoderAttendance";
import CoderDetails from "./CoderDetails";
import { getUserDetail } from "../../services/userService";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/Middleware/AuthContext";
import {fetchEventsForCalendar} from "../../services/userService"
import localStorageStore from "../../utils/localStorageStore";

const CoderProfile = () => {
  const [coderData, setCoderData] = useState([]);
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);
   const [renderProfileData,setRenderProfileData] = useState(true);
  const [renderLeaveRequest,setRenderLeaveRequest] = useState(true);

  const fetchCalendarEvents = async () => {
    const response = await fetchEventsForCalendar();
    setEvents(response)
  }

  useEffect(() => {
  fetchCalendarEvents();
  }, [renderLeaveRequest])

  useEffect(() => {
    fetchDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderProfileData, authContext.imageUrl]);

  const fetchDetail = async () => {
    var response = await getUserDetail(authContext.token);
    const jsonResponse = response.data;
    if(jsonResponse) {
      localStorageStore.setRole(jsonResponse.Role);
      authContext.setRole(jsonResponse.Role);
      if (response.success === true) {
        setCoderData(response.data);
      } 
    }
  };

  const handleProfileData= (response)=>{
    setRenderProfileData(response);
  }

  const handleLeaveRequest = (response)=>{
    setRenderLeaveRequest(response);
  }
  
    return (
    <>
      <div className="d-flex flex-column flex-lg-row">
        <CoderDetails coderData={coderData} handleProfileData={handleProfileData} />
        <CoderAttendence events={events} userId={coderData?.id}  handleLeaveRequest={handleLeaveRequest} />
      </div>
    </>
  );
};
export default CoderProfile;