import { axios } from '../../utils/axios';
import configurationConstants from './configurationConstants';
const configurationAPI = {}

configurationAPI.getLocationList = async (id) => {
  let jsonData;
  try {
    var res = await axios.get(configurationConstants.GET_LOCATIONS.replace(":ID",id));
    jsonData = res?.data;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

configurationAPI.getClientList = async (id) => {
  let jsonData;
  try {
    var res = await axios.get(configurationConstants.GET_CLIENTS.replace(":ID",id));
    jsonData = res?.data;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;

}

configurationAPI.getConfiguration = async (id, locID) => {
  let jsonData;
  try {

    var res = await axios.get(`${configurationConstants.GET_CONFIGURATION}/${id}/${locID}`);
    jsonData = res?.data;
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

configurationAPI.submitConfigurationForm = async (data) => {
  let jsonData;
  try {
    var res = await axios.post(configurationConstants.SAVE_CONFIGURATION, data);
    jsonData = res;
  } catch (e) {
    if(e.response){
      jsonData = e.response.data;
    }else{
    jsonData = {}
    }
  }
  return jsonData ;
}

configurationAPI.submitLocationConfiguration = async (data) => {
  // console.log("id",data);
  let jsonData;
  try {
    var res = await axios.post(configurationConstants.SAVE_LOCATION.replace(":ID",data.client_id), data);
    jsonData = res;
  } catch (e) {
    // console.log("e.respone",e.response);
    if(e.response){
      jsonData = e.response.data;
    }else{
    jsonData = {}
    }
  }
  return jsonData ;

}

export default configurationAPI;





