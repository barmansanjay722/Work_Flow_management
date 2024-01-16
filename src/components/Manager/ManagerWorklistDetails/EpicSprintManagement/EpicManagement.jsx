import React, { useState } from "react";
import EpicManagementModal from "./EpicManagementModal";
import EpicDetailsModal from "./EpicDetailsModal";

function EpicManagement({epics, worklistId, success, setSuccess}) {
    const [showMainModalBox, setShowMainModalBox] = useState(false);
    const [showEpicDetailsModal, setShowEpicDetailsModal] = useState(false);
    const [modalValues, setModalValues] = useState({ worklist_id: worklistId});
    
    const CloseTaskModal = () => {
        setShowMainModalBox(false);
    };

    return (
        <>
            <div>
                <button type="button" className="btn btn-light-primary ms-4" onClick={(e) => { e.preventDefault(); setShowMainModalBox(true)}}>
                    <i className="fas fa-gear"></i> Epic
                </button>
            </div>
            {showMainModalBox && <EpicManagementModal showMainModalBox={showMainModalBox} setShowMainModalBox={setShowMainModalBox} modalValues={modalValues} setModalValues={setModalValues}  CloseTaskModal={CloseTaskModal} worklistId={worklistId} epics={epics} success={success} setSuccess={setSuccess} setShowEpicDetailsModal={setShowEpicDetailsModal} />} 
            {showEpicDetailsModal && <EpicDetailsModal setShowModalBox={setShowEpicDetailsModal} setSuccess={setSuccess} success={success} showModalBox={showEpicDetailsModal} modalValues={modalValues} setShowMainModalBox={setShowMainModalBox} showMainModalBox={showMainModalBox} />}
        </>
    );
}

export default EpicManagement;
