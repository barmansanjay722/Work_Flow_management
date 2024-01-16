import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import Select from "react-select";
import "./ManagerReportsStyle.css";

const FilterSection = ({ filterOptionsLoading ,filtersOptions, data, onFilterChange, filterFields, onFilterClick }) => {
    
    const getType = (val) => {
        if(val){
            if (val.toLowerCase() === 'integer') {
                return "number"
            }
            if (val.toLowerCase() === 'string') {
                return "text"
            }
            return val
        }
    }

    const getFilterData = () => {
        let tempFilterFields = []
        let currentDate = new Date()
        let currentMonth = currentDate.getMonth()
        for (let a in filterFields) {
            let item = filterFields[a]
            let options = []
            if (filtersOptions[a]) {
                if (item.filterType === 'select') {
                    filtersOptions[a].forEach((item) => {
                        options.push({
                            label: item.name,
                            value: item.id
                        })
                    })
                }
            }
            tempFilterFields.push(
                <div key={item.label} className="col-lg-3 ">
                    <label className="form-label w-250px">{item.label} </label>
                    {
                        item.filterType.toLowerCase() === "select" ? 
                        <Select  isLoading={filterOptionsLoading} name="colors" className="filterSelect" classNamePrefix="select" value={item.value} options={options} isMulti={item.multiselect} onChange={(e) => { onFilterChange(e, a) }} isClearable={true} />
                        : 
                        ( item.filterType.toLowerCase() === "date" ?
                            <DateRangePicker onApply={(e, j) => {
                                onFilterChange(`${moment(j.startDate).format('L')}-${moment(j.endDate).format('L')}`, a)
                            }}
                                initialSettings={{ startDate: new Date(), endDate: new Date(), maxDate: new Date(currentDate.getFullYear(), currentMonth+1, 0), locale: { cancelLabel: 'Clear' } }}
                                onCancel={() => {handleDatePickerCancel('',a)}}
                            >
                                <p className="form-control text-sm-left" >{filterFields[a].value ? filterFields[a].value : `Select date`}</p>
                            </DateRangePicker>
                            :
                            <input min={item.min?? null} max={item.max?? null} type={getType(item.type)} value={filterFields[a].value} className="form-control " onChange={(e) => {
                                let value = e.target.value;
                                if (item.type.toLowerCase() === 'integer' || item.type.toLowerCase() === 'number') 
                                    value = parseInt(e.target.value);
                                onFilterChange(value, a)
                                }} placeholder="" 
                            />
                        )
                    }
                </div>
            )
        }
        return tempFilterFields
    }
    const handleDatePickerCancel = (value, fieldName) => {
        onFilterChange(value, fieldName);
    };
    
    return (
        <div className="card-body border-0 py-0 minimize reports-filter-section">
            {
                Object.keys(filterFields).length > 0 ?
                <>
                    <div className="row mb-5 horizontal-scrollable">
                        {getFilterData()}
                    </div> <div className="d-flex justify-content-end p-5 " >
                        <button onClick={onFilterClick} className="btn btn-primary fs-6">Filter</button>
                    </div>
                </> 
                : 
                <div className="d-flex justify-content-center pb-20" >No Filters Selected</div>
            }
        </div>
    )
}
export default FilterSection;