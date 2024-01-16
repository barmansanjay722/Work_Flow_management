import { axios } from "../utils/axios";
const baseUrl = process.env.REACT_APP_API_HOST;

export const reAllocateChart = async (data, worklistId, worklist_no) => {
  let jsonData;
  let postBody = {
    task_reassign: data?.task_reassign,
    assign_to: data?.assign_to,
    worklistId: worklistId,
    worklist_no: worklist_no,
  };

  try {
    let res = await axios.post(`${baseUrl}/worklists/allocate-volume`, postBody);
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
};

export const deleteProjectMembers = async (worklistId, assignee_id) => {
  let jsonData;
  try {
    let res = await axios.delete(`${baseUrl}/worklists/delete-project-member/${worklistId}/${assignee_id}`);
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

export const getProjectMembers = async (worklistId) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/worklists/get-project-members/${worklistId}`);
    jsonData = res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response.data;
    } else {
      jsonData = {};
    }
  }
  return jsonData;
}

export const addNewMembersToProject = async (data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/worklists/addition-project-members`, data);
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


export const allocateChart = async (data, worklistId) => {
  let jsonData;
  let postData = {
    ...data,
    worklistId: Number(worklistId)
  }
  try {
    let res = await axios.post(`${baseUrl}/worklists/assign-charts`, postData);
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
};

export const fetchWorklistRecords = async (data, currentPage, limit, role) => {
  data = { ...data, role: role }
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/worklists/worklist-filter?page=${currentPage}&size=${limit}`, data);
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

export const fetchWorklistRecord = async (worklist_id) => {
  let jsonData;
  try {

    let res = await axios.get(`${baseUrl}/worklists/${worklist_id}`);
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

export const fetchAvailableAllocation = async (worklist_id) => {
  let jsonData;
  try {

    let res = await axios.get(`${baseUrl}/worklists/${worklist_id}/available-allocation-volume`);
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

export const removeProjectMembers = async (WorklistId, assign_id) => {
  let jsonData;
  try {
    let res = await axios.put(`${baseUrl}/worklists/remove-project-members`, {
      WorklistId: WorklistId,
      assignee_id: assign_id,
    });
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

export const fetchWorklistProgress = async (worklist_id) => {
  let jsonData;
  try {

    let res = await axios.get(`${baseUrl}/worklists/${worklist_id}/worklist-chart-progress`);
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

export const fetchAvailableReAllocation = async (worklistId) => {
  let jsonData;
  try {

    let res = await axios.get(`${baseUrl}/worklists/${worklistId}/available-reallocation-volume`);
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

export const checkCoder = async (id, worklistId) => {
  let jsonData;
  try {
    let res;
    res = await axios.get(`${baseUrl}/worklists/check-coder/${id}/${worklistId}`);
    jsonData = res.data;
  } catch (e) { }
  return jsonData;
};

export const addTaskByWorklistId = async (worklistId, data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/worklists/${worklistId}/tasks`, data);
    jsonData = res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response.data;
    } else {
      jsonData = {};
    }
  }
  return jsonData;
}

export const deleteProjectByWorklistId = async (worklistId) => {
  let jsonData;
  try {
    let res = await axios.delete(`${baseUrl}/worklists/${worklistId}`);
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

export const fetchProjectEpicsAndSprints = async (worklist_id) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/worklists/${worklist_id}/epics-sprints`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData;
  }
};

export const addNewEpic = async (data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/epics`, data);
    return res;
  } catch (e) {
    if (e?.response?.data?.error) {
      jsonData = e.response.data.error;
    } else {
      jsonData = e?.response?.data?.message;
    }
    return jsonData;
  }
};

export const updateEpic = async (epic_id, data) => {
  let jsonData;
  try {
    let res = await axios.put(`${baseUrl}/epics/${epic_id}`, data);
    return res;
  } catch (e) {
    if (e?.response?.data?.error) {
      jsonData = e.response.data.error;
    } else {
      jsonData = e?.response?.data?.message;
    }
    return jsonData;
  }
};

export const deleteEpic = async (epic_id) => {
  let jsonData;
  try {
    let res = await axios.delete(`${baseUrl}/epics/${epic_id}`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData;
  }
};

export const fetchEpicAssociatedTasks = async (epic_id, worklist_id) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/epics/${epic_id}/management-tasks?worklist=${worklist_id}`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData
  }
};

export const fetchAllNonAssociatedTasks = async (worklist_id) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/epics/unassociated-tasks?worklist=${worklist_id}`);
      return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData
  }
};

export const addNewSprint = async (data) => {
  let jsonData;
  try {
    let res = await axios.post(`${baseUrl}/sprints`, data);
    return res;
  } catch (e) {
    if (e?.response?.data?.error) {
      jsonData = e.response.data.error;
    } else {
      jsonData = e?.response?.data?.message;
    }
    return jsonData;
  }
};

export const updateSprint = async (sprint_id, data) => {
  let jsonData;
  try {
    let res = await axios.put(`${baseUrl}/sprints/${sprint_id}`, data);
    return res;
  } catch (e) {
    if (e?.response?.data?.error) {
      jsonData = e.response.data.error;
    } else {
      jsonData = e?.response?.data?.message;
    }
    return jsonData;
  }
};

export const deleteSprint = async (sprint_id) => {
  let jsonData;
  try {
    let res = await axios.delete(`${baseUrl}/sprints/${sprint_id}`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData;
  }
};

export const fetchSprintAssociatedTasks = async (sprint_id, worklist_id) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/sprints/${sprint_id}/management-tasks?worklist=${worklist_id}`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData
  }
};

export const fetchAllNonAssociatedSprintTasks = async (worklist_id) => {
  let jsonData;
  try {
    let res = await axios.get(`${baseUrl}/sprints/unassociated-tasks?worklist=${worklist_id}`);
    return res;
  } catch (e) {
    if (e?.response) {
      jsonData = e.response;
    } else {
      jsonData = {};
    }
    return jsonData
  }
};
