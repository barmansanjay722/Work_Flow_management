
import Productivity from "./Productivity";
import AllocationStatistics from "./AllocationStatistics";
import GlobalFilterSection from "./GlobalFilterSection";
import UnallocatedVolume from "./UnallowcatedVolume";
import UserStats from "./UserStats";

const Dashboard = ({ filterOptIsLoading, onProductivityFilterClick, setCompletionIsChecked, handleProductivityFilterChange, completionIsChecked, handleAllocatedFilterChange, onAllocationFilterClick, allocationFiterValue, globelFiltersValue, globelFilterClick, handleOnGlobelFilterChange, productivityLoading, allocatedLoading, unallocatedLoading, fetchAllocatedStats, fetchUnallocatedGraph, fetchProductivity,showtable }) => {

    let dateFilterApplied = false;

    if(globelFiltersValue.hasOwnProperty('date_recieved') && globelFiltersValue.date_recieved !== '') {
        dateFilterApplied = true;
    }
    if(globelFiltersValue.hasOwnProperty('date_of_service') && globelFiltersValue.date_of_service !== '') {
        dateFilterApplied = true;
    }

    const infoForDefaultDateApply = () => {
        return !dateFilterApplied ? <span className="fs-7 text-gray-700 mx-2">(By default: Showing last 2 weeks data)</span> : ""
    }

    return (
        <>
            <UserStats showtable={showtable} />
            <GlobalFilterSection filterOptIsLoading={filterOptIsLoading} globelFiltersValue={globelFiltersValue} globelFilterClick={globelFilterClick} handleOnGlobelFilterChange={handleOnGlobelFilterChange} />
            <div className="card card-flush my-5" onClick={(e) => { if(e.target.querySelector('i.fas.fa-plus')) fetchAllocatedStats() }}>
                <div className="card-header py-0 minimize">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-gray-800">
                            Allocation Statistics
                            { infoForDefaultDateApply() }
                        </span>
                    </h3>
                    <div className="card-toolbar mt-0">
                        <button className="btn btn-icon btn-sm btn-light-primary justify-content-center ms-4" onClick={(e) => { e.target.offsetParent.dispatchEvent(new Event('click', { bubbles: true })) }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body border-0 py-0 collapse">
                    <AllocationStatistics filterOptIsLoading={filterOptIsLoading} allocatedLoading={allocatedLoading} completionIsChecked={completionIsChecked} setCompletionIsChecked={setCompletionIsChecked} onAllocationFilterClick={onAllocationFilterClick} allocationFiterValue={allocationFiterValue} handleOnFilterChange={handleAllocatedFilterChange} />
                </div>
            </div>
            <div className="card card-flush my-5" onClick={(e) => { if(e.target.querySelector('i.fas.fa-plus')) fetchUnallocatedGraph() }} >
                <div className="card-header py-0 minimize">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-gray-800">
                            Unallocated Volume
                            { infoForDefaultDateApply() }
                        </span>
                    </h3>
                    <div className="card-toolbar mt-0">
                        <button className="btn btn-icon btn-sm btn-light-primary justify-content-center ms-4" onClick={(e) => { e.target.offsetParent.dispatchEvent(new Event('click', { bubbles: true })) }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body border-0 py-0 collapse">
                    <UnallocatedVolume unallocatedLoading={unallocatedLoading} />
                </div>
            </div>
            <div className="card card-flush my-5" onClick={(e) => { if(e.target.querySelector('i.fas.fa-plus')) fetchProductivity() }} >
                <div className="card-header py-0 minimize">

                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-gray-800">
                            Productivity
                            { infoForDefaultDateApply() }
                        </span>
                    </h3>
                    <div className="card-toolbar mt-0">
                        <button className="btn btn-icon btn-sm btn-light-primary justify-content-center ms-4" onClick={(e) => { e.target.offsetParent.dispatchEvent(new Event('click', { bubbles: true })) }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body border-0 py-0 collapse">
                    <Productivity filterOptIsLoading={filterOptIsLoading} productivityLoading={productivityLoading} onProductivityFilterClick={onProductivityFilterClick} handleProductivityFilterChange={handleProductivityFilterChange} />
                </div>
            </div>
        </>
    )
}
export default Dashboard