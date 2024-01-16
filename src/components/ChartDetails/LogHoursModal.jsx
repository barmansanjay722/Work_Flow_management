import { Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { addLogHours, updateLogHours } from "../../services/chartService";
import { useState } from "react";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function LogHoursModal({ showModalBox, setShowModalBox, setSuccess, success, handleModalClose, modalValues }) {
  const [hours, setHours] = useState(modalValues.hours);
  const [logDate, setLogDate] = useState(modalValues.date);
  const [logDescription, setLogDescription] = useState(modalValues.description);

  const handleLogHoursSave = (e) => {
    e.preventDefault();
    if (modalValues.modal_type === "add") {
      addLogHours(modalValues.task_id, { hours: hours, date: logDate, description: logDescription }).then((res) => {
        if (res?.success === true) {
          window.toastr.success(res?.message);
          setSuccess(!success);
          setShowModalBox(false);
        } else {
          window.toastr.error(res?.message);
        }
      });
    }
    if (modalValues.modal_type === "update") {
      updateLogHours(modalValues.task_id, modalValues.id, { hours: hours, date: logDate, description: logDescription }).then((res) => {
        if (res?.success === true) {
          window.toastr.success(res?.message);
          setSuccess(!success);
          setShowModalBox(false);
        } else {
          window.toastr.error(res?.message);
        }
      });
    }
  };

  return (
    <Modal show={showModalBox} centered>
      <Modal.Body className="modal-body scroll-y mb-5">
        <div id="location">
          <div className="applicant-fileds">
            <div className="form-group">
              <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-2">
                  <label className="form-label mb-2">Log hours for this task</label>
                  <div className="card-body p-2">
                    <div className="card-body d-flex flex-column pb-0">
                      <div className="d-flex flex-column gap-5 gap-md-7">
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-6">
                            <label className="form-label">Task #</label>
                            <input className="form-control" name="task_no" defaultValue={modalValues?.task_no} disabled autoComplete="off" />
                          </div>
                          <div className="col-xl-6 col-lg-6 col-6">
                            <label className="form-label">Assignee</label>
                            <input className="form-control" autoComplete="off" defaultValue={modalValues?.assignee_name} name="assignee_name" disabled />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-6">
                            <OverlayTrigger placement={"top"} overlay={<Tooltip> Formats supported: 02:30, 2h30m, 2h, 30m, 2.5 </Tooltip>}>
                              <label className="required form-label">Log Hours <i className="fas fa-exclamation-circle ms-1 fs-6"></i></label>
                            </OverlayTrigger>
                            <input
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              defaultValue={hours ?? "01:00"}
                              onChange={(e) => {
                                e.preventDefault();
                                setHours(e.target.value);
                              }}
                              name="log_hours"
                              placeholder="HH:MM"
                              disabled={modalValues.modal_type === "view" ? true : false}
                            />
                          </div>
                          <div className="col-xl-6 col-lg-6 col-6">
                            <label className="required form-label">Log Date</label>
                            <Flatpickr
                              className="form-control"
                              options={{ dateFormat: "d-m-Y", animate: true }}
                              value={logDate}
                              name="start_date"
                              onChange={(e) => {
                                setLogDate(moment(e[0]).format("DD-MM-YYYY"));
                              }}
                              disabled={modalValues.modal_type === "view" ? true : false}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-12">
                            <label className="form-label">Log Description</label>
                            <textarea
                              autoComplete="off"
                              className="form-control"
                              name="log_description"
                              defaultValue={logDescription ?? ""}
                              onChange={(e) => {
                                e.preventDefault();
                                setLogDescription(e.target.value);
                              }}
                              disabled={modalValues.modal_type === "view" ? true : false}
                              placeholder="Type your description here..."
                            />
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
        <div className="text-center pt-8 mt-10">
          <button type="reset" className="btn btn-light me-3 btn-active-light-primary" onClick={modalValues.modal_type === "view" ? () => setShowModalBox(false) : handleModalClose}>
            {modalValues.modal_type === "view" ? "Close" : "Cancel"}
          </button>
          {modalValues.modal_type !== 'view' ? (<button className="btn btn-primary me-4" type="button" onClick={modalValues.modal_type === "view" ? null : handleLogHoursSave} disabled={modalValues.modal_type === "view" ? true : false}>
            <span>Save</span>
          </button>) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LogHoursModal;
