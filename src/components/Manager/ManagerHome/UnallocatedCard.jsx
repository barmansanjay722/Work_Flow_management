import React from "react";
const UnallocatedCard = ({ label, labelValue }) => {
  
  return (
    <div className="card-body p-0 pt-3">
      <div className="m-0 text-center pb-2 pt-2">
        <span className="fw-semibold fs-1 text-white text-center card-label">{labelValue}</span>
        <br />
        <span className="fw-semibold fs-6 text-white text-center card-label opacity-75">{label}</span>
      </div>
    </div>
  );
};
export default UnallocatedCard;
