import React, {useState} from "react"
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { addNewMembersToProject, deleteProjectMembers } from "../../../services/managerWorkListService";
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

function ProjectMembersModal({ showModalBox, closeProjectMembersModal, user, worklistId, setDependencyForFetchWorklistProgressRerender, dependencyForFetchWorklistProgressRerender, projectMembers, masterData }) {

  const [allUsers, setAllUsers] = useState([]);

  const handleAllUsers = (event) => {
    setAllUsers(event);
  };

  let response

  const saveNewMember = async () => {
    response = await addNewMembersToProject({ usersToSave: allUsers?.map(response => response?.value), worklistId: worklistId });
    setDependencyForFetchWorklistProgressRerender(!dependencyForFetchWorklistProgressRerender)
    if (response?.success === true) {
      setAllUsers([])
    }
  }

  const deleteMembersFromProject = async (worklistId, assignee_id) => {
    await deleteProjectMembers(worklistId, assignee_id);
    setDependencyForFetchWorklistProgressRerender(!dependencyForFetchWorklistProgressRerender)
  };

  const imageIdGenerate = (userId) => {
    let u_id = userId;
    if (u_id > 30) {
      return imageIdGenerate(u_id - 30);
    } else {
      return u_id;
    }
  };

  let allUsersIdFromMasterdata = masterData?.users_all?.map((data) => data?.id)

  let idFromProjectMembers = projectMembers?.map((response) => (response?.id))

  let id_not_present_in_project_members = allUsersIdFromMasterdata?.filter(function(item){
    return !idFromProjectMembers?.includes(item);
  }) ?? [];

  let filteredMasterdataInArray = [];

  for(const id of id_not_present_in_project_members){
    const filteredMasterdata = masterData?.users_all?.filter((item) => item.id === id)
    filteredMasterdataInArray.push(filteredMasterdata[0] ?? {})
    }

    const renderUserId = () => {
      return filteredMasterdataInArray?.map((data) => {
        return {
          label: `${data.name}`,
          value: data.id,
        }
      })
    }

  const decryptRole = localStorageStore.getRole();

  return (
    <>
      <div className="modal fade" id="kt_modal_view_users" tabIndex={-1} aria-hidden="true" >
        <Modal show={showModalBox} centered>
          <Modal.Header className="modal-header py-4">
            {(decryptRole !== role.Member) ? (<h2 className="fw-bold">Add/Remove Members</h2>) : (<h2 className="fw-bold">View Members</h2>)}     
            <Modal.Title className="btn btn-icon btn-sm btn-active-icon-primary" onClick={(e) => { closeProjectMembersModal(); }} >
              <span className="svg-icon svg-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" /> <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" /> </svg>
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body scroll-y mx-5 pt-0 ">
            <div className="text-center d-flex">
            </div>
            {projectMembers?.map((response,index) => <div key = {index}>
              {Object?.keys(response)?.length !== 0 && <div className="mh-375px scroll-y me-n7 pe-7">
                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt={response?.name} src={response?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(response?.id)}.jpg`} />
                    </div>
                    <div className="ms-6">
                      <span className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary" >
                        {response?.first_name} {response?.last_name}
                        <span className={response?.role !== "Admin" ? "badge badge-light fs-8 fw-semibold ms-2" : "badge badge-danger fs-8 fw-semibold ms-2"}>
                          {response?.role}
                        </span>
                      </span>
                      <div className="fw-semibold text-muted">{response?.email}</div>
                    </div>
                  </div>
                  {(decryptRole !== role.Member) && (<div className="d-flex">
                    <div className="text-end">
                      {(decryptRole === "Admin" && response?.role !== "Admin") ? <button className="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row" onClick={() => { deleteMembersFromProject(worklistId, response?.id) }}>
                        <span className="svg-icon svg-icon-1">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x="7.05025" y="15.5356" width={12} height={2} rx={1} transform="rotate(-45 7.05025 15.5356)" fill="currentColor" /> <rect x="8.46447" y="7.05029" width={12} height={2} rx={1} transform="rotate(45 8.46447 7.05029)" fill="currentColor" /> </svg>
                        </span>
                      </button>: (decryptRole === role.Manager && (response?.role === role.Member || response?.role === role.TeamLead)) ? <button className="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row" onClick={() => { deleteMembersFromProject(worklistId, response?.id) }}> <span className="svg-icon svg-icon-1"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x="7.05025" y="15.5356" width={12} height={2} rx={1} transform="rotate(-45 7.05025 15.5356)" fill="currentColor" /> <rect x="8.46447" y="7.05029" width={12} height={2} rx={1} transform="rotate(45 8.46447 7.05029)" fill="currentColor" /> </svg> </span> </button> :
                      (decryptRole === role.TeamLead && response?.role === role.Member) ? <button className="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row" onClick={() => { deleteMembersFromProject(worklistId, response?.id) }}> <span className="svg-icon svg-icon-1"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x="7.05025" y="15.5356" width={12} height={2} rx={1} transform="rotate(-45 7.05025 15.5356)" fill="currentColor" /> <rect x="8.46447" y="7.05029" width={12} height={2} rx={1} transform="rotate(45 8.46447 7.05029)" fill="currentColor" /> </svg> </span> </button> : ""}
                    </div>
                  </div> )}
                </div>
              </div>}
            </div>)}
            {(decryptRole !== role.Member) && (<div className="justify-content-between mt-5">
              <div className="row">
                <div className="col-8">
                 <Select options={renderUserId()} isMulti={true} value={allUsers} menuPosition={'fixed'} onChange={handleAllUsers} />
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-primary" onClick={saveNewMember}>
                    <span className="svg-icon svg-icon-2">
                      </span>Invite</button>
                </div>
              </div>
            </div>)}
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default ProjectMembersModal