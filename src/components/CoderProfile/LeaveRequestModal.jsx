import { Modal } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useForm } from "react-hook-form";
import { getLeaveRequest } from "../../services/managerService";
import { useState, useEffect } from "react";

const LeaveRequestModal = ({ showModalBox, handleCloseModal, handleLeaveRequest }) => {
  const [leaveFromDate, setLeaveFromDate] = useState("");
  const [leaveToDate, setLeaveToDate] = useState("");
  const [validationFlag, setValidationFlag] = useState(false);
  const [validationFlagDate, setValidationFlagDate] = useState(false);
  const [reasonValue, setReasonValue] = useState("");

  const {
    handleSubmit,
    reset,
  } = useForm();

  const handleRegistration = async (data) => {
    if (leaveFromDate === "" || leaveToDate === "" || leaveFromDate === null || leaveToDate === null || leaveFromDate === undefined || leaveToDate === undefined) {
      setValidationFlag(true);
    } else {
      setValidationFlag(false);
    }

    if (reasonValue === "" || reasonValue === "" || reasonValue === null || reasonValue === null || reasonValue === undefined || reasonValue === undefined) {
      setValidationFlagDate(true);
    } else {
      setValidationFlagDate(false);
    }

    if (reasonValue !== "" && leaveFromDate !== "" && leaveToDate !== "") {
      let obj = {
        reason: reasonValue,
        from_date: leaveFromDate,
        to_date: leaveToDate,
      };

      const response = await getLeaveRequest(obj);
      if (response?.success === true) {
        setLeaveFromDate("");
        setLeaveToDate("");
        setReasonValue("");
        setValidationFlagDate(false);
        setValidationFlag(false);

        handleResetLeaveModal();
        handleLeaveRequest(response);
        window.toastr.success(response?.message);
      } else {
        setLeaveFromDate("");
        setLeaveToDate("");
        setReasonValue("");
        handleResetLeaveModal();
        window.toastr.error(response?.message);
      }
    }
  };

  const handleResetLeaveModal = () => {
    setLeaveFromDate("");
    setLeaveToDate("");
    setReasonValue("");
    setValidationFlagDate(false);
    setValidationFlag(false);
    reset({
      reason: null,
    });
    handleCloseModal();
  };

  const handleEventRenewalDate = (event, picker) => {
    picker.element.val(picker.startDate.format("MM/DD/YYYY") + " - " + picker.endDate.format("MM/DD/YYYY"));
    setLeaveFromDate(picker.startDate.format("YYYY-MM-DD"));
    setLeaveToDate(picker.endDate.format("YYYY-MM-DD"));
  };

  const handleReason = (event) => {
    setReasonValue(event?.target?.value?.trim());
  };

  useEffect(() => {
    console.log("");
  }, [reasonValue]);

  const handleCancel = (event,picker)=>{
    picker.element.val('');
    setLeaveFromDate('');
    setLeaveToDate('');
  }
  return (
    <>
      <Modal className="leave-popup" show={showModalBox}>
        <div>
          <Modal.Header className="modal-header">
            <h2 className="fw-bold">Request a Leave</h2>
            <div
              className="btn btn-icon btn-sm btn-active-icon-primary"
              onClick={(e) => {
                handleResetLeaveModal();
                handleCloseModal();
              }}
            >
              <i className="fas fa-times"></i>
            </div>
          </Modal.Header>
          <div className="modal-body py-5 px-lg-5">
            <form className="mx-5 mx-xl-7 my-7" onSubmit={handleSubmit(handleRegistration)}>
              <div className="row">
                <div className="fv-row mb-7 col-lg-7 col-md-7">
                  <label className="fs-6 fw-semibold mb-2">
                    <span>Date</span>
                  </label>
                  <div className="form-group my-2">
                    <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear" }, showDropdowns: true }} onApply={handleEventRenewalDate} onCancel={handleCancel}>
                      <input type="text" id="dateRangePickerRenewal" className="form-control" />
                    </DateRangePicker>
                    <small className="text-danger">{(leaveFromDate === "" || leaveToDate === "" || leaveFromDate === null || leaveToDate === null || leaveFromDate === undefined || leaveToDate === undefined) && validationFlag && "Required"}</small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="fv-row mb-7 col-lg-12">
                  <label className="fs-6 fw-semibold mb-2">Reason</label>
                  <textarea name="reason" className="form-control" rows={4} defaultValue={""} placeholder="" onChange={handleReason} />
                  <small className="text-danger">{(reasonValue === "" || reasonValue === "" || reasonValue === null || reasonValue === null || reasonValue === undefined || reasonValue === undefined) && validationFlagDate && "Required"}</small>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                <span className="indicator-label">Apply</span>
                <span className="indicator-progress">
                  Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2" />
                </span>
              </button>
              <button type="reset" className="btn btn-light me-3 mx-2" onClick={handleResetLeaveModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default LeaveRequestModal;
