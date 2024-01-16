import React, { useState, useEffect } from "react";
import AddUserModal from "./AddUserModal";
import Swal from "sweetalert2";
import { getPending ,getUserAccess} from "../../../services/managerService";
import CustomPagination from "../ManagerWorkLists/CustomPagination";
import moment from 'moment';

const UserBodyListPending = ({ setInActiveUserCount,masterData, setPendingCount, setActiveUserCount, handleActiveCoder}) => {
  const [showModalBox, setShowModalBox] = useState(false);
  const [pendingValue, setPendingValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [renderPendingList,setRenderPendingList] = useState();
  const [idValue,setIdValue] = useState();
  const [userDetails,setUserDetails] = useState({});
  const [renderAddUser,setRenderAddUser] = useState(true);
  const [renderActiveUser,setRenderActiveUser] = useState(true);
  const [dataPerPage] = useState(10);

  const handleGrantModal = () => {
    setShowModalBox(false);
  };
  
  useEffect(() => {
    fetchPendingData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataPerPage,renderPendingList,renderAddUser,renderActiveUser]);
  
  const fetchPendingData = async () => {
    let response = {};
    response = await getPending(currentPage, dataPerPage);
    setPendingValue(response?.data);
    setPendingCount(response?.data?.count);
    setActiveUserCount(response?.data?.active_count);
    setInActiveUserCount(response?.data?.inactive_count);
  };
  
  function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  }
  
  const handleShowDecline = async (id,type) => {
    Swal.fire({
      text: "Are you sure you want to decline this?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes, decline",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-active-light",
      },
    }).then(async function (result) {
      if(result?.value === true)
      {
         const response = await getUserAccess(id,type);
         setRenderPendingList(response);
         window.toastr.success(response?.message);
        
      }
    });
  };
  
  const handleAddUser = ()=>{
    setRenderAddUser(false);
  }
  
  const handleActiveUser = ()=>{
   setRenderActiveUser(false);
  }
  
  return (
    <>
      <div className="table-responsive">
        <table className="table  align-middle table-row-dashed fs-6 gy-5 gs-7" id="kt_table_users">
          <thead>
            <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
              <th className="min-w-80px">Email</th>
              <th className="min-w-40px">Request Date & Time</th>
              <th className="min-w-80px">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-semibold">
            {pendingValue?.users?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.email}</td>
                <td>{moment(item?.request ,'DD MMM YY, hh:mm a').format('MM/DD/YYYY, hh:mm a')}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-light-primary"
                    onClick={(e) => {
                      setShowModalBox(true)
                      setIdValue(item?.id)
                      setUserDetails({
                        email: item?.email,
                        first_name: item?.first_name,
                        last_name: item?.last_name
                      })
                    }}
                  >
                    Grant
                  </button>
                  <button type="button" className="btn btn-sm btn-light-danger ms-1" title="Decline" onClick={() => handleShowDecline(item?.id,"decline")}>
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingValue?.users?.length === 0  && <div>No Records Found ...</div>}
        {pendingValue?.users?.length !== 0  && <CustomPagination dataPerPage={dataPerPage} totalData={pendingValue?.count} paginate={paginate} currentPage={currentPage} />}   
      </div>
      <AddUserModal masterData={masterData} showModalBox={showModalBox} handleGrantModal={handleGrantModal} idValue={idValue} renderPendingList={renderPendingList} handleAddUser={handleAddUser} handleActiveUser={handleActiveUser} handleActiveCoder={handleActiveCoder} userDetails={userDetails} />
    </>
  );
};
export default UserBodyListPending;
