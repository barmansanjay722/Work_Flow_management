import { Container, Modal } from "react-bootstrap";
import { addNewSprint, updateSprint, fetchSprintAssociatedTasks, fetchAllNonAssociatedSprintTasks, getProjectMembers } from "../../../../services/managerWorkListService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DualListBox from "react-dual-listbox";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { imageIdGenerate } from "../../../../utils/custom";
import moment from "moment";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function SprintDetailsModal({ showModalBox, setShowModalBox, setSuccess, success, modalValues, setShowMainModalBox }) {
  const [name, setName] = useState(modalValues.name);
  const [description, setDescription] = useState(modalValues.description);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sprintOwner, setSprintOwner] = useState(modalValues.sprint_owner);
  const [projectMembers, setProjectMembers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [duration, setDuration] = useState(2);

  const { modal_type } = modalValues;

  const handleDurationChange = (e) => {
    const newDurationValue = parseInt(e.target.value);
    if (!isNaN(newDurationValue) && newDurationValue >= 1 && newDurationValue <= 4) {
      setDuration(newDurationValue);
    }
  };

  const handleStartDateChange = (selectedDates) => {
    const newStartDate = moment(selectedDates[0]);
    setStartDate(newStartDate.format("DD/MM/YYYY"));
    const newEndDate = newStartDate.add(duration, 'weeks').format("DD/MM/YYYY");
    setEndDate(newEndDate);
  };

  useEffect(() => {
    if (modal_type === "add")
      fetchAllNonAssociatedSprintTasks(modalValues?.worklist_id).then((response) => {
        if (response?.success) {
          setOptions(response?.data?.all_tasks);
        } else {
          window.toastr.error(response?.message);
        }
      });
    if (modal_type === "update")
      fetchSprintAssociatedTasks(modalValues?.id, modalValues?.worklist_id).then((response) => {
        if (response?.success) {
          setSelected(response?.data?.associated_tasks);
          setOptions(response?.data?.all_tasks);
        } else {
          window.toastr.error(response?.message);
        }
      });

    getProjectMembers(modalValues?.worklist_id).then((response) => {
      if (response?.success) {
        setProjectMembers(response?.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProjectMembersList = () => {
    return projectMembers?.map((data) => ({
      label: `${data?.first_name} ${data?.last_name}`,
      value: data.id,
      image: data.image_url ?? `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(data?.id)}.jpg`,
    }));
  };

  const handleSprintOwnerChange = (event) => {
    setSprintOwner({
      label: `${event.label}`,
      value: event.value,
      image: event.image,
    });
  };

  const handleSprintDetailsSave = (e) => {
    e.preventDefault();
    if (modal_type === "add") {
      addNewSprint({ name: name, description: description, worklist_id: modalValues.worklist_id, associate_tasks: selected, start_date: startDate, end_date: endDate, sprint_owner: sprintOwner?.value })
        .then((res) => {
          if (res?.success === true) {
            window.toastr.success(res?.message);
            setSuccess(!success);
            setShowModalBox(false);
            setShowMainModalBox(true);
          } else {
            window.toastr.error(res);
          }
        })
        .catch((err) => {
          window.toastr.error(err);
        });
    }
    if (modal_type === "update") {
      updateSprint(modalValues.id, { name: name, description: description, associate_tasks: selected, start_date: startDate, end_date: endDate, sprint_owner: sprintOwner?.value }).then((res) => {
        if (res?.success === true) {
          window.toastr.success(res?.message);
          setSuccess(!success);
          setShowModalBox(false);
          setShowMainModalBox(true);
        } else {
          window.toastr.error(res?.error ?? res?.message ?? res);
        }
      });
    }
  };

  const handleModalCloseWithAlert = () => {
    Swal.fire({
      text: "Are you sure you would like to cancel?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, return",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-active-light",
      },
    })
      .then((result) => {
        if (result.value) {
          setShowModalBox(false);
          setShowMainModalBox(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    e.preventDefault(); 
    setName(e.target.value);
  }

  return (
    <Container>
      <Modal show={showModalBox} size="lg" centered>
        <div>
          <div>
            <Modal.Header className="modal-header py-4">
              <h2 className="fw-semibold">{modal_type === "add" ? "Add New" : modal_type === "update" ? "Update" : "View"} Sprint for this Project</h2>
            </Modal.Header>
            <Modal.Body className="modal-body scroll-y mb-5">
              <div id="location">
                <div className="applicant-fileds">
                  <div className="form-group">
                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                      <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-2">
                        <div className="card-body p-2">
                          <div className="card-body d-flex flex-column pb-0">
                            <div className="d-flex flex-column gap-5 gap-md-7">
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Sprint Name</label>
                                  <input className="form-control" name="name" value={name} autoComplete="off" onChange={handleNameChange}/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Sprint Description</label>
                                  <textarea autoComplete="off" className="form-control" name="description" value={description} onChange={(e) => { setDescription(e.target.value); }} disabled={modalValues.modal_type === "view" ? true : false} placeholder="Type your description here..." />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-6">
                                  <label className="form-label">Sprint Owner</label>
                                  <Select
                                    id="sprint_owner"
                                    name="sprint_owner"
                                    isMulti={false}
                                    options={renderProjectMembersList()}
                                    value={sprintOwner}
                                    onChange={handleSprintOwnerChange}
                                    formatOptionLabel={(user) => (
                                      <div value={user?.value}>
                                        <img width="30" height="30" style={{ borderRadius: "50%", marginRight: "10px" }} src={user.value ? (user?.image !== ""  ? user.image : `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(user?.value)}.jpg`) : `${process.env.PUBLIC_URL}/assets/media/avatars/blank.png`} alt="user.img" />
                                        <span className="fw-semibold">{user.value ? user?.label ?? "" : "Unassigned"}</span>
                                      </div>
                                    )}
                                  />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6">
                                <OverlayTrigger placement={"top"} overlay={<Tooltip>Possible values: 1 to 4</Tooltip>}>
                                  <label className="form-label">Duration(weeks) <i className="fas fa-exclamation-circle ms-1 fs-6"></i></label>
                                </OverlayTrigger>
                                  <input className="form-control" name="duration" type="number" min="1" max="4" value={duration} autoComplete="off" onChange={handleDurationChange} defaultValue="2"/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-6">
                                  <label className="form-label">Start Date</label>
                                  <Flatpickr className="form-control" options={{ dateFormat: "d/m/Y" }} value={startDate ?? ""} name="startDate" onChange={handleStartDateChange} required />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6">
                                  <label className="form-label">End Date</label>
                                  <Flatpickr className="form-control" options={{ dateFormat: "d/m/Y", minDate: startDate,allowInput: false }} value={endDate ?? ""} name="endDate" required readOnly/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Associate Tasks with this Sprint</label>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <DualListBox options={options} selected={selected} onChange={(value) => setSelected(value)} canFilter />
                                  <p className="fw-3 mt-3">Note: Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-8 mt-6">
                <button
                  type="reset"
                  className="btn btn-light me-3 btn-active-light-primary"
                  onClick={
                    modalValues.modal_type === "view"
                      ? () => {
                          setShowModalBox(false);
                          setShowMainModalBox(true);
                        }
                      : handleModalCloseWithAlert
                  }
                >
                  {modalValues.modal_type === "view" ? "Close" : "Cancel"}
                </button>
                <button className="btn btn-primary me-4" type="button" onClick={modalValues.modal_type === "view" ? null : handleSprintDetailsSave} disabled={modalValues.modal_type === "view" ? true : false}>
                  <span>Save</span>
                </button>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default SprintDetailsModal;
