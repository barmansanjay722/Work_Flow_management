import React from 'react'
import Select from "react-select";
import localStorageStore from '../../utils/localStorageStore';
import role from '../../utils/role';

function SearchBox({ setAdvancedSearchEndDate, setAdvancedSearchStartDate, triggerFilterOpen, basicSearch, loader, responseObj, handleChart, handleUsers, handleWorklist, handleCheckboxChange, handleAdvancedSearchText, handleGlobalFilterDateTypeChange, handleClearDate, selectBox, advanceSearchOptions, DateRangePicker, handleAdvanceSearchCancel, advanceSearch, triggerFirstChildRadioGrpAdvSearch, advancedSearchKeyword }) {
  const headerSearchEl = document.querySelector('#kt_header_search');
  const wrapperElement = document.querySelector('[data-kt-search-element="wrapper"]');
  const preferencesElement = document.querySelector('[data-kt-search-element="preferences"]');

  const handleGlobalDateApply = (event, picker) => {
    picker.element.val(picker.startDate.format("MM/DD/YYYY") + " - " + picker.endDate.format("MM/DD/YYYY"));
    setAdvancedSearchStartDate(picker.startDate.format("YYYY-MM-DD"));
    setAdvancedSearchEndDate(picker.endDate.format("YYYY-MM-DD"));
    triggerFilterOpen()
  };

  const handleGlobalDateChange = () => {
    triggerFilterOpen()
  }

  const showAdvanceSearch = () => {
    triggerFirstChildRadioGrpAdvSearch();
    wrapperElement?.classList?.add('d-none');
    preferencesElement?.classList?.remove('d-none');
  }
  const hideAdvanceSearch = () => {
    wrapperElement?.classList?.remove('d-none');
    preferencesElement?.classList?.add('d-none');
  }

  const  decryptRole = localStorageStore.getRole();

  return (
    <div>
      <div className="d-flex align-items-stretch ms-2 ms-lg-3">
        <div id="kt_header_search" className="header-search d-flex align-items-stretch" data-kt-search-keypress="true" data-kt-search-min-length={2} data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto" data-kt-menu-overflow="false" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end" >
          <div className="d-flex align-items-center" data-kt-search-element="toggle" id="kt_header_search_toggle" >
            <div className="btn btn-icon btn-active-light-primary w-35px h-35px w-md-40px h-md-40px searchbox">
              <span className="svg-icon svg-icon-1">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="currentColor" /> <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" /> </svg>
              </span>
            </div>
          </div>
          <div data-kt-search-element="content" className="menu menu-sub menu-sub-dropdown p-6 w-475px w-md-475px" >
            <div data-kt-search-element="wrapper">
              <form data-kt-search-element="form" className="w-100 position-relative mb-3" autoComplete="off" onSubmit={(e) => { e.preventDefault() }} >
                <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="currentColor" /> <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" /> </svg>
                </span>
                <input type="text" className="search-input form-control form-control-flush ps-10 search-user-input" onChange={basicSearch} name="keyword" defaultValue="" placeholder="Search..." data-kt-search-element="input" />
                {
                  loader === true && (<span
                    className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0  me-1"
                  >
                    <span className="spinner-border h-15px w-15px align-middle text-gray-400" />
                  </span>)
                }
                <span className="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none" data-kt-search-element="clear" >
                  <span className="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="currentColor" /> <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="currentColor" /> </svg>
                  </span>
                </span>
                {
                  loader === false && (<div className="position-absolute top-50 end-0 translate-middle-y">
                    <div
                      data-kt-search-element="preferences-show"
                      className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1"
                      data-bs-toggle="tooltip"
                      title="Show Advance Search"
                      onClick={showAdvanceSearch}
                    >
                      <span className="svg-icon svg-icon-1">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.3" d="M22.1 11.5V12.6C22.1 13.2 21.7 13.6 21.2 13.7L19.9 13.9C19.7 14.7 19.4 15.5 18.9 16.2L19.7 17.2999C20 17.6999 20 18.3999 19.6 18.7999L18.8 19.6C18.4 20 17.8 20 17.3 19.7L16.2 18.9C15.5 19.3 14.7 19.7 13.9 19.9L13.7 21.2C13.6 21.7 13.1 22.1 12.6 22.1H11.5C10.9 22.1 10.5 21.7 10.4 21.2L10.2 19.9C9.4 19.7 8.6 19.4 7.9 18.9L6.8 19.7C6.4 20 5.7 20 5.3 19.6L4.5 18.7999C4.1 18.3999 4.1 17.7999 4.4 17.2999L5.2 16.2C4.8 15.5 4.4 14.7 4.2 13.9L2.9 13.7C2.4 13.6 2 13.1 2 12.6V11.5C2 10.9 2.4 10.5 2.9 10.4L4.2 10.2C4.4 9.39995 4.7 8.60002 5.2 7.90002L4.4 6.79993C4.1 6.39993 4.1 5.69993 4.5 5.29993L5.3 4.5C5.7 4.1 6.3 4.10002 6.8 4.40002L7.9 5.19995C8.6 4.79995 9.4 4.39995 10.2 4.19995L10.4 2.90002C10.5 2.40002 11 2 11.5 2H12.6C13.2 2 13.6 2.40002 13.7 2.90002L13.9 4.19995C14.7 4.39995 15.5 4.69995 16.2 5.19995L17.3 4.40002C17.7 4.10002 18.4 4.1 18.8 4.5L19.6 5.29993C20 5.69993 20 6.29993 19.7 6.79993L18.9 7.90002C19.3 8.60002 19.7 9.39995 19.9 10.2L21.2 10.4C21.7 10.5 22.1 11 22.1 11.5ZM12.1 8.59998C10.2 8.59998 8.6 10.2 8.6 12.1C8.6 14 10.2 15.6 12.1 15.6C14 15.6 15.6 14 15.6 12.1C15.6 10.2 14 8.59998 12.1 8.59998Z" fill="currentColor" /> <path d="M17.1 12.1C17.1 14.9 14.9 17.1 12.1 17.1C9.30001 17.1 7.10001 14.9 7.10001 12.1C7.10001 9.29998 9.30001 7.09998 12.1 7.09998C14.9 7.09998 17.1 9.29998 17.1 12.1ZM12.1 10.1C11 10.1 10.1 11 10.1 12.1C10.1 13.2 11 14.1 12.1 14.1C13.2 14.1 14.1 13.2 14.1 12.1C14.1 11 13.2 10.1 12.1 10.1Z" fill="currentColor" /> </svg>
                      </span>
                    </div>
                  </div>)
                }
              </form>
              <div className="separator border-gray-200 mb-6" />
              <div className="mb-5" data-kt-search-element="main">
                <div className="d-flex flex-stack fw-semibold mb-4"> </div>
                {Object.keys(responseObj).length !== 0 ? <div className="scroll-y mh-200px mh-lg-325px">
                  <div className="d-flex flex-column">
                    {responseObj?.charts?.map((item) => (
                      <div key={item.id} className="d-flex align-items-center mb-5">
                        <div className="symbol symbol-40px me-4">
                          <span className="symbol-label bg-light">
                            <span className="svg-icon svg-icon-2 svg-icon-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16"><path d="M1 11C1 10.7348 1.10536 10.4804 1.29289 10.2929C1.48043 10.1054 1.73478 10 2 10H4C4.26522 10 4.51957 10.1054 4.70711 10.2929C4.89464 10.4804 5 10.7348 5 11V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V11ZM6 7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H9C9.26522 6 9.51957 6.10536 9.70711 6.29289C9.89464 6.48043 10 6.73478 10 7V14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15H7C6.73478 15 6.48043 14.8946 6.29289 14.7071C6.10536 14.5196 6 14.2652 6 14V7Z"></path><path className="fill-secondary" d="M11.2929 1.29289C11.1054 1.48043 11 1.73478 11 2V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1H12C11.7348 1 11.4804 1.10536 11.2929 1.29289Z"></path></svg>
                            </span>
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <div onClick={() => { handleChart(item?.id) }} style={{ cursor: "pointer" }} className="fs-6 text-gray-800 text-hover-primary fw-semibold" >
                            {item?.chart_no}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-column">
                    {responseObj?.users?.map((item) => (
                      <div key={item.id} className="d-flex align-items-center mb-5">
                        <div className="symbol symbol-40px me-4">
                          <span className="symbol-label bg-light">
                            <span className="svg-icon svg-icon-2 svg-icon-primary">
                              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor" /> <rect opacity="0.3" x={8} y={3} width={8} height={8} rx={4} fill="currentColor" /> </svg>
                            </span>
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <div onClick={() => { handleUsers(item?.id) }} style={{ cursor: "pointer" }} className="fs-6 text-gray-800 text-hover-primary fw-semibold" >
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-column">
                    {responseObj?.worklists?.map((item) => (
                      <div key={item?.id} className="d-flex align-items-center mb-5">
                        <div className="symbol symbol-40px me-4">
                          <span className="symbol-label bg-light">
                            <span className="svg-icon svg-icon-2 svg-icon-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16"><path className="fill-secondary" d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"></path><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path></svg>
                            </span>
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <div onClick={() => { handleWorklist(item?.id) }} style={{ cursor: "pointer" }} className="fs-6 text-gray-800 text-hover-primary fw-semibold" > {item?.worklist_no}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> : <p>No result found</p>}
              </div>
              <div data-kt-search-element="empty" className="text-center d-none">
                <div className="pt-10 pb-10">
                  <span className="svg-icon svg-icon-4x opacity-50">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.3" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="currentColor" /> <path d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z" fill="currentColor" /> <rect x="13.6993" y="13.6656" width="4.42828" height="1.73089" rx="0.865447" transform="rotate(45 13.6993 13.6656)" fill="currentColor" /> <path d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z" fill="currentColor" /> </svg>
                  </span>
                </div>
                <div className="pb-15 fw-semibold">
                  <h3 className="text-gray-600 fs-5 mb-2">No result found</h3>
                  <div className="text-muted fs-7">
                    Please try again with a different query
                  </div>
                </div>
              </div>
            </div>
            <form data-kt-search-element="preferences" className="pt-1 d-none" style={{ zIndex: "1 !important" }} onSubmit={(e) => {e.preventDefault(); advanceSearch()}}>
              <h3 className="fw-semibold text-dark mb-7">Advanced Search</h3>
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <label className="form-check form-check-custom form-check-inline form-check-solid">
                    <input className="form-check-input" type="radio" value="chart_no" name="type" onChange={handleCheckboxChange} />
                    <span className="fw-semibold ps-2 fs-6">Chart</span>
                  </label>
                  {decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Member ? <label className="form-check form-check-custom form-check-inline form-check-solid">
                    <input className="form-check-input" type="radio" value="worklistId" name="type" onChange={handleCheckboxChange} />
                    <span className="fw-semibold ps-2 fs-6">Worklist</span>
                  </label> : ""}
                  {decryptRole === role.Manager || decryptRole === role.TeamLead ? <label className="form-check form-check-custom form-check-inline form-check-solid me-5">
                    <input className="form-check-input" type="radio" value="name" name="type" onChange={handleCheckboxChange} />
                    <span className="fw-semibold ps-2 fs-6">User</span>
                  </label> : ""}
                </div>
              </div>
              <div className="mb-5">
                <input type="text" className="form-control form-control-sm form-control-solid" value={advancedSearchKeyword} onChange={handleAdvancedSearchText} placeholder="Contains the word" name="advance-search-text" autoComplete='off' />
              </div>
              <div className="row mb-5">
                <span>Date Filter:</span>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div>
                    <Select onChange={handleGlobalFilterDateTypeChange} value={selectBox} options={advanceSearchOptions} className="mt-2" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <DateRangePicker initialSettings={{ maxDate: new Date(), autoUpdateInput: false, locale: { cancelLabel: "Clear" }, showDropdowns: true, maxSpan: { "days": 15 } }}
                    onChange={handleGlobalDateChange} onApply={handleGlobalDateApply} onCancel={handleClearDate} style={{ zIndex: "20" }}
                    onShow={() => { headerSearchEl?.setAttribute('data-kt-menu-static', true) }}
                    onHide={() => { headerSearchEl?.setAttribute('data-kt-menu-static', false) }} >
                    <input type="text" disabled={!selectBox?.value} id="global_date_range_picker_el" placeholder="Select Date" className="form-control mt-2" autoComplete="off" />
                  </DateRangePicker>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="reset"
                  className="btn btn-sm btn-light fw-bold btn-active-light-primary me-2"
                  onClick={() => { hideAdvanceSearch(); handleAdvanceSearchCancel() }}
                  data-kt-search-element="preferences-dismiss"
                >
                  Cancel
                </button>
                <button href="#" className="btn btn-sm fw-bold btn-primary" onClick={advanceSearch} data-kt-search-element="advanced-options-form-search" >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox