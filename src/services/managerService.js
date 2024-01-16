import { axios } from "../utils/axios";
const baseUrl = process.env.REACT_APP_API_HOST;

export const allocateVol = async (data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/worklists/worklist-volume-addition`, data);
    jsonData = res;
  } catch (e) {
    if (e?.response) {
      if ((e?.response.data.error[0].message).includes("worklist_no")) {
        window.toastr.error("The worklist number has already been used. Please enter a unique number.");
      }
      // window.toastr.error(e?.response.data.error[0].message);
      jsonData = e.response.data;
    } else {
      jsonData = {};
    }
  }
  return jsonData;
};

export const worklistProgressStatus = async () => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/worklists/progress-status`);
    jsonData = res.data;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response.data;
    } else {
      jsonData = {};
    }
  }
  return jsonData;
};

export const fetchMasterOnClientLocation = async (clientID, locationID) => {
  let jsonData;
  try {
    let res;
    if (locationID === "") {
      res = await axios.get(`${baseUrl}/hn-master-data?client=${clientID}`);
    } else {
      res = await axios.get(`${baseUrl}/hn-master-data?client=${clientID}&location=${locationID}`);
    }
    jsonData = res.data;
  } catch (e) {}
  return jsonData;
};

export const getActivityLog = (id) => {
  try {
    return fetch(`${baseUrl}/worklists/${id}/activity-log`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};
export const getUserProfileDetails = (id) => {
  try {
    return fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
export const getActiveUser = (limit,currentPage,data) => {
  try{
    return fetch(`${baseUrl}/users/user-filter?size=${limit}&page=${currentPage}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch(error)
  {
    console.log(error);
  }
};

export const getInActiveUser = (limit,currentPage,data) => {
  try{
    return fetch(`${baseUrl}/users/user-filter?size=${limit}&page=${currentPage}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch(error)
  {
    console.log(error);
  }
};

export const getLeaveRequest = (data) => {
  try{
    return fetch(`${baseUrl}/users/request-leave/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch(error)
  {
    console.log(error);
  }
}
export const UpdateUserProfile = (id,data) => {
  try{
    return fetch(`${baseUrl}/users/edit-user/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch(error)
  {
    console.log(error);
  }
}

export const getPending = (currentPage, limit) => {
  try {
    return fetch(`${baseUrl}/users/pending?page=${currentPage}&size=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};


export const getUserAccess = (id,type,data) => {
  try{
    return fetch(`${baseUrl}/users/user-access-request/${id}/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch(error)
  {
    console.log(error);
  }
};


export const setAddNewClient = async (inpval) => {
  try {
    const response = await fetch(`${baseUrl}/users/client/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(inpval),
    }).then((res) => res.json());
    if (response.success && response.message) {
      localStorage.setItem("isFormDirty", "false");
      window.toastr.success("New client added successfully.");
      return response;
    } else {
      if (response.error) {
        let errors = response.error.map((key) => {
          return key.message ?? key.name;
        });
        window.toastr.options = {
          showDuration: "300",
          hideDuration: "1000",
          timeOut: 5000 + errors.length * 1000,
          extendedTimeOut: "1000",
          preventDuplicates: true,
        };
        window.toastr.error(errors.join("<br>"));
        window.toastr.options = { preventDuplicates: true };
      } else {
        window.toastr.error(response.message ?? "Something went wrong!");
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMasterOnRole = async (roleId) => {
  let jsonData;
  try {
    let res;
    res = await axios.get(`${baseUrl}/hn-master-data?role=${roleId}`);
    jsonData = res.data;
  } catch (e) {}
  return jsonData;
};