import React, { useEffect, useState, useContext } from "react";
import Configurationcontext from "../../../Context/ConfigrationContext/Configurationcontext";
import configurationConstants from "../../../apis/configuration/configurationConstants";
import Select from "react-select";
import { Container, Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { allocateVol } from "../../../services/managerService";
import { useNavigate } from "react-router-dom";
import "../ManagerWorklistDetails.css";
// import moment from "moment/moment";

const WatchListBodyAddVol = ({ masterData, changeParentList, onQuery }) => {
  let [display, setDisplay] = useState(false)
  const configurationProvider = useContext(Configurationcontext)
  const [showModalBox, setShowModalBox] = useState(false);
  const [flagForSettingDefaultField, setFlagForSettingDefaultField] = useState(true);
 
  // const [selectClientId, setSelectClientId] = useState();
  // const [selectLocationId, setSelectLocationId] = useState();
  // const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  // const options = {
  //   maxDate: new Date(),
  //   dateFormat: "d/m/Y",
  // };

  const options_for_end_date = {
    dateFormat: "d/m/Y",
  };


  const {
    register,
    handleSubmit,
    control,
    // getValues,
    formState: { errors },
    reset,
    // setValue,
  } = useForm();

  const registerOptions = {
    worklist_name: { required: "Required", pattern: { value: /^\S/, message: "Invalid input" }, maxLength: { value: 250, message: "Exceeded max limit" } },
    ClientId: { required: "Required" },
    // no_of_charts: { required: "Required", pattern: { value: /^-?\d+$/, message: "Invalid input" }, max: { value: 99999, message: "Exceeded max limit" }, min: { value: 1, message: "Invalid input" } },
    ProcessId: { required: "Required" },
    // LocationId: { required: "Required" },
    start_date: { required: "Required" },
    SpecialtyId: { required: "Required" },
    end_date: { required: "Required" },
  };

  let data_from_task = [];
  const assign_ids = configurationProvider?.submitData[configurationConstants?.TASKS]?.assigned_to?.map((assign, index) => assign);
  const tasks_assigned = configurationProvider?.submitData[configurationConstants?.TASKS]?.tasks?.map((task_given, index) => task_given);

//  const newArray = assign_ids?.map(item => (item === "" ? null : item));

  if(assign_ids !== undefined && tasks_assigned !== undefined){
  for (const [i, assign_id] of assign_ids.entries()) {
  const task = tasks_assigned[i];
  data_from_task.push({ "assignee_id": assign_id === "" ? null : assign_id, "task": task });
}}

const indicesWithNullAssignee = data_from_task.reduce((acc, item, index) => {
  if (item.assignee_id === null) {
      acc.push(index);
  }
  return acc;
}, []);

const indicesWithNullTaskName = data_from_task.reduce((acc, item, index) => {
  if (item.task === '') {
      acc.push(index);
  }
  return acc;
}, []);

  const handleSubmitPreview = async (type) => {
    setDisplay(true);
    await handleSubmit((data) => {
      if (indicesWithNullAssignee?.length === 0 && indicesWithNullTaskName?.length === 0) {
        const selectedSpecialties = data?.SpecialtyId?.map((option) => option?.value);
        data = { ...data, SpecialtyId: selectedSpecialties, data_from_task }
        allocateVol(data)
          .then((data) => {
            if (data?.success === true) {
              configurationProvider.submitData[configurationConstants.TASKS].tasks = []
              configurationProvider.submitData[configurationConstants.TASKS].assigned_to = []
              setDisplay(false)
              if (type !== "allocate") {
                window.toastr.success("Project added successfully");
              }
              changeParentList(true);
              setShowModalBox(false);
              onQuery(data);
              reset({
                worklist_name: "",
                SpecialtyId: "",
                ClientId: "",
                ProcessId: "",
              });
              if (type === "allocate") {
                navigate("/manager-worklist-details", { state: { worklist_id: data?.data?.id } });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  };

  const handleShowModal = async => {
    setShowModalBox(true);
    if(configurationProvider?.submitData[configurationConstants?.TASKS]?.tasks?.length < 1 || configurationProvider?.submitData[configurationConstants?.TASKS]?.tasks?.length === undefined){
    setFlagForSettingDefaultField(!flagForSettingDefaultField);
    }
  }

  // const handleClientChange = async (event) => {
  //   const selectedClient = event.target.value;
  //   setSelectClientId(selectedClient);
  //   setValue("ClientId", selectedClient);
  //   if (selectedClient !== "") {
  //     await fetchClientLocationMaster(selectedClient, "");
  //   }

  //   // Update the form value
  //   if (errors.ClientId) {
  //     setValue("ClientId", selectedClient, { shouldValidate: true });
  //   }
  //   if (selectedClient === "") {
  //     reset({
  //       LocationId: "",
  //       SpecialtyId: "",
  //     });
  //     setIsDisabled(true);
  //   }
  // };

  // const handleLocationChange = async (event) => {
  //   await fetchClientLocationMaster(selectClientId, event.target.value);
  //   setValue("LocationId", event.target.value);
  //   if (errors.LocationId) {
  //     setValue("LocationId", event.target.value, { shouldValidate: true });
  //   }
  // };

  // const fetchClientLocationMaster = async (cID, lID) => {
  //   const response = await fetchMasterOnClientLocation(cID, lID);
  //   setSelectLocationId(response?.locations);
  //   setSelectSpecialtyId(response?.specialties);
  //   setIsDisabled(false);
  // };

  useEffect(() => {}, [masterData]);

//   const start_date = moment(getValues("start_date"))._i;
// const end_date = moment(getValues("end_date"))._i;

// // Convert the date strings to Date objects
// const date1 = new Date(start_date);
// const date2 = new Date(end_date);

  const renderAllUsers = () => {
    return masterData?.users_all?.map((data) => {
      return {
        label: `${data?.name}`,
        value: data?.id,
      }
    })
  }
  
  const renderSpecialties = () => {
    const groupedOptions = [];
    if (masterData?.speciality_by_techstack_category) {
      masterData?.speciality_by_techstack_category.forEach(data => {
        // Check if the group already exists in groupedOptions
        const group = groupedOptions.find(group => group.label === data.group_name);
        if (group) {
          // If the group exists, add the specialty to its options
          group.options.push({
            label: data.spec_name,
            value: data.id,
          });
        } else {
          // If the group doesn't exist, create a new group
          groupedOptions.push({
            label: data.group_name,
            options: [{
              label: data.spec_name,
              value: data.id,
            }],
          });
        }
      });
    } 
    return groupedOptions;
  };

  useEffect (()=>{
    setTimeout(()=>{
        const addButton = document.querySelector('.onAddClickButton');
        if (addButton) {
          addButton.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          }));
    }}, 250)
},[flagForSettingDefaultField])

const customStyles = {
  groupHeading: (provided) => ({
    ...provided,
    fontWeight: 'bold',
    fontSize:'14px',
    color:'#404040'
  }),
};

  return (
    <>
      <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            handleShowModal(e)
          }}
        >
          <span className="svg-icon svg-icon-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
              <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>
          New Project
        </button>
      </div>
      <Container>
        <Modal show={showModalBox} size="lg" centered>
          <div>
            <div>
              <Modal.Header className="modal-header py-4">
                <h2 className="fw-bold">Add New Project</h2>
                <Modal.Title
                  className="btn btn-icon btn-sm btn-active-icon-primary"
                  onClick={(e) => {
                    configurationProvider.submitData[configurationConstants.TASKS].tasks = []
                    configurationProvider.submitData[configurationConstants.TASKS].assigned_to = []
                    setDisplay(false);
                    setShowModalBox(false);
                    reset({
                      keepErrors: false,
                      worklist_name: "",
                      SpecialtyId: "",
                      ClientId: "",
                      ProcessId: "",
                    });
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
                <form>
                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="form-label">Project Name</label>
                      <input className="form-control" type="text" name="worklist_name" placeholder="" {...register("worklist_name", registerOptions.worklist_name)} />
                      <small className="text-danger">{errors?.worklist_name && errors.worklist_name.message}</small>
                    </div>
                    {/* <div className="col-4">
                      <label className="form-label">No. of Charts</label>
                      <input className="form-control" name="no_of_charts" placeholder="" {...register("no_of_charts", registerOptions.no_of_charts)} />
                      <small className="text-danger">{errors?.no_of_charts && errors.no_of_charts.message}</small>
                    </div> */}
                    <div className="col-6">
                      <label className="form-label">Client </label>
                      <select
                        className="form-select mb-2"
                        data-control="select2"
                        data-hide-search="true"
                        name="ClientId"
                        {...register("ClientId", registerOptions.ClientId)}
                        onChange={(e) => {
                          // handleClientChange(e);
                        }}
                      >
                        <option value="">---</option>
                        {masterData?.clients?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <small className="text-danger">{errors?.ClientId && errors.ClientId.message}</small>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="form-label">Process </label>
                      <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="ProcessId" {...register("ProcessId", registerOptions.ProcessId)}>
                        <option value="">---</option>
                        {masterData?.processes?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <small className="text-danger">{errors.ProcessId && errors.ProcessId.message}</small>
                    </div>
                    {/* <div className="col-6">
                      <label className="form-label">Location </label>
                      <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="LocationId" {...register("LocationId", registerOptions.LocationId)} onChange={handleLocationChange} disabled={isDisabled}>
                        <option value="">---</option>
                        {selectLocationId?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <small className="text-danger">{errors?.LocationId && errors.LocationId.message}</small>
                    </div> */}
                    <div className="col-6">
                      <label className="required form-label">Speciality </label>
                      <Controller
                        name="SpecialtyId"
                        control={control}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={renderSpecialties()}
                            groupBy="label"
                            styles={customStyles}
                          />
                        )}
                      />
                     <small className="text-danger">{errors?.SpecialtyId && errors.SpecialtyId.message}</small>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-6">
                      <label className="fs-6 fw-semibold mb-2">
                        <span>Start Date</span>
                      </label>
                      <Controller name="start_date" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr options={options_for_end_date} onChange={(dates, currentdateString) => onChange(currentdateString)} className="form-control" placeholder="" name="start_date" />} rules={{ required: "Required" }} />
                      <small className="text-danger">{errors?.start_date && errors.start_date.message}</small>
                    </div>
                    <div className="col-lg-6">
                      <label className="fs-6 fw-semibold mb-2">
                        <span>End Date</span>
                      </label>
                      <Controller name="end_date" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr options={options_for_end_date} onChange={(dates, currentdateString) => onChange(currentdateString)} className="form-control" placeholder="" name="end_date" />} rules={{ required: "Required" }} />
                      <small className="text-danger">{errors?.end_date && errors.end_date.message}</small>
                    </div>
                  </div>
                  {/*--------------------------------------------------------------------------------------------------------*/}
                  <fieldset style={{border : "10"}}>
                      <legend>Default Epic</legend>
                      <div className="row mb-4">
                        <div className="col-lg-12">
                        <div id="location">
                            <div className="applicant-fileds">
                                <div className="form-group">
                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                        <div data-repeater-item="" className="form-group flex-wrap align-items-center gap-2">
                                            <div className="form-group mt-5">
                                                <div className="form-group mt-5">
                                                    {(configurationProvider.submitData[configurationConstants.TASKS].tasks ?? []).map((e, i) => {
                                                      const isRequiredAssignee = indicesWithNullAssignee.includes(i);
                                                      const isRequiredTaskName = indicesWithNullTaskName.includes(i);
                                                        return <div className="form-group mt-5" style={{ display: "flex" }} key={i}>
                                                            <input type="text" style={{marginLeft: "1rem"}} className="form-control mw-100 w-85" placeholder="Task Name" maxLength={250} value={configurationProvider.submitData[configurationConstants.TASKS].tasks !== undefined ? configurationProvider.submitData[configurationConstants.TASKS].tasks[i] : ""} onChange={(e) => configurationProvider.onFieldChange(
                                                                configurationConstants.TASKS,
                                                                configurationConstants.TASKS_DATA,
                                                                i, e.target.value,
                                                            )} rules={{ required: "Required" }}/>

                                                            {(isRequiredTaskName && display)  && <small className="text-danger" style={{ marginLeft: "0.4rem", marginTop: "0.8rem"}}>Required</small>}

                                                            <Select className="mw-100 w-85 ms-5" options={renderAllUsers()} onChange={(e) => configurationProvider.onFieldChange(
                                                                configurationConstants.TASKS,
                                                                configurationConstants.TASKS_ASSIGNED_TO,
                                                                i, e.value,
                                                            )}/>
                                                            {(isRequiredAssignee && display) && <small className="text-danger" style={{ marginLeft: "0.4rem", marginTop: "0.8rem"}}>Required</small>}
                                                            
                                                            <button type="button" style={{ marginLeft: "35px", marginRight: "1rem" }} className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClickForTasks(
                                                                configurationConstants.TASKS,
                                                                configurationConstants.TASKS_DATA,
                                                                configurationConstants.TASKS_ASSIGNED_TO,
                                                                i
                                                            )}> 
                                                                <span className="svg-icon svg-icon-1">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="form-group mt-5">
                            <button type="button" data-repeater-create="" className="btn btn-sm btn-light onAddClickButton ms-3"
                                onClick={() => configurationProvider.onAddClickForTasks(
                                  configurationConstants.TASKS,
                                  configurationConstants.TASKS_DATA,
                                  configurationConstants.TASKS_ASSIGNED_TO,
                                )}
                            >
                                <span className="svg-icon svg-icon-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                                        <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"></rect>
                                    </svg>
                                </span>
                                Add Task</button>
                        </div>
                  </div>
                  </fieldset>
                  <div className="text-center pt-8">
                    <button
                      type="reset"
                      className="btn btn-light me-3"
                      data-kt-users-modal-action="cancel"
                      onClick={(e) => {
                        // setIsDisabled(true);
                        setShowModalBox(false);
                        reset({
                          keepErrors: false,
                          worklist_name: "",
                          SpecialtyId: "",
                          ClientId: "",
                          ProcessId: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary me-4" onClick={(e) => handleSubmitPreview("save")}>
                      <span className="indicator-label">Save</span>
                      <span className="indicator-progress">
                        Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                    <button type="button" className="btn btn-primary save-allocate-btn" onClick={(e) => handleSubmitPreview("allocate")}>
                      <span className="indicator-label">Save & Open</span>
                      <span className="indicator-progress">
                        Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default WatchListBodyAddVol;
