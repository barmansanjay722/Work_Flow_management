import React, { useState } from "react";
import SprintManagementModal from "./SprintManagementModal";
import SprintDetailsModal from "./SprintDetailsModal";

function SprintManagement({sprints, worklistId, success, setSuccess}) {
    const [showMainModalBox, setShowMainModalBox] = useState(false);
    const [showSprintDetailsModal, setShowSprintDetailsModal] = useState(false);
    const [modalValues, setModalValues] = useState({ worklist_id: worklistId});
    const CloseTaskModal = () => {
        setShowMainModalBox(false);
    };

    return (
        <>
            <div>
                <button type="button" className="btn btn-light-primary ms-4" onClick={(e) => { e.preventDefault(); setShowMainModalBox(true)}}>
                    <i className="fas fa-gear"></i> Sprint
                </button>
            </div>
            {showMainModalBox && <SprintManagementModal showMainModalBox={showMainModalBox} setShowMainModalBox={setShowMainModalBox} modalValues={modalValues} setModalValues={setModalValues}  CloseTaskModal={CloseTaskModal} worklistId={worklistId} sprints={sprints} success={success} setSuccess={setSuccess} setShowSprintDetailsModal={setShowSprintDetailsModal} />} 
            {showSprintDetailsModal && <SprintDetailsModal setShowModalBox={setShowSprintDetailsModal} setSuccess={setSuccess} success={success} showModalBox={showSprintDetailsModal} modalValues={modalValues} setShowMainModalBox={setShowMainModalBox} showMainModalBox={showMainModalBox} />}
        </>
    );
}

export default SprintManagement;
