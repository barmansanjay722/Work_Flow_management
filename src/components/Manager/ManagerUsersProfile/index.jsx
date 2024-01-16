import CoderAttendence from "../../CoderProfile/CoderAttendance";
import CoderDetails from "../../CoderProfile/CoderDetails";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfileDetails } from "../../../services/managerService";
import { fetchEventsForCalendarByUser } from "../../../services/userService";

const ManagerUsersProfile = () => {
  const [coderData, setCoderData] = useState({});
  const [renderProfileData, setRenderProfileData] = useState(true);
  const [events, setEvents] = useState([]);
  const [renderDeactivateUser,setRenderDeactivateUser] = useState(true);
  const [renderActivateUser,setRenderActivateUser] = useState(true);
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location?.state?.user_id;

  if (location?.state === null) {
    navigate("/manager-userlist");
  }

  useEffect(() => {
    getProfileDetails();  
    fetchCalendarEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderProfileData,renderDeactivateUser,renderActivateUser,location]);

  const fetchCalendarEvents = async () => {
    const response = await fetchEventsForCalendarByUser(user_id);
    setEvents(response);
  };

  useEffect(() => {
    fetchCalendarEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileDetails = async () => {
    const response = await getUserProfileDetails(user_id);
    setCoderData(response?.user_data);
  };

  const handleProfileData = (response) => {
    setRenderProfileData(response );
  };

  const handleDeactiviateUser = () =>{
    setRenderDeactivateUser(false);
    setRenderActivateUser(true);   
  }

  const handleActivateUser = ()=>{
    setRenderActivateUser(false);
    setRenderDeactivateUser(true);    
  } 

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [user_id,coderData?.id]);

  return (
    <>
      <div className="d-flex flex-column flex-lg-row">
        <CoderDetails key={key} coderData={coderData} handleProfileData={handleProfileData} handleDeactiviateUser={handleDeactiviateUser}  handleActivateUser={ handleActivateUser} />
        <CoderAttendence events={events} userId={coderData?.id} role ={coderData?.Role} rollId ={coderData?.RoleId} />
      </div>
    </>
  );
};
export default ManagerUsersProfile;
