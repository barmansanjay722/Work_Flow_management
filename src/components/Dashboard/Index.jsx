import { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";
import dashboardAPIs from "../../apis/dashboard/dashboardAPI";
import managerAPI from "../../apis/manager/managerAPI";
// import Modal from "react-bootstrap/Modal";
// import CoderAttendancePop from "../Coder/CoderAttendancePop";
// import { attendingAPI } from "../../services/userService";
// import AuthContext from "../Auth/Middleware/AuthContext";
const Index = () => {
  const { setProductivityGraph, setFilterOptions, setAllocatedStatsData, setUnallocatedGraph } = useContext(DashboardContext);

  useEffect(() => {
    // fetchUserStats();
    filterOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [productivityLoading, setProductivityLoading] = useState(false);
  const [allocatedLoading, setAllocatedLoading] = useState(false);
  const [unallocatedLoading, setUnallocatedLoading] = useState(false);
  const [globelFiltersValue, setGlobelFiltersValue] = useState({});
  const [allocationFiterValue, setAllocationFilterValue] = useState({});
  const [productivityFiterValue, setProductivityFilterValue] = useState({});
  const [completionIsChecked, setCompletionIsChecked] = useState(false);
  const [filterOptIsLoading, setFilterOptIsLoading] = useState(false);
  // const [show, setShow] = useState(localStorage.getItem("attending") == null || localStorage.getItem("attending") === "false" ? true : false);
  const showtable = localStorage.getItem("attending") === "true" ? true : false;
  // const { data } = useContext(AuthContext);
  const fetchProductivity = async (payload) => {
    try {
      setProductivityLoading(true);
      let res = await dashboardAPIs.getGraphsProductivity(payload);
      setProductivityGraph(res);
      setProductivityLoading(false);
    } catch (e) {
      setProductivityLoading(false);
    }
  };

  const fetchAllocatedStats = async (payload) => {
    try {
      setAllocatedLoading(true);
      let allocatedStats = await dashboardAPIs.getGraphsAllocatedStats(payload);
      setAllocatedStatsData(allocatedStats);
      setAllocatedLoading(false);
    } catch (e) {
      setAllocatedLoading(false);
    }
  };

  const fetchUnallocatedGraph = async (payload) => {
    try {
      setUnallocatedLoading(true);
      let unallocatedData = await dashboardAPIs.getUnallocatedGraph(payload);
      setUnallocatedGraph(unallocatedData);
      setUnallocatedLoading(false);
    } catch (e) {
      setUnallocatedLoading(false);
    }
  };

  const filterOptions = async () => {
    try {
      setFilterOptIsLoading(true);
      let res = await managerAPI.getFilterOptions({ filters: ["hold_reason", "worklist", "loc_name", "spec_name", "coder_name", "auditor_name", "milestone_name", "status_name"] });
      let obj = {};
      if (res && res.success) {
        for (let a in res?.data) {
          obj[a] = res.data[a].map((item) => ({
            label: item.name,
            value: item.id,
          }));
        }
      }
      setFilterOptions(obj);
      setFilterOptIsLoading(false);
    } catch (e) {
      setFilterOptIsLoading(false);
    }
  };

  const handleOnGlobelFilterChange = (val, name) => {
    let filterCopy = { ...globelFiltersValue };
    if (name === "location" || name === "speciality" || name === "auditor" || name === "coder" || name === "milestone" || name === "chart_status" || name === "Worklist") {
      filterCopy[name] = val?.map((item) => {
        return item.value;
      });
    } else {
      filterCopy[name] = val;
    }
    setGlobelFiltersValue(filterCopy);
  };

  const handleAllocatedFilterChange = (val, name) => {
    let filterCopy = { ...allocationFiterValue };
    if (name === "auditor" || name === "coder" || name === "milestone" || name === "chart_status") {
      filterCopy[name] = val?.map((item) => {
        return item.value;
      });
    } else {
      filterCopy[name] = val;
    }
    setAllocationFilterValue(filterCopy);
  };

  const handleProductivityFilterChange = (val, name) => {
    let filterCopy = { ...productivityFiterValue };
    filterCopy[name] = val?.map((item) => {
      return item.value;
    });
    setProductivityFilterValue(filterCopy);
  };

  const globelFilterClick = async () => {
    try {
      let copy = { ...allocationFiterValue };
      if (completionIsChecked) {
        delete copy.date_of_completion;
      }
      fetchProductivity(globelFiltersValue);
      fetchAllocatedStats({ ...globelFiltersValue, ...copy });
      fetchUnallocatedGraph(globelFiltersValue);
    } catch (e) {}
  };

  const onAllocationFilterClick = () => {
    let copy = { ...allocationFiterValue };
    if (completionIsChecked) {
      copy.date_of_completion = null;
    }
    fetchAllocatedStats({ ...copy, ...globelFiltersValue });
  };

  const onProductivityFilterClick = () => {
    let copy = { ...productivityFiterValue };
    fetchProductivity({ ...copy, ...globelFiltersValue });
  };

  // const fetchUserStats = async () => {
  //   try {
  //     let res = await dashboardAPIs.getUserStats();
  //     setUserStats(res);
  //   } catch (e) {}
  // };

  // const handleClose = () => {
  //   setShow(false);
  // };

  // const markIsAttending = async (isAttending) => {
  //   window.localStorage.setItem("attending", isAttending);
  //   const response = await attendingAPI(isAttending);
  //   if (response?.success === true) {
  //     setShowtable(isAttending);
  //   }
  //   handleClose();
  // };

  return (
    <>
      {/* <Modal className="welcome-popup" style={{ marginTop: "4rem" }} show={show}>
        {data != null && data !== undefined && <CoderAttendancePop profileData={data} showTable={showtable} markIsAttending={markIsAttending} handleClose={handleClose} />}
      </Modal> */}
      <Dashboard filterOptIsLoading={filterOptIsLoading} onProductivityFilterClick={onProductivityFilterClick} handleProductivityFilterChange={handleProductivityFilterChange} setCompletionIsChecked={setCompletionIsChecked} completionIsChecked={completionIsChecked} onAllocationFilterClick={onAllocationFilterClick} allocationFiterValue={allocationFiterValue} handleAllocatedFilterChange={handleAllocatedFilterChange} globelFiltersValue={globelFiltersValue} globelFilterClick={globelFilterClick} productivityLoading={productivityLoading} allocatedLoading={allocatedLoading} unallocatedLoading={unallocatedLoading} handleOnGlobelFilterChange={handleOnGlobelFilterChange} fetchAllocatedStats={fetchAllocatedStats} fetchUnallocatedGraph={fetchUnallocatedGraph} fetchProductivity={fetchProductivity} showtable={showtable} />
    </>
  );
};
export default Index;
