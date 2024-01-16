import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import { getMasterData } from "../../services/chartService";
import { userRoleConstants } from "../../utils/constants";
const KanbanModal = ({ handleFilterList, selectedProjectMembers, filterList }) => {
  const [showModalBox, setShowModalBox] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignee, setAssignee] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [estimatedPoint, setEstimatedPoint] = useState("");
  const [masterData, setMasterData] = useState("");
  useEffect(() => {
    fetchMasterData();
  }, []);
  const fetchMasterData = () => {
    getMasterData()
      .then((data) => {
        setMasterData(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderTaskType = () => {
    return masterData?.task_type?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderAssignees = () => {
    return selectedProjectMembers?.map((item) => ({
      label: `${item?.first_name} ${item?.last_name}`,
      value: item?.id,
    }));
  };

  const renderCreatedBy = () => {
    return selectedProjectMembers?.map((item) => {
      const {ADMIN_ID, MANAGER_ID } = userRoleConstants;
      if (item?.role_id === MANAGER_ID) {
        return {
          label: `${item?.first_name} ${item?.last_name}`,
          value: item?.id,
        };
      } else if (item?.role_id === ADMIN_ID) {
        return {
          label: `${item?.first_name} ${item?.last_name}`,
          value: item?.id,
        };
      }
      return null; // Handle other cases if needed
    }).filter(item => item !== null);   
  };

  const renderEstimatedPoint = () => {
    const estimationPoints = [
      { label: "0", value: "0" },
      { label: "2", value: "2" },
      { label: "4", value: "4" },
      { label: "6", value: "6" },
      { label: "8", value: "8" },
      { label: "10", value: "10" },
      { label: "12", value: "12" },
      { label: "14", value: "14" },
      { label: "16", value: "16" },
    ];

    return estimationPoints;
  };

  const handlestartDate = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setStartDate(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
  };

  const handleCancelstartDate = (event, picker) => {
    picker.element.val("");
    setStartDate("");
  };

  const handleCancelendDate = (event, picker) => {
    picker.element.val("");
    setEndDate("");
  };

  const handleendDate = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setEndDate(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
  };

  const handleSubmitFilter = (type) => {
    let obj = {};
    if (type !== "reset") {
      obj = {
        start_date: startDate,
        end_date: endDate,
        assignee: assignee !== "" ? assignee?.map((item) => item?.value) : "",
        created_by: createdBy !== "" ? createdBy?.map((item) => item?.value) : "",
        estimation: estimatedPoint !== "" ? estimatedPoint?.map((item) => item?.value) : "",
        task_type: taskType !== "" ? taskType?.map((item) => item?.value) : "",
        worklist_id: filterList.worklist_id,
      };
    } else {
      setStartDate([]);
      setEndDate([]);
      setTaskType(null);
      setAssignee(null);
      setCreatedBy(null);
      setEstimatedPoint();
      obj.worklist_id = filterList.worklist_id;
    }
    handleFilterList(obj);
    setShowModalBox(false);
  };

  return (
    <>
      <button type="button" className="btn btn-light-primary me-3 d-flex py-3 mt-7" onClick={(e) => setShowModalBox(true)}>
        <span className="svg-icon svg-icon-2">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {" "}
            <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />{" "}
          </svg>
        </span>
        Filter
      </button>
      {
        <Modal show={showModalBox} size="lg" centered>
          <div>
            <div className="px-0 py-0">
              <Modal.Header className="fs-5 text-dark fw-bold py-4">
                Filter Options
                <Modal.Title className="btn btn-icon btn-sm btn-active-icon-primary" onClick={(e) => setShowModalBox(false)}>
                  <span className="svg-icon svg-icon-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" /> <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                    </svg>
                  </span>
                </Modal.Title>
              </Modal.Header>
              <div className="separator border-gray-200"></div>
              <Modal.Body className="px-7 py-5">
                <div className="row mb-4">
                  <div className="col-lg-4 mb-4">
                    <label className="form-label">Assignee </label>
                    <Select options={renderAssignees()} isMulti={true} onChange={setAssignee} value={assignee} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label">Estimation Points </label>
                    <Select options={renderEstimatedPoint()} isMulti={true} onChange={setEstimatedPoint} value={estimatedPoint} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label">Created By </label>
                    <Select options={renderCreatedBy()} isMulti={true} onChange={setCreatedBy} value={createdBy} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-4 mb-4">
                    <label className="form-label">Task Type </label>
                    <Select options={renderTaskType()} isMulti={true} onChange={setTaskType} value={taskType} />
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label mb-2">
                      <span>Start Date</span>
                    </label>
                    <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }} onApply={handlestartDate} onCancel={handleCancelstartDate}>
                      <input type="text" id="dateRangePickerDateOfService" className="form-control" placeholder="Select Date" defaultValue={startDate} autoComplete="off" />
                    </DateRangePicker>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <label className="form-label mb-2">
                      <span>End Date</span>
                    </label>
                    <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }} onApply={handleendDate} onCancel={handleCancelendDate}>
                      <input type="text" id="dateRangePickerReceiveDate" className="form-control" placeholder="Select Date" defaultValue={endDate} autoComplete="off" />
                    </DateRangePicker>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="reset" onClick={(e) => handleSubmitFilter("reset")} className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">
                    Reset
                  </button>
                  <button type="button" onClick={(e) => handleSubmitFilter("filter")} className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">
                    Filter
                  </button>
                </div>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};

export default KanbanModal;