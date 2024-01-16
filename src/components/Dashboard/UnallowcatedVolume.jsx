import React, { useContext, useState } from "react";
import AllocationChart from "../Configuration/AllocationChart";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";
import { Grid, PagingPanel, Table, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { IntegratedPaging, PagingState, SelectionState } from "@devexpress/dx-react-grid";
import { useNavigate } from "react-router-dom";
import localStorageStore from "../../utils/localStorageStore";
import role from "../../utils/role";

const UnallocatedVolume = ({unallocatedLoading}) => {

    const { unallocatedGraph } = useContext(DashboardContext)
    const [selection, setSelection] = useState([]);
    const navigate = useNavigate();
    const colors = ["#47BE7D"];
    const yaxisTextAllocation = "Charts (count)"
    const columns = [
        { name: 'worklist_no', title: 'Worklist #' },
        { name: 'chart_received', title: 'Chart Received' },
        { name: 'unallocated', title: 'Unallocated' },
    ];
    const color = ["#F38BA5"]
    const xaxisunallocated = "Worklist"
    const specialityColor = ["#F1BC00"]
    const xaxisTextSpeciality = "Speciality"
    const xaxisTextRecieved = "Date Received"
    const serviceColor = ["#B5B5C3"]
    const xaxisTextservice = "Date of Service"

    const decryptRole = localStorageStore.getRole();
    
    const handleSelection = (e) => {
        setSelection(e)
        const lastSelectedIndex = e.pop()
        const selectedRow = unallocatedGraph?.unallocated_volume[lastSelectedIndex] ?? null
        const selectedWorklistId = selectedRow?.WorklistId ?? null
        if(selectedWorklistId && (decryptRole === role.Manager || decryptRole === role.TeamLead)) {
            navigate("/manager-worklist-details", { state: { worklist_id: selectedWorklistId } })
        }
    }

    return (
        <>
            { unallocatedLoading ? 
                <div className="card d-flex align-items-center justify-content-center h-200px">
                    <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="row mb-10 pb-10">
                    <div className="col-xl-7 mb-5 mb-xl-10">
                        <div className="card-flush h-xl-100">
                            <div className="card-header pt-7">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">By worklist</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6">Count of charts available for allocation worklist wise</span>
                                </h3>
                            </div>
                            <div className="card-body pt-5">
                                <AllocationChart colors={color}
                                    countdata={unallocatedGraph?.by_worklist?.values ?? []}
                                    categories={unallocatedGraph?.by_worklist?.keys ?? []}
                                    xaxisText={xaxisunallocated}
                                    yaxisText={yaxisTextAllocation} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 mb-5 mb-xl-10">
                        <div className="card-flush h-xl-100">
                            <div className="card-header pt-7">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Unallocated volume</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6">View details or click to allocate</span>
                                </h3>
                            </div>
                            <div className="card-body table-dashed pt-5">
                                <div className="table-responsive">
                                    <Grid rows={unallocatedGraph?.unallocated_volume??[]} columns={columns} onClick={(e) =>handleSelection(e) }>
                                        <PagingState
                                            defaultCurrentPage={0}
                                            pageSize={5}
                                        />
                                        <SelectionState
                                            selection={selection}
                                            onSelectionChange={(e) => handleSelection(e)}
                                        />
                                        <IntegratedPaging />
                                        <Table />
                                        <TableHeaderRow   />
                                        <PagingPanel />
                                        <TableSelection
                                            selectByRowClick
                                            highlightRow
                                            showSelectionColumn={false}
                                        />
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12">
                        <div className="card-flush overflow-hidden h-md-100">
                            <div className="card-header py-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">By speciality</span>
                                    <span className="text-gray-400 pt-2 fw-semibold fs-6 d-none">Charts available for allocation speciality wise</span>
                                </h3>
                            </div>
                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                                <AllocationChart colors={specialityColor}
                                    countdata={unallocatedGraph?.by_speciality?.values ?? []}
                                    categories={unallocatedGraph?.by_speciality?.keys ?? []}
                                    xaxisText={xaxisTextSpeciality}
                                    yaxisText={yaxisTextAllocation}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12">
                        <div className="card-flush overflow-hidden h-md-100">
                            <div className="card-header py-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">By date received</span>
                                </h3>
                            </div>
                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                                <AllocationChart colors={colors}
                                    countdata={unallocatedGraph?.by_date_recieved?.values ?? []}
                                    categories={unallocatedGraph?.by_date_recieved?.keys ?? []}
                                    xaxisText={xaxisTextRecieved}
                                    yaxisText={yaxisTextAllocation}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12">
                        <div className="card-flush overflow-hidden h-md-100">
                            <div className="card-header py-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">By date of service</span>
                                </h3>
                            </div>
                            <div className="card-body d-flex justify-content-between flex-column pb-1 px-0 pt-0">
                                <AllocationChart colors={serviceColor}
                                    countdata={unallocatedGraph?.by_date_service?.values ?? []}
                                    categories={unallocatedGraph?.by_date_service?.keys ?? []}
                                    xaxisText={xaxisTextservice}
                                    yaxisText={yaxisTextAllocation}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default UnallocatedVolume;