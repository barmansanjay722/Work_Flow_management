import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ManagerReportPagination from "./ManagerReportPagination";
import FilterSection from "./FilterSection";
import ReportsTemplates from "./ReportsTemplates";
import './ManagerReportsStyle.css'
import ManagerReportsTable from "./ManagerReportsTable";
// import { utils, writeFile } from 'xlsx';
import "./ManagerReportsStyle.css";
import ManagerContext from "../../../Context/ManagerReportContext/ManagerReportContext";
// import managerAPI from "../../../apis/manager/managerAPI";

const ManagerReportFilter = ({ filterOptionsLoading, onDiscard, onTemplateSelect, localFiltersData, filtersOptions, reportsIsLoading, nextPage, templatesList, handleNextPrev, onFilterClick, onChange, filtersData, onFilterSave, onFilterChange, filterFields, onExport }) => {
  const { reportsData, fields } = useContext(ManagerContext);
  const [searchField, setSearchField] = useState('')
  const [data, setData] = useState({})
  
  useEffect(() => {
    window.postMessage({
      "EventName": 'register-datatable',
      "payload": "report-table",
    }, "*")
  }, [reportsData])

  useEffect(() => {
    let tempData = {}
    if (searchField.length > 0) {
      for (let a in localFiltersData) {
        if (filtersData[a].label !== undefined && localFiltersData[a]?.label.toLowerCase().includes(searchField.toLowerCase())) {
          tempData[a] = localFiltersData[a]
        }
      }
      setData(tempData)
    } else {
      setData(localFiltersData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersData, searchField])

  const handleExport = async () => {
    onExport(fields, true);
  }

  useEffect(() => {
    window.KTMenu.init()
  }, [])

  const getTableData = (type) => {
    let filterData = [];
    let duplicateFilters = []
    for (let a in data) {
      let item = data[a];
      if(item.label){
        let payload = <tr key={a}>
          <td>{item.label}</td>
          <td>
            <input
              onChange={(e) => {
                onChange(e.target.value, a);
              }}
              className="form-check-input "
              style={styles.filterCheckbox}
              type="checkbox"
              data-column="0"
              value="report"
              checked={item.reportChecked}
            />
          </td>
          <td>
            { item.key !== 'mr_no' ?
            <input
              onChange={(e) => {
                onChange(e.target.value, a);
              }}
              className="form-check-input"
              style={styles.filterCheckbox}
              type="checkbox"
              data-column="0"
              value="filter"
              checked={item.filterChecked}
            /> : <span title="MR # can not be searched">NA</span>}
          </td>
        </tr>
        if (item.duplicate) {
          duplicateFilters.push(payload)
        } else {
          filterData.push(
            payload
          );

        }
      }
    }
    if (type === 'duplicate') {
      return duplicateFilters
    }
    return filterData;
  }
  
  const onSearchChange = (e) => {
    setSearchField(e.target.value)
  }

  return (
    <>
      <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8 reports-link" role="tablist">
        <li className="nav-item ms-auto template">
          <div className="input-group filter-buttons">
            <button className="btn template-btn filterBtn" style={{ ...styles.filterBtn, }} data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
              <span className="svg-icon svg-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78143" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM11.7 17.7L16 14C16.4 13.6 16.4 12.9 16 12.5C15.6 12.1 15.4 12.6 15 13L11 16L9 15C8.6 14.6 8.4 14.1 8 14.5C7.6 14.9 8.1 15.6 8.5 16L10.3 17.7C10.5 17.9 10.8 18 11 18C11.2 18 11.5 17.9 11.7 17.7Z" fill="#a78143" />
                  <path d="M10.4343 15.4343L9.25 14.25C8.83579 13.8358 8.16421 13.8358 7.75 14.25C7.33579 14.6642 7.33579 15.3358 7.75 15.75L10.2929 18.2929C10.6834 18.6834 11.3166 18.6834 11.7071 18.2929L16.25 13.75C16.6642 13.3358 16.6642 12.6642 16.25 12.25C15.8358 11.8358 15.1642 11.8358 14.75 12.25L11.5657 15.4343C11.2533 15.7467 10.7467 15.7467 10.4343 15.4343Z" fill="#a78143" />
                  <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="#a78143" />
                </svg>
              </span>
              Template
            </button>
            <div className="menu menu-sub menu-sub-dropdown w-400px w-md-400px filter-dropdown template-dropdown" data-kt-menu="true">
              <ReportsTemplates templatesList={templatesList}
                onTemplateSelect={onTemplateSelect} />
              <div className="border">
                <div className="create-new-data p-3">
                  <div className="menu-item px-3 p-3">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <input type="text" className="form-control" placeholder="Enter name" />
                    </div>
                  </div>
                  <div className="menu-item px-3 p-3">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <button className="btn btn-primary btn-sm btn-block">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => {
              onDiscard()
              setSearchField('')
              setData(filtersData)
            }} className="btn filterBtn " style={styles.filterBtn} data-bs-toggle="modal" data-bs-target="#kt_modal_1">
              <span className="svg-icon svg-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78143"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect y="6" width="16" height="3" rx="1.5" fill="#a78143" />
                  <rect opacity="0.3" y="12" width="8" height="3" rx="1.5"
                    fill="#a78143" />
                  <rect opacity="0.3" width="12" height="3" rx="1.5" fill="#a78143" />
                </svg>
              </span>
              Customize
            </button>
            <div className="modal fade  filter-dropdown mt-6" tabIndex="-1" id="kt_modal_1" >
              <div className="modal-dialog">
                <div className="modal-content ">
                  <div className="p-5 d-flex flex-row justify-content-between">
                    <div>
                      <h1>Customize fields</h1>
                      <p className="text-gray-400 mt-1 fw-semibold fs-6">You can select below the columns and filters for your timesheet</p>
                    </div>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                      X
                    </div>
                  </div>
                  <div className="separator border-gray-200"></div>
                  <div className="d-flex justify-content-between p-5">
                    <div></div>
                    <div className="d-flex flex-row w-300px flex-center">
                      <label className="form-label me-3 mt-1 ">Search:</label>
                      <input className="form-control " onChange={onSearchChange} placeholder="" value={searchField} id="kt_daterangepicker_2" />
                    </div>
                  </div>
                  <div className="h-400px scroll-y">
                    <table className="table to-do-table align-middle table-row-dashed fs-6 gy-5 gs-7" id="example">
                      <thead>
                        <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
                          <th className="min-w-80px">FIELD</th>
                          <th className="min-w-80px">ADD TO TIMESHEET</th>
                          <th className="min-w-80px">ADD TO FILTER</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 fw-semibold ">
                        {getTableData('normal')}
                        {getTableData('duplicate')}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center mb-5">
                    <button onClick={() => {
                      onDiscard()
                    }} className="btn btn-secondary me-5" data-bs-dismiss="modal">Discard</button>
                    <button onClick={onFilterSave} className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <Link onClick={handleExport} style={{ ...styles.filterBtn, borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }} href="../assets/reports/report.xlsx" download className="btn filterBtn ">
              <span className="svg-icon svg-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#a78143" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="#a78143" />
                  <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="#a78143" />
                  <path opacity="0.3" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#a78143" />
                </svg>
              </span>
              Export
            </Link>
          </div>
        </li>

      </ul>
      <div className="row gy-5 g-xl-10">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card card-flush mb-5">
            <div className="card-header py-4 minimize">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold text-gray-800">Filters</span>
              </h3>
              <div className="card-toolbar mt-0">
                <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>

            <FilterSection filterOptionsLoading={filterOptionsLoading} filtersOptions={filtersOptions} data={data} filterFields={filterFields} onFilterChange={onFilterChange} onFilterClick={onFilterClick} />
          </div>

          {
            reportsIsLoading ? 
            <div className="card d-flex align-items-center justify-content-center h-200px">
              <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div> 
            : 
            fields && fields.length > 0 && Object.keys(filtersData).length > 0 ?
              <><ManagerReportsTable reportsData={reportsData} filtersData={filtersData} fields={fields} /> </> 
              : 
              <div className="card" style={{ display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center', }}>No timesheet found</div>
          }
          {
            reportsData && reportsData.length > 0 ? 
              <ManagerReportPagination nextPage={nextPage} handleNextPrev={handleNextPrev} /> 
            :
              null
          }

        </div>
      </div>
    </>
  );
};

const styles = {
  filterCheckbox: {
    width: "20px",
    height: "20px",
  },
  filterBtn: {

  },
  hoverClass: {
    background: '#ffc60b',
    color: 'rgba(0, 0, 0, 0.9)',
    border: '2px dashed rgba(240, 163, 26, 0.4)'
  }
};
export default ManagerReportFilter;
