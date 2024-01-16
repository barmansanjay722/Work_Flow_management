import { axios } from "../utils/axios";
const baseUrl = process.env.REACT_APP_API_HOST;

export const getUserDetail = (authToken = "") => {
  authToken = authToken === "" || authToken == null ? localStorage.getItem("token") : authToken;
  try {
    return fetch(`${baseUrl}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const attendingAPI = (isAttending) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/users/attendances/today?attending=${isAttending}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    mode: "cors",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const requestAccess = (requestBody) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/users/user-access`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const updateNotificationAsRead = (requestBody) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/users/notifications`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};

export const fetchEventsForCalendar = async () => {
  let jsonData;
  try {
    let res;
    res = await axios.get(`${baseUrl}/users/leave-details/me`);
    jsonData = res.data;
  } catch (e) {}
  return jsonData;
};
export const fetchEventsDetailsForCalender = async (user_id,week,year) =>{
  let jsonData;
  try {
    let res;
    res = await axios.get(`${baseUrl}/users/${user_id}/leaves?month=${week}&year=${year}`);
    jsonData = res;
  } catch (e) {}
  return jsonData;
}

export const deactivateUser = async (id) => {
  let jsonData;
  try {
    let res;
    res = await axios.delete(`${baseUrl}/users/${id}`);
    jsonData = res;
  } catch (e) {}
  return jsonData;
};
export const activateUser = async (id,type) => {
  let jsonData;
  try{
   let res ;
   res = await axios.post(`${baseUrl}/users/${id}/${type}`);
   jsonData = res;
  } catch (e) {}   
  return jsonData;
}

export const fetchEventsForCalendarByUser = async (id) => {
  let jsonData;
  try {
    let res;
    res = await axios.get(`${baseUrl}/users/user-leave-details/${id}`);
    jsonData = res.data;
  } catch (e) {}
  return jsonData;
};

