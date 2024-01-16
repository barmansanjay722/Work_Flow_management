import {useEffect, useState} from 'react'
import WorklistTasks from './WorklistTasks'
import WorklistProgress from './WorklistProgress'
import WorklistNewChart from './WorklistNewChart'
import { fetchWorklistRecord } from '../../../services/managerWorkListService'
const WorklistDetailsHeader = ({worklistId, query, setWorklist,dependencyForFetchWorklistProgressRerender,setDependencyForFetchWorklistProgressRerender,masterData,worklist}) => {
  const [worklistStat, setWorklistStat ] = useState(null);
  const [projectmemberList,setProjectMembersList] = useState();
  const fetchWorklistData = async () => {
  const res = await fetchWorklistRecord(worklistId)
  setWorklistStat(res);
  setWorklist(res?.worklist_no);
  };

  useEffect(() => {
    fetchWorklistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query,dependencyForFetchWorklistProgressRerender]);
  
  return (  
    <>
      <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row gy-5 g-xl-10">
              <div className="col-xl-5">
                <div className="card card-flush mb-6 mb-xl-9 card1 chart_card">
                  <WorklistNewChart worklistDetail={worklistStat} worklistId={worklistId} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender} setProjectMembersList={setProjectMembersList} masterData={masterData}/>
                </div>
              </div>
              <WorklistProgress worklistDetail={worklistStat}/>
              <WorklistTasks worklistDetail={worklistStat} masterData={masterData} worklistId={worklistId}dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender} worklist={worklist} projectmemberList={projectmemberList}/>
            </div>
          </div>
    </>
  )
}
export default WorklistDetailsHeader