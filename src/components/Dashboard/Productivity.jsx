import React, { useContext } from "react";
import AllocationChart from "../Configuration/AllocationChart";
import Select from "react-select";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";

const Productivity = ({ filterOptIsLoading, productivityLoading, handleProductivityFilterChange, onProductivityFilterClick }) => {
    const { filterOptions, productivityGraphData } = useContext(DashboardContext)
    const { volumeDay, rework, avgTimeCode } = productivityGraphData
    
    return (
        <>
        <div className="row mt-8">
            <div className="col-lg-4 mb-4">
                <label className="form-label">Coder </label>
                <Select isLoading={filterOptIsLoading} id="productivity_coder" onChange={(e) => handleProductivityFilterChange(e, 'coder')} options={filterOptions?.coder_name ?? []} name="CoderId" isMulti={true} />
            </div>
            <div className="col-lg-8 mb-4">
                <label className="form-label">Hold reason </label>
                <Select isLoading={filterOptIsLoading} id="hold-reason" onChange={(e) => handleProductivityFilterChange(e, 'hold_reason')} options={filterOptions?.hold_reason ?? []} name="HoldReasonId" isMulti={true} />
            </div>
        </div>
        <div className="d-flex justify-content-end p-5 " >
            <button onClick={() => {onProductivityFilterClick()}} className="btn btn-primary fs-6">Filter</button>
        </div>
        { productivityLoading ?
            <div className="card d-flex align-items-center justify-content-center h-200px">
                <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> 
            :
            <div className="row mb-10 pb-10">
                <div className="col-xl-4 col-lg-12 col-md-12">
                    <div className="card-flush overflow-hidden h-md-100">
                        <div className="card-header py-7">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-dark">Average time to code a chart</span>
                                <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Avg coding time by speciality</span>
                            </h3>
                        </div>
                        <div className="card-body d-flex justify-content-between flex-column pb-5 px-0 pt-0">
                            <AllocationChart colors={["#50CD89"]}
                                countdata={avgTimeCode?.value ?? []}
                                categories={avgTimeCode?.spec_name ?? []}
                                xaxisText={"Speciality"}
                                yaxisText={"Time(minutes)"}
                                type={"area"}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12">
                    <div className="card-flush overflow-hidden h-md-100">
                        <div className="card-header py-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-dark">Volume per day</span>
                                <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Count of charts coded</span>
                            </h3>
                        </div>
                        <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                            <AllocationChart colors={["#cad679"]}
                                countdata={volumeDay?.value ?? []}
                                categories={volumeDay?.spec_name ?? []}
                                xaxisText={"Speciality"}
                                yaxisText={"Charts(count)"}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12">
                    <div className="card-flush overflow-hidden h-md-100">
                        <div className="card-header py-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-dark">Rework</span>
                                <span className="text-gray-400 pt-2 fw-semibold fs-6">Rework indicates any charts that have been returned by an Auditor to be reworked.</span>
                            </h3>
                        </div>
                        <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                            <AllocationChart colors={["#bed1db"]}
                                countdata={rework?.value ?? []}
                                categories={rework?.spec_name ?? []}
                                xaxisText={"Speciality"}
                                yaxisText={"Audited charts(%)"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
export default Productivity