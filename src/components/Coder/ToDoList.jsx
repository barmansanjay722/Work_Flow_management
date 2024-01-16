/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getTodoList, getMasterData } from "../../services/chartService";
import "react-calendar/dist/Calendar.css";
import "./coder.css";
import Select from "react-select";
import CustomPagination from "../Manager/ManagerWorkLists/CustomPagination";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getWatchlistNumber } from "../../services/chartService";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { imageIdGenerate } from "../../utils/custom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const ToDoList = ({ showtable = localStorage.getItem('attending') === "true" ? true : false, onQuery, setFilterForToDoList, filterForToDOList }) => {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const [process, setProcess] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [milestone, setMilestone] = useState([]);
  const [taskNameOptions, setTaskNameOptions] = useState([]);
  const [priority, setpriority] = useState("Critical");
  const critical = "Critical";
  const medium = "Medium";
  const low = "Low";
  const high = "High";
  const [chartData, setChartData] = useState([]);
  const [inpval, setInputval] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState({});
  const [dateOfService, setDateOfService] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(false);
  const [coderFilter, setCoderFilter] = useState([]);
  const [defaultSpeciality, setDefaultSpeciality] = useState([]);
  const [defaultMilestone, setDefaultMilestone] = useState([]);
  const [defaultProcess, setDefaultProcess] = useState([]);
  const [defaultChartStatus, setDefaultChartStatus] = useState([]);
  const [serialNumberFrom, setSerialNumberFrom] = useState("");
  const [serialNumberTo, setSerialNumberTo] = useState("");
  const [filObj, setFilObj] = useState({});
  const [filterPagination, setFilterPagination] = useState(false);
  const [selectedOptionWorkList, setSelectedOptionWorkList] = useState([routeLocation?.state?.worklist_number ?? ""]);
  // const [selectedOptionChart, setSelectedOptionsChart] = useState([]);
  const [globalChartSearch, setGlobalChartSearch] = useState({})
  const [resetForm, setResetForm] = useState(false)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLoading = false;
  const ignoreDiacritics = true;
  const typeAheadRefTaskName = useRef(null);
  const typeheadRefTaskNumber = useRef(null);
  const typeAheadRefProject= useRef(null);
  const [taskName, setTaskName] = useState("");
  const [optionsChart, setOptionsChart] = useState([]);
  const [taskNumber,setTaskNumber] = useState("");
  const [optionsWorklist,setOptionsWorklist] = useState([]);


  let filterObj = {};
  const filterSubmit = async (type, globalTriggering = false) => {

    setInputval(() => {
      return {
        ...inpval,
      };
    });

    setLoader(true);
    if (type !== "reset") {
    filterObj = {
      // ...inpval,
      start_date: dateOfService,
      end_date: receivedDate,
      processid: defaultProcess?.length !== 0 ? defaultProcess?.map((item) => item.value) : "",
      specialty: defaultSpeciality?.length !== 0 ? defaultSpeciality?.map((item) => item.value) : "",
      milestone: defaultMilestone?.length !== 0 ? defaultMilestone?.map((item) => item.value) : "",
      latest_coder: coderFilter?.length !== 0 ? coderFilter?.map((item) => item.value) : "",
      chart_status: defaultChartStatus?.length !== 0 ? defaultChartStatus?.map((item) => item.value) : "",
      s_no_from: (serialNumberFrom === "" || serialNumberFrom === undefined) ? routeLocation?.state?.s_no_from : serialNumberFrom,
      s_no_to: (serialNumberTo === "" || serialNumberTo === undefined) ? routeLocation?.state?.s_no_to : serialNumberTo,
      worklist_number: (selectedOptionWorkList?.length === 0) ? routeLocation?.state?.worklist_number : selectedOptionWorkList,
      task_name: taskName,
      chart_no: taskNumber,
    };
    if(globalTriggering) {
    if(globalChartSearch.hasOwnProperty('dateOfService') && filterObj.date_of_service === '' && !resetForm) { filterObj.date_of_service = globalChartSearch.dateOfService }
    if(globalChartSearch.hasOwnProperty('receivedDate') && filterObj.received_date === '' && !resetForm) { filterObj.received_date = globalChartSearch.receivedDate }
    // if(globalChartSearch.hasOwnProperty('dateOfCompletion') && filterObj.completion_date === '' && !resetForm) { filterObj.completion_date = globalChartSearch.dateOfCompletion }
    if(globalChartSearch.hasOwnProperty('selectedOptionChart') && filterObj.chart_no === '' && !resetForm) { filterObj.chart_no = globalChartSearch.selectedOptionChart }
    }
    }else{
      navigate("/", { state: { } });
    }
    setFilObj(filterObj);
    setFilterPagination(true);
    setFilterForToDoList(filterObj);
  };

  const chartListFilterButton = document.querySelector('#chart_list_filter_button')

  const setMenuStaticProperty = (isStatic) => {
    if (!isStatic) {
      setTimeout(
        () => { chartListFilterButton?.setAttribute('data-kt-menu-static', isStatic) }
        , 500)
    } else {
      chartListFilterButton?.setAttribute('data-kt-menu-static', isStatic)
    }
  }

  useEffect(() => {
    if (showtable === true) {
      fetchTodoList(priority, pageSize, currentPage);
    }
    fetchMasterData();
  }, [pageSize, priority, currentPage, filterPagination, filObj, showtable]);


  const handleSearchWorkList = async (query) => {
    let postData = {
      worklist: query,
    };

    const items = await getWatchlistNumber(postData);
    const workList = items?.data?.typeaheadWorkListRecord;
    setOptionsWorklist(workList);
  };

  const handleSearchChart = async (query) => {
    let postData = {
      chart_no: query,
    };
    const items = await getWatchlistNumber(postData);
    const chart = items?.data?.typeaheadChartRecord;
    setOptionsChart(chart);
  };

  const handleSearchTaskName = async (query) => {
    let postData = {
      task_name: query,
    };
    const items = await getWatchlistNumber(postData);
    const taskName = items?.data?.typeAheadTaskName;
    setTaskNameOptions(taskName);
  };

  const fetchTodoList = async (priority, pageSize, currentPage) => {
    let response;
    if (filterPagination === true) {
      setCurrentPage(1);
      setFilterPagination(false);
    }
    setLoader(true);
    if ((serialNumberFrom === "" || serialNumberFrom === undefined) && (serialNumberTo === "" || serialNumberTo === undefined) && (selectedOptionWorkList.length === 0)) {
      filObj.worklist_number = [routeLocation?.state?.worklist_number];
      filObj.worklist_id = routeLocation?.state?.worklist_id;
      filObj.s_no_from = routeLocation?.state?.s_no_from;
      filObj.s_no_to = routeLocation?.state?.s_no_to;
      filObj[routeLocation?.state?.role] = [routeLocation?.state?.id];
      response = await getTodoList(priority, pageSize, currentPage, filObj);
    } else {
      response = await getTodoList(priority, pageSize, currentPage, filObj);
    }
    if (response?.charts.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setLoader(false);
    setChartData(response?.charts);
    setTotal(response?.counts);
    window.KTMenu.init();
  };

  useEffect(() => { }, [chartData]);
  const handleLinkClick = (id) => {
    localStorage.setItem("key", id);
    navigate(`/process-chart/${id}`);
  };

  const triggerFilterOpen = () => {
    setTimeout(() => {
      document.querySelector("button.btn-filter").dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      );
    }, 10);
  };

  const handleCheckBoxChange = () => {
    setTimeout(() => {
      const selectedChartsCount = document.querySelectorAll("input[type=checkbox].action-checkbox.chart-checks:checked").length;
      const selectedChartsCountElement = document.querySelector(".selected-charts-count");
      if (selectedChartsCountElement) {
        selectedChartsCountElement.innerHTML = selectedChartsCount + " Selected";
      }
    }, 200);
  };

  function unCheck() {
    var x = document.getElementsByClassName("checkbox-row");
    for (let i = 0; i < x.length; i++) {
      if (x[i].checked !== undefined) {
        x[i].checked = false;
      }
    }
    handleCheckBoxChange();
  }

  const switchMilestoneBadgeClasses = (milestone)=>{
    switch (milestone) {
      case 'Backlog':
        return 'badge-light-info'
      case 'Dev Assigned':
        return 'badge-light'
      case 'Dev in Progress':
        return 'bs-yellow-light text-yellow'
      case 'Dev Complete':
        return 'badge-light-danger'
      case 'QA':
        return 'badge-light-dark'
      case 'Client Review':
        return 'badge-light-warning'
      case 'Done':
        return 'badge-light-success'
      default:
        return 'badge-light'
    }
  }

  const showTable = (value) => {
    return chartData?.map((row) => (
      <tr key={row?.Id}>
        <td>
          <div className="form-check form-check-sm form-check-custom form-check-solid">
            <input className="form-check-input action-checkbox chart-checks checkbox-row" onChange={handleCheckBoxChange} data-chart-id={row?.Id} type="checkbox" value="1" name="reallocateChartIds[]" />
          </div>
        </td>
        <td onClick={() => handleLinkClick(row?.Id)} style={{ color: "var(--bs-primary)", cursor: "pointer" }}>
          <strong className="text-gray-900">{row?.Worklist}</strong>
        </td>
        <td>{row?.epic_name}</td>
        <td onClick={() => handleLinkClick(row?.Id)} style={{ color: "var(--bs-primary)", cursor: "pointer" }}>
          {row?.TaskNo}
        </td>
        <td onClick={() => handleLinkClick(row?.Id)} style={{ cursor: "pointer" }}>
          {row?.TaskName}</td>
        <td>{row?.StartDate}</td>
        <td>{row?.EndDate}</td>
        <td>
          <div className={`badge fw-bold ${switchMilestoneBadgeClasses(row?.Milestone)}` }
          >{row?.Milestone}</div>
        </td>
        <td>{row?.Process}</td>
      </tr>
    ));
  };

  const handleSpecialityChange = (event) => {
    setDefaultSpeciality(event);
    triggerFilterOpen();
  };

  const handleMilestoneChange = (event) => {
    setDefaultMilestone(event);
    triggerFilterOpen();
  };

  const handleProcessChange = (event) => {
    setDefaultProcess(event);
    triggerFilterOpen();
  };

  const fetchMasterData = () => {
    getMasterData()
      .then((response) => {
        setProcess(response.data?.processes);
        setMilestone(response.data?.milestones);
        setSpeciality(response.data?.specialties);
        // setChartStatus(response.data?.statuses_all);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setcritical = () => {
    setCurrentPage(1);
    setpriority(critical);
    unCheck();
    let inputs = document.querySelector(".action-checkbox");
    inputs.checked = false;
  };

  const sethigh = () => {
    setCurrentPage(1);
    setpriority(high);
    unCheck();
    let inputs = document.querySelector(".action-checkbox");
    inputs.checked = false;
  };

  const setmedium = () => {
    setCurrentPage(1);
    setpriority(medium);
    unCheck();
    let inputs = document.querySelector(".action-checkbox");
    inputs.checked = false;
  };

  const setlow = () => {
    setCurrentPage(1);
    setpriority(low);
    unCheck();
    let inputs = document.querySelector(".action-checkbox");
    inputs.checked = false;
  };

  const handleResetFields = () => {
    // document.getElementById("serial_from").value = "";
    // document.getElementById("serial_to").value = "";
    document.getElementById("dateRangePickerDateOfService").value = "";
    document.getElementById("dateRangePickerReceiveDate").value = "";
    setSerialNumberFrom("");
    setSerialNumberTo("");
    setDefaultMilestone([]);
    setDefaultProcess([]);
    setDefaultSpeciality([]);
    setCoderFilter([]);
    setDateOfService([]);
    setReceivedDate([]);
    setDefaultChartStatus([]);
    typeAheadRefTaskName.current.clear();
    typeheadRefTaskNumber.current.clear();
    typeAheadRefProject.current.clear();
    setTaskName("");
    setTaskNumber("");
    setSelectedOptionWorkList("");
    setInputval({});
    setFilObj({});
    triggerFilterOpen();
    navigate(routeLocation.pathname, { state: null });
    setResetForm(true)
  };

  const renderSpeciality = () => {
    return speciality?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderMilestone = () => {
    return milestone?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderProcess = () => {
    return process?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };
  
  // useEffect(() => {
  //   if (selectedOptionChart?.length) {
  //     handleSearchTaskName(selectedOptionChart)
  //   }
  // }, [filterForToDOList])

  useEffect(() => {
    if(!resetForm) {
      setGlobalChartSearch({
        dateOfService: routeLocation?.state?.submitData?.date_of_service ?? "",
        receivedDate: routeLocation?.state?.submitData?.receivedDate ?? "",
        dateOfJoining: routeLocation?.state?.submitData?.completion_date ?? "",
        selectedOptionChart: routeLocation?.state?.submitData?.chart_no ?? ""
      });
      setDateOfService(routeLocation?.state?.submitData?.date_of_service ?? "");
      setReceivedDate(routeLocation?.state?.submitData?.receivedDate ?? "");
      // setDateOfCompletion(routeLocation?.state?.submitData?.completion_date ?? "");
      // setSelectedOptionsChart(routeLocation?.state?.submitData?.chart_no ?? "");
    } else {
      setResetForm(false)
    }
  }, [routeLocation])

  useEffect(() => {
    filterSubmit("submit", true)
  }, [globalChartSearch])

  const handleEventDateOfService = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setDateOfService(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
  };

  const handleEventReceiveDate = (event, picker) => {
    picker.element.val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));
    setReceivedDate(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"));

  }
  
  const handleCancelDateOfService = (event, picker) => {
    picker.element.val('');
    setDateOfService('');
  }
  const handleCancelReceiveDate = (event, picker) => {
    picker.element.val('');
    setReceivedDate('');

  }
  
  // useEffect(() => {
  //   setKey((prevKey) => prevKey + 1);
  // }, [selectedOptionChart]);

  const handleInputNumberChange = (input) => {
    if (input === '') {
      setTaskNumber('');
    }
  };
  const handleInputNameChange = (input) => {
    if (input === '') {
      setTaskName('');
    }
  };
  const handleInputChange = (input) => {
    if (input === '') {
      setSelectedOptionWorkList('');
    }
  }

  return (
    <>
      <div>
        <div className="d-flex justify-content-between progress-button">
          <h3 className="pb-0 mb-4 ms-3 pt-5">My To-do List</h3>
        </div>

        <div className="card priority-card">
          <div className="card-header pt-7 border-bottom-0">
            <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6" role="tablist">
              <li className="nav-item" role="presentation">
                <Link className="nav-link active" onClick={() => { setcritical(); }} data-bs-toggle="tab" href="#kt_tab_pane_critical" aria-selected="true" role="tab" > Critical ({total?.Critical}) </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link className="nav-link" data-bs-toggle="tab" onClick={() => { sethigh(); }} href="#kt_tab_pane_medium" aria-selected="false" role="tab" tabIndex={-1} > High ({total?.High}) </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link className="nav-link" data-bs-toggle="tab" onClick={() => { setmedium(); }} href="#kt_tab_pane_medium" aria-selected="false" role="tab" tabIndex={-1} > Medium ({total?.Medium}) </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link className="nav-link" data-bs-toggle="tab" onClick={() => { setlow(); }} href="#kt_tab_pane_low" aria-selected="false" role="tab" tabIndex={-1} > Low ({total?.Low}) </Link>
              </li>
            </ul>
            <div className="d-flex">
              <div>
                <button type="button" id="chart_list_filter_button" className="btn btn-light-primary ms-4 btn-filter" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                  <i className="fas fa-filter"></i>
                  {" Filter"}
                </button>

                <div className="menu menu-sub menu-sub-dropdown w-900px w-md-900px" data-kt-menu="true">
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">Filter Options</div>
                  </div>

                  <div className="separator border-gray-200" />

                  <div className="px-7 py-5 scroll-y chart-filter" data-kt-user-table-filter="form">
                    <div className="row mb-3">
                      {/* <div className="col-lg-4 col-12 mb-4">
                        <div className="mb-4">
                          <label className="form-label">Worklist #</label>
                          <AsyncTypeahead filterBy={() => true} isLoading={isLoading} id="worklistdata" ignoreDiacritics={ignoreDiacritics} labelKey="worklist_no" placeholder="..." options={optionsWorklist} useCache={false} debounceTime minLength={1} onSearch={handleSearchWorkList} renderMenuItemChildren={(option) => (<> <span>{option.worklist_no}</span> </>)} ref={typeaheadRef} onChange={(selected) => { setSelectedOptionWorkList([selected[0]?.worklist_no]); if (selected?.length >= 1) { triggerFilterOpen(); }}} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-12  mb-4">
                        <div className="mb-4">
                          <label className="form-label">S. No.</label>
                          <div className="row">
                            <div className="col-lg-6 col-6">
                              <input className="form-control" name="s_no_from" type="number" min={0} placeholder="From" onChange={(e) => setSerialNumberFrom(e.target.value)} id="serial_from" />
                            </div>
                            <div className="col-lg-6 col-6">
                              <input className="form-control" name="s_no_to" type="number" min={serialNumberFrom} placeholder="To" onChange={(e) => setSerialNumberTo(e.target.value)} id="serial_to" />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-lg-4 col-6  mb-4">
                        <div className="mb-4">
                          <label className="form-label">Task Number</label>
                          <AsyncTypeahead
                            filterBy={() => true}
                            placeholder="..."
                            isLoading={isLoading}
                            id="chart_no"
                            ignoreDiacritics={ignoreDiacritics}
                            labelKey="unique_task_no"
                            options={optionsChart}
                            value={taskNumber}
                            minLength={2}
                            debounceTime
                            useCache={false}
                            onSearch={handleSearchChart}
                            onInputChange={handleInputNumberChange}
                            renderMenuItemChildren={(option) => (
                              <>
                                <span>{option.unique_task_no}</span>
                              </>
                            )}
                            ref={typeheadRefTaskNumber}
                            onChange={(selected) => {
                              setTaskNumber([selected[0]?.unique_task_no]);
                              triggerFilterOpen();
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-6  mb-4">
                        <div className="mb-4">
                          <label className="form-label">Task Name</label>
                          <AsyncTypeahead
                            filterBy={() => true}
                            placeholder="..."
                            isLoading={isLoading}
                            id="task_name"
                            ignoreDiacritics={ignoreDiacritics}
                            labelKey="name"
                            options={taskNameOptions}
                            value={taskName}
                            minLength={2}
                            debounceTime
                            useCache={false}
                            onSearch={handleSearchTaskName}
                            onInputChange={handleInputNameChange}
                            renderMenuItemChildren={(option) => (
                              <>
                                <span>{option.name}</span>
                              </>
                            )}
                            ref={typeAheadRefTaskName}
                            onChange={(selected) => {
                              setTaskName([selected[0]?.name]);
                              triggerFilterOpen();
                            }}
                          />
                        </div>
                      </div>  
                      <div className="col-lg-4 col-6  mb-4">
                        <div className="mb-4">
                          <label className="form-label">Project</label>
                          <AsyncTypeahead
                            filterBy={() => true}
                            isLoading={isLoading}
                            id="worklistdata"
                            placeholder="..."
                            ignoreDiacritics={ignoreDiacritics}
                            labelKey="worklist_no"
                            options={optionsWorklist}
                            value={selectedOptionWorkList}
                            defaultInputValue={Array.isArray(selectedOptionWorkList) ? selectedOptionWorkList.join(', ') : ''}
                            minLength={1}
                            onSearch={handleSearchWorkList}
                            onInputChange={handleInputChange}
                            renderMenuItemChildren={(option) => (
                              <>
                                <span>{option?.name} ( {option.worklist_no} )</span>
                              </>
                            )}
                            ref={typeAheadRefProject}
                            onChange={(selected) => {
                              setSelectedOptionWorkList([selected[0]?.worklist_no]);
                              triggerFilterOpen();
                            }}
                          />      
                        </div>
                      </div>

                    </div>
                    <div className="row mb-5">
                      <div className="col-lg-4 col-12 mb-4">
                        <label className="form-label mb-2">
                          <span>Start Date</span>
                        </label>
                        <DateRangePicker
                          initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }}
                          onShow={() => { setMenuStaticProperty(true) }}
                          onHide={() => { setMenuStaticProperty(false) }}
                          onApply={handleEventDateOfService} style={{ zIndex: "20" }}
                          onCancel={handleCancelDateOfService}>
                          <input type="text" id="dateRangePickerDateOfService" defaultValue={dateOfService} placeholder="Select Date" autoComplete="off" className="form-control" />
                        </DateRangePicker>

                      </div>
                      <div className="col-lg-4 col-12 mb-4">
                        <label className="form-label mb-2">
                          <span>End Date</span>
                        </label>
                        <DateRangePicker
                          initialSettings={{ autoUpdateInput: false, locale: { cancelLabel: "Clear", format: 'DD/MM/YYYY' }, showDropdowns: true }}
                          onShow={() => { setMenuStaticProperty(true) }}
                          onHide={() => { setMenuStaticProperty(false) }}
                          onApply={handleEventReceiveDate} style={{ zIndex: "20" }}
                          onCancel={handleCancelReceiveDate}>
                          <input type="text" id="dateRangePickerReceiveDate" defaultValue={receivedDate} className="form-control" placeholder="Select Date" autoComplete="off" />
                        </DateRangePicker>
                      </div>
                      <div className="col-lg-4 col-12 mb-4">
                        <label className="form-label">Milestone </label>
                        <Select options={renderMilestone()} isMulti={true} value={defaultMilestone} onChange={handleMilestoneChange} />
                      </div>
                    </div>
                    <div className="row mb-5">
                       <div className="col-lg-4 col-12  mb-4">
                         <div className="mb-4">
                           <label className="form-label">Speciality </label>
                          <Select options={renderSpeciality()} isMulti={true} value={defaultSpeciality} onChange={handleSpecialityChange} />
                        </div>
                      </div> 
                      <div className="col-lg-4 col-12 mb-4">
                        <label className="form-label">Process </label>
                        <Select id="processid" options={renderProcess()} isMulti={true} value={defaultProcess} onChange={handleProcessChange} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true" onClick={() => { filterSubmit("reset"); handleResetFields(); }} >
                        Reset
                      </button>
                      <button type="submit" onClick={() => filterSubmit("apply")} className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body  py-2">
            <div>
              <div className="separator separator-dashed my-5 mt-0" />
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="kt_tab_pane_critical" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_table_todo_list">
                      <thead>
                        <tr className="text-start text-dark fw-bold fs-7 text-uppercase gs-0">
                          <th className="min-w-30px">
                            <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                              <input className="form-check-input action-checkbox" type="checkbox" onChange={handleCheckBoxChange} data-kt-check="true" data-kt-check-target="#kt_table_todo_list .form-check-input" value="1" />
                            </div>
                          </th>
                          <th className="min-w-80px">Project</th>
                          <th className="min-w-80px">Epic</th>
                          <th className="min-w-80px">Task #</th>
                          <th className="min-w-80px">Task Name</th>
                          <th className="min-w-80px">Start Date</th>
                          <th className="min-w-80px">End Date</th>
                          <th className="min-w-80px">Milestone</th>
                          <th className="min-w-80px">Process</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 fw-semibold">{chartData && showTable(priority)}</tbody>
                    </table>{" "}
                    {loader === false && noData === true && <div>No Records Found ...</div>}
                    {noData === false && <CustomPagination dataPerPage={pageSize} totalData={total?.[priority]} paginate={paginate} currentPage={currentPage} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ToDoList;
