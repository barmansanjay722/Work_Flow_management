import { useNavigate  } from "react-router-dom";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { fetchWorklistRecords } from "../../../services/managerWorkListService";
import CustomPagination from "./CustomPagination";
import { imageIdGenerate } from "../../../utils/custom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

const WorkListTable = ({ parentWorkList, changeParentList, filterList, setWorklistCount, filterPagination, setFilterPagination }) => {
  
  const [postData, setPostData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const navigate = useNavigate();
  const decryptRole = localStorageStore.getRole();
  const handleRedirect = (worklist_no) => {
    navigate(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin ? "/manager-worklist-details" : decryptRole === role.Member ? "/member-worklist-details" : "", { state: { worklist_id: worklist_no } });
  };
 
  useEffect(() => {
    fetchWorklistData(filterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentWorkList, currentPage, dataPerPage, filterList]);
 
  const fetchWorklistData = async () => {
    let response = {};
    if (filterPagination === true) {
      setCurrentPage(1);
      setFilterPagination(false);
    }
    const role = decryptRole
    response = await fetchWorklistRecords(filterList, currentPage, dataPerPage, role);
    setPostData(response?.data);
    changeParentList(false);
    setWorklistCount(response?.data?.totalRecords);
  };
  
  const currentData = postData?.worklistItem?.slice(0, 10);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <>
      <div className="card-body py-4">
        <div className="table-responsive">
          <table className="table to-do-table align-middle table-row-dashed fs-6 gy-5 gs-7" id="kt_table_users">
            <thead>
              <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
                <th className="min-w-40px">Project #</th>
                <th className="min-w-40px">Project Name</th>
                <th className="min-w-40px">Process</th>
                <th className="min-w-70px">Speciality</th>
                <th className="min-w-200px">Allocation %</th>
                <th className="min-w-40px">Start Date</th>
                <th className="min-w-40px">End Date</th>
                <th className="min-w-50px">Created By</th>
                <th className="min-w-40px">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
              {currentData?.map((item, index) => (
                <tr
                  key={item?.id}
                  onClick={(e) => {
                    handleRedirect(item?.id);
                  }}
                >
                  <td>
                    <strong className="text-gray-900">{item?.worklist_no}</strong>
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.ProcessName}</td>
                  <td><div>{(item?.spec_names !== null) && item?.spec_names?.map((response, index) => <span key={response + index} className="badge badge-light-info fw-bold ms-2 mt-2"> {response} <br /></span>)
                  }</div></td>
                  <td>
                    <div className="d-flex align-items-center flex-column mt-3 w-100">
                      <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                        {item?.total_charts_count !== null && (
                          <>
                            <span className="fw-bold fs-6 text-gray-400">{(parseInt(item?.total_charts_count) !==0 ? (100 - (parseInt(item?.unallocated_charts_count) / parseInt(item?.total_charts_count)) * 100) : 0).toFixed(2)}%</span>
                            <span className="fw-semibold fs-6 text-dark">{(parseInt(item?.total_charts_count) !==0 ? ((parseInt(item?.unallocated_charts_count)) / parseInt(item?.total_charts_count)) * 100 : 0).toFixed(2)}% pending</span>
                          </>
                        )}
                      </div>
                      {item?.total_charts_count !== null ? (
                        <div className={(parseInt(item?.total_charts_count) !== 0 ? (parseInt(item?.unallocated_charts_count) / parseInt(item?.total_charts_count)) * 100 : "No Tasks") === 0 ? "h-8px mx-3 w-100 bg-success rounded" : "h-8px mx-3 w-100 bg-light-warning rounded"}>
                          <div className={(parseInt(item?.total_charts_count) !== 0 ? (parseInt(item?.unallocated_charts_count) / parseInt(item?.total_charts_count)) * 100 : "No Tasks") === 0 ? "bg-success rounded h-8px" : "bg-warning rounded h-8px"} role="progressbar" style={(parseInt(item?.total_charts_count) !== 0 ? (parseInt(item?.unallocated_charts_count) / parseInt(item?.total_charts_count)) * 100 : 0) === 0 ? { width: "100%", ariaValuenow: "50", ariaValuemin: "0", ariaValuemax: "100" } : { width: `${parseInt(item?.total_charts_count) !== 0 ? (100 - (parseInt(item?.unallocated_charts_count) / parseInt(item?.total_charts_count)) * 100): 0}%`, ariaValuenow: "50", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                        </div>
                      ) : (
                        <div>---</div>
                      )}
                    </div>
                  </td>
                  <td>{moment(item?.start_date).format("DD-MM-YYYY")}</td>
                  <td>{moment(item?.end_date).format("DD-MM-YYYY")}</td>
                  <td>
                    <div className="symbol-group symbol-hover flex-nowrap">
                        <OverlayTrigger overlay={<Tooltip>{item?.created_by?.full_name}</Tooltip>} key={item?.created_by?.id} placement={"right"} >
                          <div className="symbol symbol-35px symbol-circle user-image" data-kt-initialized="1">
                            <img alt="name" src={item?.created_by?.image_url ?? `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(item?.created_by?.id)}.jpg`} />
                          </div>
                        </OverlayTrigger>
                    </div>
                  </td>
                  <td>{item?.status != null ? <div className={item?.status?.toLowerCase() === "open" ? "badge badge-light-info fw-bold" : item?.status?.toLowerCase() === "closed" ? "badge badge-light-success fw-bold" : "badge badge-light-primary fw-bold"}>{item?.status}</div> : <div>---</div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentData?.length === 0 && <div>No Records Found ...</div>}
          {currentData?.length !== 0 && <CustomPagination dataPerPage={dataPerPage} totalData={postData?.totalRecords} paginate={paginate} currentPage={currentPage} />}
        </div>
      </div>
    </>
  );
};
export default WorkListTable;
