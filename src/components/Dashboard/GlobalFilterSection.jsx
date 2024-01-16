import React, { useContext } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";
import moment from "moment";

const GlobalFilterSection = ({ filterOptIsLoading, handleOnGlobelFilterChange, globelFilterClick, globelFiltersValue }) => {
    const { filterOptions } = useContext(DashboardContext)
    
    const handleDatePickerCancel = (value, fieldName) => {
        handleOnGlobelFilterChange(value, fieldName);
    };
    
    return (
        <div className="row gy-5 g-xl-10">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card card-flush mb-5">
                    <div className="card-body border-0 py-4 ">
                        <div className="row">
                            <div className="col-lg-3 mb-4">
                                <label className="form-label">Location </label>
                                <Select isLoading={filterOptIsLoading} id="global-location" options={filterOptions?.loc_name ?? []} onChange={(e) => handleOnGlobelFilterChange(e, 'location')} name="global-location" isMulti={true} />
                            </div>
                            <div className="col-lg-3 mb-4">
                                <label className="form-label">Speciality </label>
                                <Select isLoading={filterOptIsLoading} id="global-speciality" options={filterOptions?.spec_name ?? []} onChange={(e) => handleOnGlobelFilterChange(e, 'speciality')} name="global-speciality" isMulti={true} />
                            </div>
                            <div className="col-lg-2 mb-4">
                                <label className="form-label">Worklist </label>
                                <Select isLoading={filterOptIsLoading} id="global-worklist" options={filterOptions?.worklist ?? []} onChange={(e) => handleOnGlobelFilterChange(e, 'Worklist')} name="global-worklist" isMulti={true} />
                            </div>
                            <div className="col-lg-2 mb-4">
                                <label className="form-label">Date received </label>
                                <DateRangePicker 
                                    onApply={(e, j) => { handleOnGlobelFilterChange(`${moment(j.startDate).format('L')}-${moment(j.endDate).format('L')}`, 'date_recieved') }}
                                    initialSettings={{ startDate: new Date(), endDate: new Date(), maxDate: new Date(), maxSpan: { "days": 15 }, locale: { cancelLabel: 'Clear' } }}
                                    onCancel={() => {handleDatePickerCancel('', 'date_recieved')}}
                                >
                                    <div className="form-control text-sm-left" style={{display: 'block ruby', overflow: 'hidden', paddingRight:'5px'}}>{globelFiltersValue.date_recieved ? globelFiltersValue.date_recieved : `Select date`}</div>
                                </DateRangePicker>
                            </div>
                            <div className="col-lg-2 mb-4">
                                <label className="form-label">Date of service </label>
                                <DateRangePicker 
                                    onApply={(e, j) => { handleOnGlobelFilterChange(`${moment(j.startDate).format('L')}-${moment(j.endDate).format('L')}`, 'date_of_service') }}
                                    initialSettings={{ startDate: new Date(), endDate: new Date(), maxDate: new Date(), maxSpan: { "days": 15 }, locale: { cancelLabel: 'Clear' } }}
                                    onCancel={() => {handleDatePickerCancel('', 'date_of_service')}}
                                >
                                    <p className="form-control text-sm-left" style={{display: 'block ruby', overflow: 'hidden', paddingRight:'5px'}}>{globelFiltersValue.date_of_service ? globelFiltersValue.date_of_service : `Select date`}</p>
                                </DateRangePicker>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end p-5 " >
                            <button onClick={globelFilterClick} className="btn btn-primary fs-6">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GlobalFilterSection;