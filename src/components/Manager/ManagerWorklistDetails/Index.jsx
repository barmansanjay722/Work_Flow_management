import { useEffect, useState } from "react";
import WorklistDetailsActivity from "./WorklistDetailsActivity";
import AllocateTasks from "./AllocateTasks";
import { getMasterData } from "../../../services/chartService";
import { useLocation } from "react-router-dom";
import WorklistDetailsHeader from "./WorklistDetailsHeader";
import { useNavigate } from "react-router-dom";

function WorklistDetails() {
  const [dependencyForFetchWorklistProgressRerender, setDependencyForFetchWorklistProgressRerender] = useState(true);
  const [changeInWorklist, setChangeInWorklist] = useState(false)
  const [key, setKey] = useState(0);
  const [masterData, setMasterData] = useState();
  const [parentDetails, setParentDetails] = useState();
  const location = useLocation();
  const [query, setQuery] = useState();
  const [worklist, setWorklist] = useState();
  const worklist_id = location?.state?.worklist_id;
  const navigate = useNavigate();

  if(location?.state === null) {
    navigate('/manager-worklist');
  }

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    getMasterData()
      .then((response) => {
        setMasterData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [worklist_id]);
  
  return (
    <>
        <div className="row">
          <WorklistDetailsHeader key={key} worklistId={worklist_id} query={query} setWorklist={setWorklist} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender} masterData={masterData} worklist={worklist} />
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row gy-5 g-xl-10">
              <WorklistDetailsActivity key={key} setChangeInWorklist={setChangeInWorklist} changeInWorklist={changeInWorklist} parentDetails={parentDetails} worklistId={worklist_id} masterData={masterData} worklist={worklist} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender}/>
              <AllocateTasks setParentDetails={setParentDetails} changeInWorklist={changeInWorklist} setChangeInWorklist={setChangeInWorklist} worklistId={worklist_id} masterData={masterData} onQuery={setQuery} dependencyForFetchWorklistProgressRerender={dependencyForFetchWorklistProgressRerender} setDependencyForFetchWorklistProgressRerender={setDependencyForFetchWorklistProgressRerender}/>
            </div>
          </div>
        </div>
    </>
  );
}
export default WorklistDetails;
