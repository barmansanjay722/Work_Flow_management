import { React,useState, useEffect } from "react";
import {getProjectMembers,deleteProjectByWorklistId} from "../../../services/managerWorkListService";
import Swal from "sweetalert2";
import ProjectMembersModal from "./ProjectMembersModal";
import {useNavigate} from "react-router-dom";
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

function WorklistNewChart({worklistDetail,worklistId,dependencyForFetchWorklistProgressRerender,setDependencyForFetchWorklistProgressRerender,setProjectMembersList,masterData}) {
  const [showModalBox, setShowModalBox] = useState(false);
  const [projectMembers, setProjectMembers] = useState();
  const navigate = useNavigate();

  const fetchFromGetProjectMembers = async (worklistId) => {
     const response = await getProjectMembers(worklistId);
      if(response){
        setProjectMembers(response);
        setProjectMembersList(response);
      }
  }
  
  const start_date_String = worklistDetail?.start_date;
  const end_date_String = worklistDetail?.end_date;

  const imageIdGenerate = (userId) => {
    let u_id = userId;
    if (u_id > 30) {
      return imageIdGenerate(u_id - 30);
    } else {
      return u_id;
    }
  };

  const closeProjectMembersModal = () => {
  setShowModalBox(false);
  };

  useEffect(() => {
    fetchFromGetProjectMembers(worklistId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFromGetProjectMembers(worklistId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyForFetchWorklistProgressRerender]);

  async function handleShowDeleteProject() {
    Swal.fire({
      text: "Are you sure you would like to delete this Project?",
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
        const response = await deleteProjectByWorklistId(worklistId);
        if (response?.success === true) {
          window.toastr.success(response?.message); 
          navigate('/manager-worklist'); 
        }
      }
    });
  }

  const decryptRole = localStorageStore.getRole();

  return (
    <>
      <div className="card-body pt-9 pb-5">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="flex-grow-1">
            <div className="justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <h1 className="fs-2 fw-bold me-1">Project {worklistDetail?.worklist_no} | {worklistDetail?.name}</h1>    
                  {(decryptRole === role.Admin) && (<button className="btn btn-sm btn-icon btn-light-primary delete-row mobile-delete-row" onClick={() => handleShowDeleteProject()} >
                  <i className="fa fa-trash" title="Delete Project"></i>
                  </button>)}
                </div>
                <div className="d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2">
                  <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                    <span className="svg-icon svg-icon-4 me-1"> <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" /> <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" /> <rect x={7} y={6} width={4} height={4} rx={2} fill="currentColor" /> </svg> </span>
                    Client: <strong className="ms-2"> {worklistDetail?.client}</strong>
                  </p>
                  <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                    <span className="svg-icon svg-icon-4 me-1"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" /> <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" /> </svg> </span>
                    Speciality: <strong className="ms-2">{worklistDetail?.specialty?.map(response => <span key={response.id} className="badge badge-light-info fw-bold ms-2 mt-2"> {response?.spec_name} <br /> </span> )}</strong>
                  </p>
                  <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                    <span className="svg-icon svg-icon-muted svg-icon-1hx me-1"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="currentColor" /> <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="currentColor" /> </svg> </span>
                    Process: <strong className="ms-2">{worklistDetail?.process}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-stack">
              <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex flex-wrap flex-stack">
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold" data-kt-countup="false" data-kt-countup-value={75}>
                        {start_date_String}
                      </div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Start  date</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold" data-kt-countup="false" data-kt-countup-value={75}>
                        {end_date_String}
                      </div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">End date</div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="fs-5 fw-bold" data-kt-countup="false" data-kt-countup-value="" data-kt-countup-suffix="">
                        {worklistDetail?.status}
                      </div>
                    </div>
                    <div className="fw-semibold fs-6 text-gray-400 d-flex justify-content-center">Status</div>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-end pe-0 py-3 px-4 me-3 mb-3">
                  <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                    Project members
                  </span>                  
                  <div className="symbol-group symbol-hover flex-nowrap">
                  {projectMembers?.data?.map((response,index) => 
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title={response?.name}  key={index}>
                      {Object?.keys(response)?.length !== 0 && <img alt={response?.name} src={response?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(response?.id)}.jpg`} />}
                    </div>)}
                    {(decryptRole !== role.Member) ? (<span onClick={(e) => { setShowModalBox(true)}} className="symbol symbol-35px symbol-circle" >
                      <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold"> + </span> </span>) : (<span onClick={(e) => { setShowModalBox(true)}} className="symbol symbol-35px symbol-circle" >
                      <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold"> <i className='far fa-eye' /> </span>
                    </span>)}
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalBox && <ProjectMembersModal showModalBox={showModalBox} closeProjectMembersModal={closeProjectMembersModal} worklistId={worklistId} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} projectMembers={projectMembers?.data} masterData={masterData}/>}
    </>
  );
}
export default WorklistNewChart;