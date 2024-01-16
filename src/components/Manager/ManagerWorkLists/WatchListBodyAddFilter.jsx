/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getWatchlistNumber } from "../../../services/chartService";
import { useLocation, useNavigate } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const WatchListBodyAddFilter = ({ masterData, handleFilterList, setFilterPagination, filterList }) => {

  const navigateStateGlobal = useLocation();
  const navigate = useNavigate();
  const [showModalBox, setShowModalBox] = useState(false);
  const [process, setProcess] = useState("");
  const [specialty, setSpeciality] = useState("");
  const [status, setStatus] = useState("");
  const [worklist, setWorklist] = useState(navigateStateGlobal?.state?.submitData?.worklistId);
  const [dateOfService, setDateOfService] = useState(navigateStateGlobal?.state?.submitData?.date_of_service ?? "");
  const [receivedDate, setReceivedDate] = useState(navigateStateGlobal?.state?.submitData?.receivedDate ?? "");
  const isLoading = false;
  const ignoreDiacritics = true;
  const [optionsWorklist, setOptionsWorklist] = useState([]);
  const [globalWorklistSearch, setGlobalWorklistSearch] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const typeAheadRef = useRef(null);

  const renderProcess = () => {
    return masterData?.processes?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderSpecialties = () => {
    return masterData?.specialties?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderStatus = () => {
    return masterData?.worklist_statuses?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const handleSearchWorkList = async (query) => {
    let postData = {
      worklist: query,
    };
    const items = await getWatchlistNumber(postData);
    const workList = items?.data?.typeaheadWorkListRecord;
    setOptionsWorklist(workList);
  };

  const handleSubmitFilter = (type, globalTriggering = false) => {
    let obj = {};
    if (type !== "reset") {
      obj = {
        start_date: dateOfService,
        end_date: receivedDate,
        worklistId: worklist !== "" && worklist !== undefined ? (worklist.length !==0 ? worklist.toString() : "") : "",
        StatusId: status !== "" ? status?.map((item) => item.value) : "",
        ProcessId: process !== "" ? process?.map((item) => item.value) : "",
        SpecialtyId: specialty !== "" ? specialty?.map((item) => item.value) : "",
      };
      if (globalTriggering) {
        if (globalWorklistSearch.hasOwnProperty('dateOfService') && obj.date_of_service === '' && !resetForm) { obj.date_of_service = globalWorklistSearch.dateOfService }
        if (globalWorklistSearch.hasOwnProperty('receivedDate') && obj.received_date === '' && !resetForm) { obj.received_date = globalWorklistSearch.receivedDate }
        if (globalWorklistSearch.hasOwnProperty('worklistId') && obj.worklistId === '' && !resetForm) { obj.worklistId = globalWorklistSearch.worklistId }
      }
    } else {
      setReceivedDate([]);
      setDateOfService([]);
      setStatus(null);
      setSpeciality(null);
      setProcess(null);
      typeAheadRef.current.clear();
      setWorklist("");
      setResetForm(true);
      navigate("/manager-worklist", { state: {} })
    }
    handleFilterList(obj);
    setShowModalBox(false);
    setFilterPagination(true);
  };

  useEffect(() => {
    if (worklist?.length) {
      handleSearchWorkList(worklist)
    }
  }, [filterList])

  useEffect(() => {
    if (!resetForm) {
      setGlobalWorklistSearch({
        dateOfService: navigateStateGlobal?.state?.submitData?.start_date ?? "",
        receivedDate: navigateStateGlobal?.state?.submitData?.end_date ?? "",
        worklistId: navigateStateGlobal?.state?.submitData?.worklistId ?? ""
      });
      setDateOfService(navigateStateGlobal?.state?.submitData?.start_date ?? "");
      setReceivedDate(navigateStateGlobal?.state?.submitData?.end_date ?? "");
      setWorklist(navigateStateGlobal?.state?.submitData?.worklistId ?? "");
    } else {
      setResetForm(false)
    }
  }, [navigateStateGlobal])

  useEffect(() => {
    handleSubmitFilter("submit", true)
  }, [globalWorklistSearch])

  const handleEventDateOfService = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setDateOfService(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
  };

  const handleEventReceiveDate = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setReceivedDate(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
  };
  const handleCancelDateOfService = (event, picker) => {
    picker.element.val("");
    setDateOfService("");
  };
  const handleCancelReceiveDate = (event, picker) => {
    picker.element.val("");
    setReceivedDate("");
  };

  const handleInputChange = (input) => {
    if (input === '') {
      setWorklist('');
    }
  };

  return (
    <>
      <button type="button" className="btn btn-light-primary me-3" onClick={(e) => setShowModalBox(true)}>
        <span className="svg-icon svg-icon-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" /> </svg>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" /> <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" /> </svg>
                  </span>
                </Modal.Title>
              </Modal.Header>
            </div>
            <div className="separator border-gray-200"></div>
            <Modal.Body className="px-7 py-5">
              <div className="row mb-4">
                <div className="col-lg-4 col-md-6 mb-4">
                  <label className="form-label">Project</label>
                  <AsyncTypeahead
                    filterBy={() => true}
                    isLoading={isLoading}
                    id="worklistdata"
                    placeholder="..."
                    ignoreDiacritics={ignoreDiacritics}
                    labelKey="worklist_no"
                    options={optionsWorklist}
                    value={worklist}
                    defaultInputValue={Array.isArray(worklist) ? worklist.join(', ') : ''}
                    minLength={1}
                    onSearch={handleSearchWorkList}
                    onInputChange={handleInputChange}
                    renderMenuItemChildren={(option) => (
                      <>
                        <span>{option?.name} ( {option.worklist_no} )</span>
                      </>
                    )}
                    ref={typeAheadRef}
                    onChange={(selected) => {
                      setWorklist([selected[0]?.worklist_no]);
                    }}
                  />
                </div>
                <div className="col-lg-4 col-md-12 mb-4">
                  <label className="form-label">Status </label>
                  <Select options={renderStatus()} isMulti={true} onChange={setStatus} value={status} />
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <label className="form-label">Process </label>
                  <Select options={renderProcess()} isMulti={true} onChange={setProcess} value={process} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-4 col-md-12 mb-4">
                  <label className="form-label">Speciality </label>
                  <Select options={renderSpecialties()} isMulti={true} onChange={setSpeciality} value={specialty} />
                </div>
                <div className="col-lg-4 mb-4">
                  <label className="form-label mb-2">
                    <span>Start Date</span>
                  </label>
                  <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }} onApply={handleEventDateOfService} onCancel={handleCancelDateOfService}>
                    <input type="text" id="dateRangePickerDateOfService" className="form-control" placeholder="Select Date" defaultValue={dateOfService} autoComplete="off" />
                  </DateRangePicker>
                </div>
                <div className="col-lg-4 mb-4">
                  <label className="form-label mb-2">
                    <span>End Date</span>
                  </label>
                  <DateRangePicker initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }} onApply={handleEventReceiveDate} onCancel={handleCancelReceiveDate}>
                    <input type="text" id="dateRangePickerReceiveDate" className="form-control" placeholder="Select Date" defaultValue={receivedDate} autoComplete="off" />
                  </DateRangePicker>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="reset" onClick={(e) => handleSubmitFilter("reset")} className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">
                  Reset
                </button>
                <button type="button" onClick={(e) => handleSubmitFilter("submit")} className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">
                  Apply
                </button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      }
    </>
  );
};
export default WatchListBodyAddFilter;
