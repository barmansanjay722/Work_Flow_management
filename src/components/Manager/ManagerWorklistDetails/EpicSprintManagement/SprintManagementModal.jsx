import React from "react";
import Swal from "sweetalert2";
import { Container, Modal } from "react-bootstrap";
import { deleteSprint } from "../../../../services/managerWorkListService";
import moment from "moment";
import localStorageStore from "../../../../utils/localStorageStore";
import role from "../../../../utils/role";

function SprintManagementModal({ sprints, success, setSuccess, showMainModalBox, setShowMainModalBox, setShowSprintDetailsModal, modalValues, setModalValues }) {
  async function handleShowDeleteTask(id) {
    Swal.fire({
      text: "Are you sure you would like to delete this Sprint?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-active-light",
      },
    }).then(async function (result) {
      if (result?.value === true) {
        deleteSprint(id).then((res) => {
          if (res?.success === true) {
            window.toastr.success(res?.message);
            setSuccess(!success);
          } else {
            window.toastr.error(res?.message);
          }
        });
      }
    });
  }

  const handleSprintUpdateClick = (e, item) => {
    e.preventDefault();
    setModalValues({
      ...modalValues,
      id: item?.value,
      name: item?.label ?? "",
      description: item?.description ?? "",
      duration: item?.duration ?? "",
      startDate: moment(item?.start_date).format('DD/MM/YYYY'),
      endDate: moment(item?.end_date).format('DD/MM/YYYY'),
      sprint_owner: {
        label: `${item?.owner_fname ?? ""} ${item?.owner_lname ?? ""}`,
        value: item?.owner_id ?? "",
        image: item?.owner_image ?? "",
      },
      modal_type: "update",
    });
    setShowSprintDetailsModal(true);
    setShowMainModalBox(false);
  }

  const handleSprintAddClick = (e) => {
    e.preventDefault();
    setModalValues({ worklist_id: modalValues.worklist_id, modal_type: "add" });
    setShowSprintDetailsModal(true);
    setShowMainModalBox(false);
  }

  const decryptRole = localStorageStore.getRole();

  return (
    <Container>
      <Modal show={showMainModalBox} size="lg" centered>
        <div>
          <div>
            <Modal.Header className="modal-header py-4">
              <h2 className="fw-bold">Sprint Management</h2>
              <Modal.Title
                className="btn btn-icon btn-sm btn-active-icon-primary"
                onClick={() => {
                  setShowMainModalBox(false);
                }}
              >
                <span className="svg-icon svg-icon-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                  </svg>
                </span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body scroll-y my-5">
              <div className="card">
                <div className="table-responsive">
                  <table className="table to-do-table align-middle table-row-dashed fs-6 gy-5 gs-7" id="kt_table_users">
                    <thead>
                      <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
                        <th className="min-w-300px">Sprint Name</th>
                        <th className="min-w-20px">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                      {sprints?.map((item, index) => (
                        <tr key={item.value}>
                          <td>
                            <strong className="text-gray-900">{item?.label}</strong>
                          </td>
                          <td>
                            {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin) && (
                              <>
                                <button className="btn btn-sm btn-icon btn-light-primary" onClick={(e) => handleSprintUpdateClick(e, item)} >
                                  <i className="fas fa-pen" />
                                </button>
                                <button className="btn btn-sm btn-icon btn-light-primary delete-row mobile-delete-row ms-1" onClick={() => handleShowDeleteTask(item?.value)}>
                                  <i className="fa fa-trash" title="Delete Task"></i>
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sprints?.length === 0 && <div className="my-3">No Records Found ...</div>}
                </div>
                <div className="text-left pt-2">
                  <button type="button" className="btn btn-primary" onClick={handleSprintAddClick} >
                    <span className="svg-icon svg-icon-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
                        <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor"></rect>
                      </svg>
                    </span>
                    Add Sprint
                  </button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default SprintManagementModal;
