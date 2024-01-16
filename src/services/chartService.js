import { axios } from "../utils/axios";

const baseUrl = process.env.REACT_APP_API_HOST;

export const getTodoList = async (priority, limit, currentPage, inpval) => {
  try {
    const response = await fetch(`${baseUrl}/charts?priority=${priority}&page=${currentPage}&size=${limit}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(inpval),
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBasicSearch = async (searchData) => {
  try {
    const response = await fetch(`${baseUrl}/global-search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(searchData),
    }).then((res) => res.json());
    return response;

  } catch (error) {
    console.log(error);
  }
};

export const getAdvancedSearch = async (obj) => {
  try {
    const response = await fetch(`${baseUrl}/global-search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(obj),
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMasterData = () => {
  try {
    return fetch(`${baseUrl}/hn-master-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const getActivityLogData = (id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/activity-log`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const addFilters = async (inpval) => {
  const response = await fetch(`${baseUrl}/charts/filter/data`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(inpval),
  });

  return response;
};

export const getChartDetails = (id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const getChartAuditInfo = (id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/audit-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const saveChartInfo = (id, data, errors, clientData) => {
  try {
    return fetch(`${baseUrl}/charts/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        const targetMessage = "unique_task_no must be unique";
        const messageExists = response?.error?.some((obj) => obj.message === targetMessage);
        if (response.success && response.message) {
          localStorage.setItem('isFormDirty', "false");
          window.toastr.success("Task details saved successfully");
          return true;
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
              preventDuplicates: true
            };
            messageExists ? window.toastr.error("Task number already exists") : window.toastr.error(errors.join("<br>"));
            window.toastr.options = { preventDuplicates: true };
          } else {
            window.toastr.error(response.message ?? "Something went wrong!");
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalTime = (id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/total-time`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const getLogHours = (id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/log-hours`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const addLogHours = (id, data) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/log-hours`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  catch (error) {
    console.log(error);
  }
}

export const updateLogHours = (id, log_id, data) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/log-hours/${log_id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  catch (error) {
    console.log(error);
  }
}

export const deleteLogHours = (id, log_id) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/log-hours/${log_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    }).then((res) => res.json());
  }
  catch (error) {
    console.log(error);
  }
}

export const saveChartAuditInfo = (id, data, clientData) => {
  try {
    return fetch(`${baseUrl}/charts/${id}/audit-info`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
      .then((response) => {
        if (clientData?.MilestoneId === 6) {
          if (response.success && response.message) {
            window.toastr.success("Chart details saved successfully. Please stop the timer.");
            return true;
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
              };
              window.toastr.error(errors.join("<br>"));
              window.toastr.options = {};
            } else {
              window.toastr.error(response.message ?? "Something went wrong!");
            }
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteButton = async (dataForDeleteButton) => {
  try {
    await fetch(`${baseUrl}/users/configurations`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(dataForDeleteButton),
    }).then((res) => res.json())
      .then((response) => {
        if (response.success && response.message) {
          window.toastr.success("Configuration deleted successfully.");
          return true;
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
            };
            window.toastr.error(errors.join("<br>"));
            window.toastr.options = {};
          } else {
            window.toastr.error(response.message ?? "Something went wrong!");
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const reallocateChartToAuditor = (data) => {
  try {
    return fetch(`${baseUrl}/worklists/reallocation-auditor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

export const modifyCharts = (data) => {
  try {
    return fetch(`${baseUrl}/worklists/chart-modification`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);

  }
};

export const selfAllocation = (data) => {
  try {
    return fetch(`${baseUrl}/charts/self-allocation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  catch (error) {
    console.log(error);
  }
}

export const getWatchlistNumber = async (data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/charts/filters/autocomplete`, data);
    jsonData = res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response.data;
    } else {
      jsonData = {};
    }
  }
  return jsonData;
};

export const getAllTask = () => {
  try{
    return fetch(`${baseUrl}/kanban/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  }
  catch(error)
  {
    console.log(error);
  }
  
};

export const updateTaskMilestone = (id,data) => {
  try{
    return fetch(`${baseUrl}/kanban/tasks/${id}`, {
      method: "PUT",
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

export const deleteTaskByTaskId = async(taskId) =>{
  let jsonData;
  try{
    let res = await axios.delete(`${baseUrl}/charts/${taskId}`);
    if (res?.success) {
      window.toastr.success(res.message);
    }
    jsonData = res;
  }catch(e){
    if (e?.response) {
      jsonData = e.response.data;
      window.toastr.error(jsonData.message);
    } else {
      jsonData = {};
    }
  }
  return jsonData; 
}

export const filterWithGetAllTasks = async(postData) =>{
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/kanban/filter`, postData);
    if (res?.success) {
      window.toastr.success(res.message);
    }
    jsonData = res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response.data;

      window.toastr.error(jsonData.message);
    } else {
      jsonData = {};
    }
  }
  return jsonData;
}

export const getProjectList = async() =>{
  try{
    return fetch(`${baseUrl}/kanban/projects-list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  }
  catch(error)
  {
    console.log(error);
  }
}
