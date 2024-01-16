import { deleteTaskByTaskId } from "../../services/chartService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import localStorageStore from "../../utils/localStorageStore";
import role from "../../utils/role";
function NewChart({ data }) {
  const navigate = useNavigate();
  async function handleShowDeleteTask() {
    Swal.fire({
      text: "Are you sure you would like to delete this Task?",
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
        const response = await deleteTaskByTaskId(data?.Id);
        if(response?.success === true)
        {
          navigate('/');
        }
      }
    });
  }

  const decryptRole = localStorageStore.getRole();

  return (
    <div className="card chart_card">
      <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="flex-grow-1">
            <div className="justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-0">
                  <h1 className="fs-2 fw-bold me-1">Task {data?.TaskNo}</h1>
                  <p className="fs-7 text-muted">
                    Priority<span className="btn btn-sm btn-light-danger fw-bold ms-2 fs-8 py-1 px-3"> {data?.Priority}</span>{" "}
                  </p>
                  {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin ) && (<button className="btn btn-sm btn-icon btn-light-primary delete-row mobile-delete-row" onClick={() => handleShowDeleteTask()} >
                    <i className="fa fa-trash" title="Delete Task"></i>
                  </button>)}
                </div>               
              </div>
            </div>
            <div className="d-flex flex-wrap flex-stack">
              <div className="d-flex flex-column flex-grow-1 pe-8">
                <div className="d-flex flex-wrap">
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.Worklist}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Project #</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.worklist_name ?? "NA"}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Project Name</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.sprint_name ?? "NA"}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Sprint</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.epic_name ?? "NA"}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Epic</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold" data-kt-countup="false" data-kt-countup-value={75}>
                        {data?.Milestone}
                      </div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Milestone</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.StartDate}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Start Date</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.EndDate}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">End Date</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold">{data?.assignee_first_name || data?.assignee_last_name ? `${data?.assignee_first_name} ${data?.assignee_last_name}` : 'Unassigned'}</div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Assignee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewChart;
