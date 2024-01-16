import React from "react";
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import { useState } from "react";
import WorklistAddTaskModal from "./WorklistAddTaskModal";

function WorklistTasks({worklistDetail,masterData,worklistId,dependencyForFetchWorklistProgressRerender, setDependencyForFetchWorklistProgressRerender,worklist,projectmemberList}) {

  const [showModalBox, setShowModalBox] = useState(false);
  const navigate = useNavigate();
  const CloseTaskModal = () => {
    setShowModalBox(false);
  };

  const handleRedirect = () => {
    navigate('/', { state: { worklist_id: worklistId, worklist_number : worklist }});
  }

  return (
    <>
      <div className="col-xl-4">
        <div className="card card-flush mb-5 chart-overall-status">
          <div className="card-header py-4">
            <p className="card-title align-items-start flex-column col-5">
              <span className="fw-bold h4">Tasks</span>
              <span className="text-gray-400 mt-1 fw-semibold fs-6">Overall status of tasks in this project</span>
            </p>
            <div className="text-left py-4">
               <button type="button" className="btn btn-light-primary" onClick={handleRedirect}>
               <span className="fs-8 fw-bold"> <i className='far fa-eye' /> </span>
                View Tasks</button>
          </div>
            <div className="text-left py-4">
               <button type="button" className="btn btn-primary" onClick={(e) => { setShowModalBox(true)}}>
                <span className="svg-icon svg-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect><rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor">
                </rect></svg></span>Add Task</button>
          </div>
          </div>
          <div className="card-body pt-6 pb-6">
            <div className="row p-0 ">
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center  rounded py-2">
                <span className="fs-2hx fw-bold text-gray-900 counted" data-kt-countup="true" data-kt-countup-value={worklistDetail?.totalCharts} data-kt-initialized={1}>
                  <CountUp start={0} end={worklistDetail?.totalCharts}></CountUp> 
                  </span>
                  <span className="fs-4 fw-semibold text-success d-block">Total Tasks</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center rounded py-2">
                <span className="fs-2hx fw-bold text-gray-900 counted" data-kt-countup="true" data-kt-countup-value={worklistDetail?.allocatedCharts} data-kt-initialized={1}>
                  <CountUp start={0} end={worklistDetail?.allocatedCharts}></CountUp> 
                  </span>
                  <span className="fs-4 fw-semibold text-primary d-block"> Allocated</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center rounded py-2">
                <span className="fs-2hx fw-bold text-gray-900 counted" data-kt-countup="true" data-kt-countup-value={worklistDetail?.unallocatedCharts} data-kt-initialized={1}>
                  <CountUp start={0} end={worklistDetail?.unallocatedCharts}></CountUp> 
                  </span>
                  <span className="fs-4 fw-semibold text-info d-block">Unallocated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     {
     showModalBox && <WorklistAddTaskModal showModalBox={showModalBox} CloseTaskModal={CloseTaskModal} masterData={masterData} worklistId={worklistId} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender} projectmemberList={projectmemberList}/>
     } 
    </>
  );
}
export default WorklistTasks;
