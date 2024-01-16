import React, { useState, useEffect } from "react";
import UserBodyListActivity from "./UserBodyListActivity";
import UserBodyListPending from "./UserBodyListPending";
import UserBodyAddFilter from "./UserBodyAddFilter";
import { getMasterData } from "../../../services/chartService";
// import UserBodyListInactive from "./UserBodyListInactive";
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

const UserBody = ({handleActiveCoder}) => {

  const [masterData, setMasterData] = useState();
  const [selectedTab, setSelectedTab] = useState("active");
  const [pendingCount,setPendingCount] = useState(0);
  const [activeUserCount,setActiveUserCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [inActiveUserCount,setInActiveUserCount] = useState(0);
  const [filterList, setFilterList] = useState({});
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

  const handleSelectedTab = async (tabValue) => {
    setSelectedTab(tabValue);
  };

  const handleFilterList = (obj) => {
    setFilterList(obj);
  };

  const decryptRole = localStorageStore.getRole();

  return (
    <div className="card">
      <div className="card priority-card">
        <div className="card-header pt-7 border-bottom-0">
          <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6" role="tablist">
            <li className="nav-item" role="presentation" id="active-tab">
              <a className="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_critical" aria-selected="true" role="tab" onClick={(e) => handleSelectedTab("active")}>
                Active ({activeUserCount})
              </a>
            </li>
            {/* <li className="nav-item" role="presentation" id="inactive-tab">
              <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_inactive" aria-selected="false" role="tab" tabIndex="-1" onClick={(e) => handleSelectedTab("inactive")}>
                Inactive ({inActiveUserCount})
              </a>
            </li> */}
            {(decryptRole === role.Manager || decryptRole === role.Admin) && (
              <li className="nav-item" role="presentation" id="pending-tab">
                <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_pending" aria-selected="false" role="tab" tabIndex="-1" onClick={(e) => handleSelectedTab("pending")}>
                  Pending ({pendingCount})
                </a>
              </li>
            )}
          </ul>
          <div className="d-flex">
            <div className="card-toolbar">
              <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                {selectedTab === "active" && <UserBodyAddFilter masterData={masterData} setFilterPagination={setFilterPagination} filterList={filterList} handleFilterList={handleFilterList} />}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="">
            <div className="separator separator-dashed my-5 mt-0"></div>
            <div className="tab-content" id="myTV4593013ontent">
              <div className="tab-pane fade show active" id="kt_tab_pane_critical" role="tabpanel">
                {selectedTab === "active" && <UserBodyListActivity setInActiveUserCount={setInActiveUserCount} setActiveUserCount={setActiveUserCount} setFilterPagination={setFilterPagination} filterList={filterList} filterPagination={filterPagination} setPendingCount={setPendingCount} />}
              </div>
              {/* <div className="tab-pane fade" id="kt_tab_pane_inactive" role="tabpanel">
                {selectedTab === "inactive" && <UserBodyListInactive setInActiveUserCount={setInActiveUserCount} setActiveUserCount={setActiveUserCount} setFilterPagination={setFilterPagination} filterList={filterList} filterPagination={filterPagination} setPendingCount={setPendingCount} />}
              </div> */}
              {(decryptRole === role.Manager || decryptRole === role.Admin) && (
                <div className="tab-pane fade" id="kt_tab_pane_pending" role="tabpanel">
                  {selectedTab === "pending" && <UserBodyListPending setInActiveUserCount={setInActiveUserCount} masterData={masterData} setPendingCount={setPendingCount} setActiveUserCount={setActiveUserCount} handleActiveCoder={handleActiveCoder} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBody;
