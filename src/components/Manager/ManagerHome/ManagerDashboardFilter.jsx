import React from "react";
import Select from "react-select";
const ManagerDashboardFilter = () => {
  
  return (
    <div className="row gy-5 g-xl-10">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card card-flush mb-5">
          <div className="card-header py-4 minimize">
            <h3 className="card-title align-items-start flex-column pt-2">
              <span className="card-label fw-bold text-gray-800">Filters</span>
            </h3>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center ms-4 minimize">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="card-body border-0 py-0 collapse">
            <div className="row mb-5">
              <div className="col-lg-3">
                <label className="form-label">Location </label>
                <Select multiple="multiple" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Speciality </label>
                <Select multiple="multiple" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Worklist </label>
                <Select multiple="multiple" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Date Received </label>
                <input className="form-control mb-5" placeholder="" value="" id="kt_daterangepicker_1" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Date of Service </label>
                <input className="form-control mb-5" placeholder="" value="" id="kt_daterangepicker_2" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Coder </label>
                <Select multiple="multiple" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Chart Status </label>
                <Select multiple="multiple" />
              </div>
              <div className="col-lg-3">
                <label className="form-label">Milestone </label>
                <Select multiple="multiple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagerDashboardFilter;
