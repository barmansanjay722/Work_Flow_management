import { axios } from "../../utils/axios";
import managerConstants from "./managerConstants";
import { columnParsers } from "./managerParser";

const managerAPI = {}

managerAPI.getColumns = async() => {
    let jsonData;
  try {
    let res = await axios.get(managerConstants.GET_FILTERS);
    jsonData = res?.data;
    jsonData = columnParsers(jsonData);
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

managerAPI.getReports = async(payload, params, exportFile=false) => {
    let jsonData;
  try {
    let res = await axios.post(managerConstants.GET_REPORTS,payload, {params: params});
    jsonData = res?.data;
    if(!res?.success) {
      window.toastr.error(res?.message);
    }
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}


managerAPI.getAllTemplates = async(payload) => {
    let jsonData;
  try {
    let res = await axios.get(managerConstants.GET_ALL_TEMPLATES);
    jsonData = res?.data;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

managerAPI.getTemplateConfig = async(id) => {
    let jsonData;
  try {
    let res = await axios.get(managerConstants.GET_TEMPLATE_CONFIG.replace("ID",id));
    jsonData = res?.data;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

managerAPI.createReportsTemplate = async(payload) => {
    let jsonData;
  try {
    let res = await axios.post(managerConstants.CREATE_REPORTS_TEMPLATE,payload);
    jsonData = res;
  } catch (e) {
    jsonData = e?.response?.data;
  }
  return jsonData;
}

managerAPI.updateReportsTemplate = async(payload, id) => {
  let jsonData;
  try {
    let res = await axios.put(managerConstants.UPDATE_REPORTS_TEMPLATE.replace("ID",id),payload);
    jsonData = res;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

managerAPI.getFilterOptions = async(payload) => {
  let jsonData;
  try {
    let res = await axios.post(managerConstants.GET_FILTER_OPTIONS, payload);
    jsonData = res;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}




export default managerAPI;