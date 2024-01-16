import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import WorklistModal from "./WorklistModal";
import { fetchWorklistProgress, fetchWorklistRecord } from "../../../services/managerWorkListService";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import EpicSprintIndex from "./EpicSprintManagement/Index";
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";


function WorklistDetailsActivity({ setChangeInWorklist, worklistId, masterData, parentDetails, worklist, changeInWorklist,dependencyForFetchWorklistProgressRerender }) {
  const [showModalBox, setShowModalBox] = useState(false);
  const [worklistRows, setWorklistRows] = useState([]);
  const [parentWorklist, setParentWorklist] = useState(false);
  const [currenTab, setCurrentTab] = useState("details");
  const [rangeWorklist, setRangeWorklist] = useState();
  const [worklistRecord,setWorklistRecord] = useState();
  const location = useLocation();

  const handleActivityModal = () => {
    setShowModalBox(false);
  };

  useEffect(() => {
    fetchRecordForProjectDetailsPage(worklistId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchWorklistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentWorklist, parentDetails, location]);

  const fetchWorklistData = async () => {
    const res = await fetchWorklistProgress(worklistId);
    if(Array.isArray(res)) {
      setWorklistRows(res);
    }
  };

  const fetchRecordForProjectDetailsPage = async () => {
    const res = await fetchWorklistRecord(worklistId);
    setWorklistRecord(res);
  }

  const handleParentWorklist = () => {
    if (parentWorklist === false) {
      setParentWorklist(true);
    } else if (parentWorklist === true) {
      setParentWorklist(false);
    }
  };

  const imageIdGenerate = (userId) => {
    let u_id = userId;
    if (u_id > 30) {
      return imageIdGenerate(u_id - 30);
    } else {
      return u_id;
    }
  };
  
  let user = worklistRows?.map(response => response?.users?.map((response_user) => (response_user)))

 if(user){
  user = user[0] ?? null;
  const seenIds = {};
  user = user?.filter((item) => {
   if (!seenIds[item?.id]) {
     seenIds[item?.id] = true;
     return true;
   }
   return false;
 });}

  useEffect(() => {
    fetchRecordForProjectDetailsPage(worklistId)
    fetchWorklistData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyForFetchWorklistProgressRerender]);

  const decryptRole = localStorageStore.getRole();

  return (
    <>
      <div className="col-xl-7">
        <div className="card priority-card pt-4 mb-6 mb-xl-9">
          <div className="card-header border-0 pb-2">
            <ul className="nav nav-tabs nav-line-tabs mb-0 fs-6" role="tablist">
              <li className="nav-item" role="presentation">
                <Link className="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab" onClick={(e) => setCurrentTab("details")}>
                  Details
                </Link>
              </li>
            </ul>
            {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin) && <EpicSprintIndex worklistId={worklistId}/>}
          </div>
          <div className="card-body p-0 ">
            <div className="separator separator-dashed my-5 mt-0" />
            <div className="tab-content" id="myTV4593013ontent">
              {currenTab === "details" && (
                <div className="tab-pane fade show active" id="kt_tab_pane_details" role="tabpanel">
                  <div className="table-responsive mb-4 mt-0 m-4">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div className="table-responsive">
                        <table className="table chart-detail-table table-rounded mb-5 gs-8 gy-5 table-row-dashed fs-6 mb-0 nowrap dataTable no-footer" id="DataTables_Table_0">
                          <thead>
                            <tr className=" border-bottom fw-bold fs-7 text-uppercase gs-0">
                            <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Ready to  Code : activate to sort column ascending" style={{ width: 62 }}>
                                Status
                              </th>
                              <th className="min-w-175px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Progress : activate to sort column ascending" style={{ width: "179.021px" }}>
                                Progress
                                <OverlayTrigger key={"right"} placement={"top"} overlay={<Tooltip id="tooltip-right">Tasks completed / Total volume * 100</Tooltip>}>
                                  <i className="fas fa-exclamation-circle ms-2 fs-7" />
                                </OverlayTrigger>
                              </th>
                              <th>
                                Total
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Ready to  Code : activate to sort column ascending" style={{ width: 62 }}>
                                Back <br />log
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Coding  Done : activate to sort column ascending" style={{ width: 60 }}>
                                Dev <br />Assigned
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Ready to  Audit : activate to sort column ascending" style={{ width: 62 }}>
                                Dev In <br />Progress
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Audit  Done: activate to sort column ascending" style={{ width: 60 }}>
                                Dev <br /> Complete
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Audit  Done: activate to sort column ascending" style={{ width: 60 }}>
                                QA
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Audit  Done: activate to sort column ascending" style={{ width: 60 }}>
                                Client <br />Review
                              </th>
                              <th className="min-w-60px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Audit  Done: activate to sort column ascending" style={{ width: 60 }}>
                                Done
                              </th>
                               <th className="min-w-90px pb-2 align-middle sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Reallocate: activate to sort column ascending" style={{ width: "107.708px" }}>
                                Reallocate
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 fw-semibold">
                            {worklistRows?.map((item, index) => (
                              <tr key={index} className="odd">
                                <td><span className="fs-4 fw-semibold text-primary d-block"> Allocated</span></td>
                                <td className="align-middle">
                                  <div className="vis-item-overflow">
                                    <div className="vis-item-content" style={{ transform: "translateX(0px)" }}>
                                      <div className="rounded-pill bs-green-light d-flex align-items-center position-relative h-40px w-100 px-5 py-2 overflow-hidden">
                                        <div className="position-absolute rounded-pill d-block start-0 top-0 h-100 z-index-1" style={{ width: `${item?.progress_percentage}%`, backgroundColor: `rgb(0,${220 - item?.progress_percentage},0)` }} />
                                        <div className="d-flex align-items-center position-relative z-index-2">
                                          <div className="symbol-group symbol-hover flex-nowrap me-5">
                                              {user?.map((user, indx) => (
                                                <div key={indx} className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-original-title="" data-kt-initialized={1}>
                                                  <OverlayTrigger overlay={<Tooltip>{user?.name}</Tooltip>} key={"right"} placement={"top"}>
                                                    <>
                                                    {Object?.keys(user)?.length !== 0 && <img alt={user?.name} title={user?.name} src={user?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(user?.id)}.jpg`} />}
                                                    </>
                                                  </OverlayTrigger>
                                                </div>
                                              ))}
                                          </div>
                                        </div>
                                        <div className="d-flex flex-center bg-body rounded-pill fs-7 fw-bolder ms-auto h-100 px-3 position-relative z-index-2">{item?.progress_percentage} %</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">{(worklistRecord?.totalCharts || 0) - (worklistRecord?.unallocatedCharts || 0)}</td>
                                {item?.milestone_counts_allocated?.map((response,index) => (<td className="align-middle" key={index}> {response?.count}</td>))}
                                {(localStorage.getItem("Role") === "Team Lead" || localStorage.getItem("Role") === "Manager" || localStorage.getItem("Role") === "Admin") && <td className="align-middle text-center">
                                    <span onClick={(e) => { setShowModalBox(true); setRangeWorklist(item?.range); }} >
                                      <span className="svg-icon svg-icon-primary svg-icon-2hx" title="Reallocate" style={{ cursor: "pointer" }}>
                                        <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" /> <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" /> <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" /> </svg>
                                      </span>
                                    </span>
                                  {/* )} */}
                                </td>}
                              </tr>
                            ))}
                          </tbody>
                          <tbody className="text-gray-600 fw-semibold">
                            {worklistRows?.map((item, index) => (
                              <tr key={index} className="odd">
                                <td><span className="fs-4 fw-semibold text-info d-block"> Unallocated</span></td>
                                <td className="align-middle">
                                  <div className="vis-item-overflow">
                                    <div className="vis-item-content" style={{ transform: "translateX(0px)" }}>
                                      <div className="rounded-pill bs-green-light d-flex align-items-center position-relative h-40px w-100 p-2 overflow-hidden">
                                        <div className="position-absolute rounded-pill d-block start-0 top-0 h-100 z-index-1"/>
                                        <div className="d-flex align-items-center position-relative z-index-2">
                                          <div className="symbol-group symbol-hover flex-nowrap me-3">
                                              <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-original-title="Amit Kumar (Coder)" data-kt-initialized={1}>
                                                <img alt="Unallocated" title="Unallocated" src="../assets/media/avatars/blank.svg" />
                                              </div>
                                          </div>
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                {worklistRecord?.unallocatedCharts}
                                </td>
                                {item?.milestone_counts_unallocated?.map((response,index) => (<td className="align-middle" key={index}> {response?.count}</td>))}
                                <td className="align-middle text-center">
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start" />
                        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModalBox && <WorklistModal worklist={worklist} changeInWorklist={changeInWorklist} setChangeInWorklist={setChangeInWorklist} worklistId={worklistId} handleActivityModal={handleActivityModal} showModalBox={showModalBox} masterData={masterData} handleParentWorklist={handleParentWorklist} rangeWorklist={rangeWorklist} />}
    </>
  );
}
export default WorklistDetailsActivity;
