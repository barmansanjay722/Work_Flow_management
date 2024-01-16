import { useEffect, useState } from "react";
import WorkListTable from "./WorkListTable";
import WatchListBodyAddVol from "./WatchListBodyAddVol";
import WatchListBodyAddFilter from "./WatchListBodyAddFilter.jsx";
import { getMasterData } from "../../../services/chartService"
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

const WorkListBody = ({onQuery}) => {
  const [masterData, setMasterData] = useState();
  const [parentWorkList, setParentWorkList] = useState(false);
  const [filterList, setFilterList] = useState({});
  const [worklistCount, setWorklistCount] = useState(0)
  const [filterPagination, setFilterPagination] = useState(false)

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    getMasterData()
      .then((response) => {
        setMasterData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterList = (obj) => {
    setFilterList(obj);
  }

  const decryptRole = localStorageStore.getRole();
  
  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-gray-800">Project ({worklistCount})</span>
        </h3>
        <div className="card-toolbar justify-content-end">
        <WatchListBodyAddFilter setFilterPagination ={setFilterPagination} masterData={masterData} handleFilterList={handleFilterList} filterList={filterList} />
        {decryptRole === role.Manager || decryptRole === role.Admin ? <WatchListBodyAddVol changeParentList={setParentWorkList} masterData={masterData} onQuery={onQuery}/> : ""}
        </div>
      </div>
      <WorkListTable setFilterPagination ={setFilterPagination} parentWorkList={parentWorkList} changeParentList={setParentWorkList} filterList={filterList} setWorklistCount={setWorklistCount} filterPagination={filterPagination}/>
    </div>
  );
};
export default WorkListBody;
