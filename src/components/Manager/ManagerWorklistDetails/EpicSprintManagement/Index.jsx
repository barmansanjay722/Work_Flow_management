import React, {useState, useEffect} from 'react';
import EpicManagement from "./EpicManagement";
import SprintManagement from "./SprintManagement";
import { fetchProjectEpicsAndSprints } from "../../../../services/managerWorkListService";
import './ManagementDetailsModal.css';

function EpicSprintIndex({worklistId}) {

    const [epics, setEpics] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchProjectEpicsAndSprints(worklistId).then(response=> {
          setEpics(response?.data?.epics);
          setSprints(response?.data?.sprints);
        })
    }, [worklistId, success]);

    return (
        <div className="d-flex pt-2">
            <EpicManagement  epics={epics} worklistId={worklistId} success={success} setSuccess={setSuccess}/>
            <SprintManagement  sprints={sprints} worklistId={worklistId} success={success} setSuccess={setSuccess}/>
        </div>
    )
}

export default EpicSprintIndex