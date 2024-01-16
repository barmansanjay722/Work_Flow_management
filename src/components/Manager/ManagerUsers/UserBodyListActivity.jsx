import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActiveUser } from "../../../services/managerService";
import { Link } from "react-router-dom";
import CustomPagination from "../ManagerWorkLists/CustomPagination";

const UserBodyListActivity = ({setInActiveUserCount, setActiveUserCount, setFilterPagination, filterList, filterPagination ,setPendingCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [activeUser, setActiveUser] = useState();

  let response = {};

  async function fetchActiveUser() {
    if (filterPagination === true) {
      setCurrentPage(1);
      setFilterPagination(false);
    }

    response = await getActiveUser(dataPerPage, currentPage, filterList);
    setActiveUser(response?.data);
    setActiveUserCount(response?.data?.totalRecords);
    setPendingCount(response?.data?.pendingUserCount);
    setInActiveUserCount(response?.data?.inactiveUsersCount);
  }

  useEffect(() => {
    fetchActiveUser(filterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    response = getActiveUser(dataPerPage, currentPage, filterList);
  }, [currentPage, dataPerPage, filterList]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const imageIdGenerate = (userId) => {
    let u_id = userId;
    if (u_id > 30) {
      return imageIdGenerate(u_id - 30);
    } else {
      return u_id;
    }
  };
 
  const navigate = useNavigate();
  const handleRedirect = (user_no) => {
    navigate("/manager-users-profile",{ state: { user_id: user_no } });
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle table-row-dashed gy-5 gs-7 dataTable no-footer" id="kt_table_users">
          <thead>
            <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
              <th className="min-w-50px">ID</th>
              <th className="min-w-125px">Name</th>
              <th className="min-w-125px">Role</th>
              <th className="min-w-125px">Speciality</th>
              <th className="min-w-125px">Client</th>
              <th className="min-w-125px">Designation</th>
              <th className="min-w-125px">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-semibold">
            {activeUser?.allUsers?.map((item) => {

              let badgesSpeciality = [];
              let badgesClient = [] ;
              item?.specialty.split(", ").forEach(function (element, i) {
                badgesSpeciality.push(<span key={i} className="badge badge-light mx-1 text-gray-800">{element}</span>);
              });

              item?.client.split(", ").forEach(function (element, i) {
                badgesClient.push(<span key={i} className="badge badge-light mx-1 text-gray-800">{element}</span>);
              });
             return (
              <tr
                style={{ cursor: "pointer" }}
                key={item?.id}
                onClick={(e) => {
                  handleRedirect(item?.id);
                }}
              >
                <td>{item?.employee_id}</td>
                <td className="d-flex align-items-center">
                  <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                    <div className="symbol-label">
                      <img alt={item?.first_name} title={item?.first_name} src={item?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.id)}.jpg`} className="w-100" />
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <Link to="" className="text-gray-800 text-hover-primary mb-1">
                      {item?.first_name} {item?.last_name}
                    </Link>
                    <span>{item?.email}</span>
                  </div>
                </td>
                <td>{item?.role}</td>
                <td>{badgesSpeciality}</td>
                <td>{badgesClient}</td>
                <td>{item?.designation}</td>
                <td>
                  <div className={item?.status === "Attending" ? "badge badge-light-success fw-bold" : "badge badge-light-danger fw-bold"}>{item?.status}</div>
                </td>
              </tr>
             );
            })}
          </tbody>
        </table>
        {activeUser?.allUsers?.length === 0 && <div>No Records Found ...</div>}
        {activeUser?.allUsers?.length !== 0 && <CustomPagination dataPerPage={dataPerPage} totalData={activeUser?.totalRecords} paginate={paginate} currentPage={currentPage} />}
      </div>
    </>
  );
};
export default UserBodyListActivity;
