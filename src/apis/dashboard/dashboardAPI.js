import { axios } from "../../utils/axios";
import dashboardConstants from "./dashboardConstant";
import { allocatedStatsParser, productivityGraphParser, unallocatedGraphParser } from "./dashboardParser";

const dashboardAPIs = {}

dashboardAPIs.getGraphsProductivity = async (payload) => {
  let jsonData;
  try {
    let res = await axios.post(dashboardConstants.GET_GRAPHS_PRODUCTIVITY, payload);
    jsonData = productivityGraphParser(res)
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}
dashboardAPIs.getGraphsAllocatedStats = async (payload) => {
  let jsonData;
  try {
    let res = await axios.post(dashboardConstants.GET_GRAPHS_ALLOCATED_STATICS, payload);
    // jsonData = res.data
    jsonData = allocatedStatsParser(res)
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}
dashboardAPIs.getUnallocatedGraph = async (payload) => {
  let jsonData;
  try {
    let res = await axios.post(dashboardConstants.GET_UNLOCATED_GRAPH, payload);
    // jsonData = res.data
    jsonData = unallocatedGraphParser(res)
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}
dashboardAPIs.getUserStats = async (payload) => {
  let jsonData;
  try {
    let res = await axios.get(dashboardConstants.GET_USER_STATS);
    jsonData = res.data
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

export default dashboardAPIs;