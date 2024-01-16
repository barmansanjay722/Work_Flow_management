import { useContext, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import TaskContext from "../../Context/Chartcontext";
import "./ChartForm.css";
import { imageIdGenerate } from "../../utils/custom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { fetchProjectEpicsAndSprints, getProjectMembers } from "../../services/managerWorkListService";

function ChartInfo({ masterData, enabled, getdata, data, handleDateTimeChange, handleSelectChange, errorsForChat, mainData, handleKeypress, errorsFromAuditorToChart, setIsTouched, taskType, setTaskType}) {
  const { defaultHold, setDefaultHold, setMilestone, milestone, inpval, assignee, setAssignee, epic, setEpic, sprint, setSprint } = useContext(TaskContext);
  const [epicAndSprintList, setEpicAndSprintList] = useState({epics: [], sprints:[]});
  const [projectMembers, setProjectMembers] = useState([]);

  useEffect(()=>{
    if(data.WorklistId){
      fetchProjectEpicsAndSprints(data.WorklistId).then(response => {
        if(response.success){
          setEpicAndSprintList({ epics: response?.data?.epics ?? [], sprints: response?.data?.sprints ?? [] });
        }
      });
      getProjectMembers(data.WorklistId).then(response => {
        setProjectMembers(response?.data);
      });
     }
  }, [data.WorklistId]);

  const renderHoldList = () => {
    return data.holdreason?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  const renderSprintList = () => {
    return epicAndSprintList?.sprints?.map((data) => ({
      label: data.label,
      value: data.value,
    }));
  };

  const renderEpicList = () => {
    return epicAndSprintList?.epics?.map((data) => ({
      label: data.label,
      value: data.value,
    }));
  };

  const renderMilestoneList = () => {
    return data.masterData?.milestones?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  const renderProjectMembersList = () => {
    return projectMembers?.map((member) => ({
      label: `${member.first_name} ${member.last_name}`,
      value: member.id,
      image: member.image_url ?? `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(member?.id)}.jpg`
    }));
  };

  const renderTaskTypes = () => {
    return data.masterData?.task_type?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const handleHoldChange = (event) => {
    setDefaultHold(event);
  };

  const handleMilestoneChange = (event) => {
    setMilestone(event);
  };

  const handleEpicChange = (event) => {
    setEpic({
      label: event.label ?? epic?.label,
      value: event.value ?? epic?.value,
    })
  };

  const handleSprintChange = (event) => {
    setSprint({
      label: event.label ?? sprint?.label,
      value: event.value ?? sprint?.value,
    })
  };

  const handleTaskAssigneeChange = (event) => {
    setAssignee({
      label: `${event.label}`,
      value: event.value,
      image: event.image
    })
  };

  const handleTaskType = (event) => {
    setTaskType({
      label: event.label ?? taskTypeValue,
      value: event.value ?? data?.TaskTypes,
    })
  };

  const taskTypeValue = data?.TaskType === 1 ? "Task" : data?.TaskType === 2 ? "Story" : data?.TaskType === 3 ? "Bug" : "";

  const taskTypeDefaultValue = { label:taskTypeValue , value:data?.TaskType }

  function handleFocus() {
   document.getElementById("description").rows = "10";
  }
  return (
    <>
      <div className="card card-flush mb-6 mb-xl-9">
        <div className="card-header mt-6 minimize">
          <div className="card-title flex-column">
            <h2 className="mb-1">Task Info</h2>
            <div className="fs-6 fw-semibold text-muted">All relevant task details</div>
          </div>
          <div className="card-toolbar mt-0">
            <button className="btn btn-icon btn-sm btn-light-primary justify-content-center">
              <i className="fas fa-minus" />
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="card-body d-flex flex-column pb-0">
            <div className="d-flex flex-column gap-5 gap-md-7">
              <div className="row">
              <div className="col-xl-3 col-lg-3 col-6">
                  <label className="form-label">Task Type</label>
                  <Select id="task_type" name="task_type" options={renderTaskTypes()} isMulti={false} value={taskType ?? taskTypeDefaultValue} isDisabled={false} onChange={handleTaskType}/>
                </div>
                <div className="col-xl-9 col-lg-9 col-6">
                  <label className="required form-label">Task Name</label>
                  <input className="form-control" autoComplete="off" value={inpval?.name || ''} defaultValue={data?.TaskName} onChange={getdata} onKeyUp={handleKeypress} name="name" disabled={false} />
                  {errorsForChat?.name && (inpval?.name === null || inpval?.name?.trim() === "") && <p className="help is-danger errorDanger">{errorsForChat?.name}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label className="form-label">Description</label>
                  {<textarea autoComplete="off" id='description' className="form-control" name="description" value={inpval?.description || ''} onChange={getdata} onKeyUp={handleKeypress} disabled={false} onFocus={handleFocus}/>}
                  {errorsForChat?.description && <p className="help is-danger errorDanger">{errorsForChat?.description}</p>}
                </div>
              </div>
              <div className="row">
                  <div className="col-xl-3 col-lg-3 col-6">
                    <label className="form-label">Assignee</label>
                    <Select id="assignee" name="assignee_id" options={renderProjectMembersList()} isMulti={false} value={assignee} isDisabled={false} onChange={handleTaskAssigneeChange} 
                    formatOptionLabel={user => (
                      <div value={user?.value}>
                        <img width='30' height='30' style={{'borderRadius': '50%', 'marginRight': '10px'}} src={user.value ? (user?.image ?? `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(user?.value)}.jpg`): (`${process.env.PUBLIC_URL}/assets/media/avatars/blank.png`)} alt="user.img" />
                        <span className="fw-semibold">{user.value ? (user?.label ?? "") : "Unassigned"}</span>
                      </div>
                    )}
                    />
                  </div>
                <div className="col-xl-3 col-lg-3 col-6">
                  <label className="form-label">Start date</label>
                  <Flatpickr className="form-control" options={{ dateFormat: "d-m-Y", animate: true }} value={inpval?.start_date} name="start_date" onChange={handleDateTimeChange} disabled={false} />
                  {errorsForChat?.start_date && inpval?.start_date === null && <p className="help is-danger errorDanger">{errorsForChat?.start_date}</p>}
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                  <label className="form-label">End date</label>
                  <Flatpickr className="form-control" options={{ dateFormat: "d-m-Y", minDate: data?.StartDate }} value={inpval?.end_date} name="end_date" onChange={handleDateTimeChange} disabled={false} />
                  {errorsForChat?.end_date && inpval?.end_date === null && <p className="help is-danger errorDanger">{errorsForChat?.end_date}</p>}
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                  <OverlayTrigger placement={"top"} overlay={<Tooltip> Formats supported: 02:30, 2h30m, 2h, 30m, 2.5 </Tooltip>}>
                    <label className="form-label">Estimation <i className="fas fa-exclamation-circle ms-1 fs-6"></i></label>
                  </OverlayTrigger>
                  <input className="form-control" name="estimation" value={inpval?.estimation || ''} onChange={getdata} onKeyUp={handleKeypress} autoComplete="off" />
                </div>
              </div>
                <div>
                  <label className=" form-label"></label>
                  <input type="hidden" className="form-control" name="ChartMetumId" onChange={getdata} readOnly disabled={!enabled} />
                </div>
            </div>
          </div>
          <div className="separator separator-dashed my-6" />
          <div className="card card-flush mb-6 mb-xl-9">
            <div className="card-body d-flex flex-column pt-0">
              <div className="d-flex flex-column gap-5 gap-md-7">
                <div className="row">
                <div className="col-xl-3 col-lg-3 col-3">
                    <label className="form-label">Sprint</label>
                    <Select id="sprint" name="SprintId" menuPlacement={'auto'} isSearchable={true} options={renderSprintList()} isMulti={false} value={sprint} defaultValue={{ label: "", value: 1 }} onChange={handleSprintChange} />
                    {errorsForChat?.MilestoneId && <p className="help is-danger errorDanger">{errorsForChat?.MilestoneId}</p>}
                  </div>
                  <div className="col-xl-3 col-lg-3 col-3">
                    <label className="form-label">Epic</label>
                    <Select id="epic" name="EpicId" menuPlacement={'auto'} isSearchable={true} options={renderEpicList()} isMulti={false} value={epic} defaultValue={{ label: "", value: 1 }} onChange={handleEpicChange} />
                    {errorsForChat?.MilestoneId && <p className="help is-danger errorDanger">{errorsForChat?.MilestoneId}</p>}
                  </div>
                  <div className="col-xl-3 col-lg-3 col-3">
                    <label className="form-label">Milestone</label>
                    <Select id="milestone" name="MilestoneId" menuPlacement={'auto'} isSearchable={true} options={renderMilestoneList()} isMulti={false} value={milestone} defaultValue={{ label: "Backlog", value: 1 }} onChange={handleMilestoneChange}>
                      {mainData.defaultMilestone?.map((option) => (
                        <option key={option?.id} value={option?.id}>
                          {option?.name}
                        </option>
                      ))}
                    </Select>
                    {errorsForChat?.MilestoneId && <p className="help is-danger errorDanger">{errorsForChat?.MilestoneId}</p>}
                  </div>
                  <div className="col-xl-3 col-lg-3 col-3">
                    <label className="form-label">Hold reason</label>
                    {<Select name="HoldReasons" menuPlacement={'auto'} isSearchable={true} options={renderHoldList()} isMulti={true} isDisabled={false} value={defaultHold ?? data.HoldReasons} onChange={handleHoldChange}></Select>}
                    {errorsForChat?.HoldReasons && (defaultHold === undefined || defaultHold?.length === 0) && <p className="help is-danger errorDanger">{errorsForChat?.HoldReasons}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChartInfo;