import React, { useContext } from "react";
import AllocationChart from "../Configuration/AllocationChart";
import WorklistChart from "../Configuration/ WorklistChart";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";
import moment from "moment";

const AllocationStatistics = ({filterOptIsLoading, allocatedLoading, handleOnFilterChange,setCompletionIsChecked, completionIsChecked,onAllocationFilterClick, allocationFiterValue }) => {
    const { allocatedStatsData, filterOptions } = useContext(DashboardContext)
    // const currentDate = new Date()
    // const currentMonth = currentDate.getMonth()
    const colors = ["#47BE7D"];
    const xaxisTextAllocation = "Milestone"
    const yaxisTextAllocation = "Charts (count)"
    const xaxisTextProgress = "Received Dates"
    const yaxisTextWorklist = "worklist"
    const xaxisTextWorklist = "Status"
    const worklistcolor = ["#e9e6e1"]
    const color = ["#F38BA5"]
    
    const handleDatePickerCancel = (value, fieldName) => {
        handleOnFilterChange(value, fieldName);
    };
    
    return (
        <>
            <div className="row mt-8">
                <div className="col-lg-2 mb-4">
                    <label className="form-label">Coder </label>
                    <Select isLoading={filterOptIsLoading} id="hold-reason" onChange={(e) => handleOnFilterChange(e, 'coder')} options={filterOptions?.coder_name ?? []} name="DispositionId" isMulti={true} />
                </div>
                <div className="col-lg-2 mb-4">
                    <label className="form-label">Auditor </label>
                    <Select isLoading={filterOptIsLoading} id="hold-reason" onChange={(e) => handleOnFilterChange(e, 'auditor')} options={filterOptions?.auditor_name ?? []} name="DispositionId" isMulti={true} />
                </div>
                <div className="col-lg-3 mb-4">
                    <label className="form-label">Milestone </label>
                    <Select isLoading={filterOptIsLoading} id="hold-reason" onChange={(e) => handleOnFilterChange(e, 'milestone')} options={filterOptions?.milestone_name ?? []} name="DispositionId" isMulti={true} />
                </div>

                <div className="col-lg-3 mb-4">
                    <label className="form-label">Date of Allocation </label>
                    <DateRangePicker 
                        onApply={(e, j) => { handleOnFilterChange(`${moment(j.startDate).format('L')}-${moment(j.endDate).format('L')}`, 'date_of_allocation') }}
                        initialSettings={{ startDate: new Date(), endDate: new Date(), maxDate: new Date(), maxSpan: { "days": 15 }, locale: { cancelLabel: 'Clear' } }}
                        onCancel={() => {handleDatePickerCancel('', 'date_of_allocation')}}
                    >
                        <p className="form-control text-sm-left" style={{display: 'block ruby', overflow: 'hidden', paddingRight:'5px'}}>{allocationFiterValue.date_of_allocation ? allocationFiterValue.date_of_allocation : `Select date`}</p>

                    </DateRangePicker>
                </div>
                <div className="col-lg-2 mb-4">
                    <label className="form-label">Chart status </label>
                    <Select isLoading={filterOptIsLoading} id="hold-reason" onChange={(e) => handleOnFilterChange(e, 'chart_status')} options={filterOptions?.status_name ?? []} name="DispositionId" isMulti={true} />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-md-4 col-12">
                    <label className="form-label">Date of Completion </label>
                    <div className="form-check form-check-sm form-check-custom form-check-solid  mb-5">
                        <input checked={completionIsChecked} className="form-check-input action-checkbox me-2 completion-checkbox  mb-5" type="checkbox" value="1" onChange={(e) => {
                            setCompletionIsChecked(!completionIsChecked)
                        }} /> <span className="mb-5">Empty</span>
                    </div>
                </div>
                <div className="col-lg-3 completion-date show">
                    <label className="form-label">Select date of completion </label>
                    {completionIsChecked ?
                        <p className="form-control text-sm-left"  style={{background: 'rgba(204, 204, 204, 0.5)'}}>{allocationFiterValue.date_of_completion ? allocationFiterValue.date_of_completion : `Select date`}</p>

                        : <DateRangePicker 
                            onApply={(e, j) => { handleOnFilterChange(`${moment(j.startDate).format('L')}-${moment(j.endDate).format('L')}`, 'date_of_completion') }}
                            initialSettings={{ startDate: new Date(), endDate: new Date(), maxDate: new Date(), maxSpan: { "days": 15 }, locale: { cancelLabel: 'Clear' } }}
                            onCancel={() => {handleDatePickerCancel('', 'date_of_completion')}}
                        >
                            <p className="form-control text-sm-left"  style={{display: 'block ruby', overflow: 'hidden', paddingRight:'5px'}} >{allocationFiterValue.date_of_completion ? allocationFiterValue.date_of_completion : `Select date`}</p>
                        </DateRangePicker>}
                </div>
                <div className="d-flex justify-content-end p-5 " >
                    <button onClick={onAllocationFilterClick} className="btn btn-primary fs-6">Filter</button>
                </div>
            </div>
            { allocatedLoading ? 
                <div className="card d-flex align-items-center justify-content-center h-200px">
                    <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="row mb-0 pb-2">
                    <div className="col-xl-6 col-lg-12 col-md-12">
                        <div className="card-flush overflow-hidden h-md-100">
                            <div className="card-header py-5">
                                <h3 className="card-title align-items-start flex-column" >
                                    <span className="card-label fw-bold text-dark" >Charts by
                                        milestone</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Volume
                                        sitting at various milestones</span>
                                </h3>
                            </div>
                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                                    <AllocationChart colors={colors}
                                        countdata={allocatedStatsData?.milestone_chart?.values ?? []}
                                        categories={allocatedStatsData?.milestone_chart?.keys ?? []}
                                        xaxisText={xaxisTextAllocation}
                                        yaxisText={yaxisTextAllocation}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 mb-5 mb-xl-10">
                        <div className="card-flush h-xl-100">
                            <div className="card-header pt-7">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Chart completion</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Incomplete
                                        vs
                                        Complete</span>
                                </h3>
                            </div>
                            <WorklistChart
                                id={"completion-chart"}
                                data={[
                                    {
                                        category: allocatedStatsData?.chart_completion?.keys[0] ?? 'Open',
                                        value: allocatedStatsData?.chart_completion?.values[0] ?? 0,
                                        absoluteValue: allocatedStatsData?.chart_completion?.absoluteValues[0] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#ffc60b",
                                        },
                                    },
                                    {
                                        category: allocatedStatsData?.chart_completion?.keys[1] ?? 'Completed',
                                        value: allocatedStatsData?.chart_completion?.values[1] ?? 0,
                                        absoluteValue: allocatedStatsData?.chart_completion?.absoluteValues[1] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#50CD89"
                                        },
                                    },
                                    {
                                        category: allocatedStatsData?.chart_completion?.keys[2] ?? 'Incomplete',
                                        value: allocatedStatsData?.chart_completion?.values[2] ?? 0,
                                        absoluteValue: allocatedStatsData?.chart_completion?.absoluteValues[2] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#e42135"
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3 mb-5 mb-xl-10">
                        <div className="card-flush h-xl-100">
                            <div className="card-header pt-7">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Quality control</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Auditing QC
                                        status</span>
                                </h3>
                            </div>
                            <WorklistChart
                                id={"quality-chart"}
                                data={[
                                    {
                                        category: allocatedStatsData?.quality_control?.keys[2]??'Un-audited',
                                        value: allocatedStatsData?.quality_control?.values[2]?? 0,
                                        absoluteValue: allocatedStatsData?.quality_control?.absoluteValues[2] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#ffc60b",
                                        },
                                    },
                                    {
                                        category: allocatedStatsData?.quality_control?.keys[0]??'Agree',
                                        value: allocatedStatsData?.quality_control?.values[0]?? 0,
                                        absoluteValue: allocatedStatsData?.quality_control?.absoluteValues[0] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#50CD89",
                                        },
                                    },
                                    {
                                        category: allocatedStatsData?.quality_control?.keys[1]??'Feedback',
                                        value: allocatedStatsData?.quality_control?.values[1]?? 0,
                                        absoluteValue: allocatedStatsData?.quality_control?.absoluteValues[1] ?? 0,
                                        full: 100,
                                        columnSettings: {
                                            fillOpacity: 1,
                                            fill: "#e42135",
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-12 col-md-12">
                        <div className="card-flush overflow-hidden h-md-100">
                            <div className="card-header py-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Progress to date</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Chart
                                        progress
                                        from date of allocation</span>
                                </h3>
                            </div>
                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                                <AllocationChart colors={color}
                                    countdata={allocatedStatsData?.progress_to_date?.values ?? []}
                                    categories={allocatedStatsData?.progress_to_date?.keys ?? []}
                                    xaxisText={xaxisTextProgress}
                                    yaxisText={yaxisTextAllocation} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12">
                        <div className="card-flush h-xl-100">
                            <div className="card-header pt-7">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Worklist by status</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6">Number of worklists at various stages</span>
                                </h3>
                            </div>
                            <div className="card-body pt-5">
                                <AllocationChart colors={worklistcolor}
                                    countdata={allocatedStatsData?.worklist_by_status?.values ?? []}
                                    categories={allocatedStatsData?.worklist_by_status?.keys ?? []}
                                    xaxisText={xaxisTextWorklist}
                                    yaxisText={yaxisTextWorklist}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default AllocationStatistics;