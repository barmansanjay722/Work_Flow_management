import { Container, Modal } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { addTaskByWorklistId, getProjectMembers, fetchProjectEpicsAndSprints } from "../../../services/managerWorkListService";
import { useEffect, useState } from "react";
const WorklistAddTaskModal = ({ showModalBox, CloseTaskModal, masterData, worklistId, dependencyForFetchWorklistProgressRerender, setDependencyForFetchWorklistProgressRerender }) => {
  const [projectMembers, setProjectMembers] = useState([]);
  const [epics, setEpics] = useState([]);
  const [sprints, setSprints] = useState([]);

  const fetchProjectMembers = async () => {
    const response = await getProjectMembers(worklistId);
     if(response){
      setProjectMembers(response?.data)
     }
  }

  useEffect(()=>{
    fetchProjectMembers();
    fetchProjectEpicsAndSprints(worklistId).then(response=> {
      setEpics(response?.data?.epics);
      setSprints(response?.data?.sprints);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const options_for_end_date = {
    dateFormat: "d/m/Y",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const registerOptions = {
    task_name: { required: "Required", pattern: { value: /^\S/, message: "Invalid input" }, maxLength: { value: 250, message: "Exceeded max limit" } },
    assignee_id: { required: "Required" },
    start_date: { required: "Required" },
    end_date: { required: "Required" },
    priority_id: { required: "Required" },
    task_type: {required: "Required"},
  };
  const onSave = async (data) => {
    data = {...data, task_type:data?.task_type?.value};
    const response = await addTaskByWorklistId(worklistId, data);
    if (response?.success === true) {
      window.toastr.success(response?.message);
      setDependencyForFetchWorklistProgressRerender(!dependencyForFetchWorklistProgressRerender);
      CloseTaskModal();
    } else {
      CloseTaskModal();
      window.toastr.error(response?.message);
    }
  };
  const resetTask = () => {
    reset({
      Task: "",
      userId: "",
      start_date: "",
      end_date: "",
      priority_id: "",
      description: "",
    });
  };

  const renderTaskType = () => {
    return masterData?.task_type?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  return (
      <>
        <Container>
          <Modal show={showModalBox} size="lg" centered>
            <div>
              <div>
                <Modal.Header className="modal-header py-4">
                  <h2 className="fw-bold">Add New Task</h2>
                  <Modal.Title
                    className="btn btn-icon btn-sm btn-active-icon-primary"
                    onClick={() => {
                      CloseTaskModal();
                      resetTask();
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
                  <form onSubmit={handleSubmit(onSave)}>
                    <div className="row mb-4">
                      <div className="col-lg-8">
                        <label className="form-label">Task Name</label>
                        <input className="form-control" type="text" name="task_name" placeholder="" {...register("task_name", registerOptions.task_name)} />
                        <small className="text-danger">{errors?.task_name && errors.task_name.message}</small>
                      </div>
                      <div className="col-xl-4 col-lg-4">
                        <label className="form-label">Task Type</label>
                        <Controller name="task_type" control={control} render={({ field }) => <Select {...field} id="task_type" name="task_type" isMulti={false} options={renderTaskType()}/>}/>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-xl-4 col-lg-4">
                        <label className="form-label">Sprint</label>
                        <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="sprint_id" {...register("sprint_id")}>
                          <option value="">---</option>
                          {sprints?.map((option) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-4 col-lg-4">
                        <label className="form-label">Epic</label>
                        <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="epic_id" {...register("epic_id")}>
                          <option value="">---</option>
                          {epics?.map((option) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <label className="form-label">Assign User </label>
                        <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="assignee_id" {...register("assignee_id", registerOptions.assignee_id)}>
                          <option value="">---</option>
                          {projectMembers?.map((option) => (
                            <option key={option?.id} value={option?.id}>
                              {option?.first_name} {option?.last_name}
                            </option>
                          ))}
                        </select>
                        <small className="text-danger">{errors.assignee_id && errors.assignee_id.message}</small>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-lg-4">
                        <label className="fs-6 fw-semibold mb-2">
                          <span>Start Date</span>
                        </label>
                        <Controller name="start_date" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr options={options_for_end_date} onChange={(dates, currentdateString) => onChange(currentdateString)} className="form-control" placeholder="" name="start_date" />} rules={{ required: "Required" }} />
                        <small className="text-danger">{errors?.start_date && errors.start_date.message}</small>
                      </div>
                      <div className="col-lg-4">
                        <label className="fs-6 fw-semibold mb-2">
                          <span>End Date</span>
                        </label>
                        <Controller name="end_date" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr options={options_for_end_date} onChange={(dates, currentdateString) => onChange(currentdateString)} className="form-control" placeholder="" name="end_date" />} rules={{ required: "Required" }} />
                        <small className="text-danger">{errors?.end_date && errors.end_date.message}</small>
                      </div>
                      <div className="col-lg-4">
                        <label className="form-label">Priority </label>
                        <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="priority_id" {...register("priority_id", registerOptions.priority_id)}>
                          <option value="">---</option>
                          {masterData?.priorities.map((option) => (
                            <option key={option?.id} value={option?.id}>
                              {option?.name}
                            </option>
                          ))}
                        </select>
                        <small className="text-danger">{errors.priority_id && errors.priority_id.message}</small>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-lg-12">
                        <label className="form-label">Description</label>
                        <textarea autoComplete="off" className="form-control" name="description" {...register("description")}></textarea>
                      </div>
                    </div>
                    <div className="text-center pt-8">
                      <button
                        type="reset"
                        className="btn btn-light me-3"
                        data-kt-users-modal-action="cancel"
                        onClick={(e) => {
                          CloseTaskModal();
                          resetTask();
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary me-4">
                        <span className="indicator-label">Save</span>
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
export default WorklistAddTaskModal;
