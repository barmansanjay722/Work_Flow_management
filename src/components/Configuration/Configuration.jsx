import { useContext, useEffect, useState, Link } from "react";
import Select from "react-select";
import AuditingConfiguration from "./AuditingConfiguration";
import CodingConfiguration from "./CodingConfiguration";
import FeedbackCategories from "./FeedbackCategories";
import GeneralConfiguration from "./GeneralConfiguration";
import { fetchMasterOnClientLocation } from "../../services/managerService";
import Configurationcontext from "../../Context/ConfigrationContext/Configurationcontext";
import configurationConstants from "../../apis/configuration/configurationConstants";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import ConfigurationAddNewClientModal from "./ConfigurationAddNewClientModal";

const Configuration = ({selectedLoc, onLocationClick, success, setSuccess, setLocation, location, setClientChange, clientChange,fetchConfigurationData}) => {
    const [showModalBox, setShowModalBox] = useState(false);
    const [successLocation, setSuccessLocation] = useState(false)
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(true)
    
    const handleShow = () => {
        setTimeout(()=>{if(configurationProvider.submitData[configurationConstants.LOCATION_CONFIGURATION]?.locations?.length === 0 || configurationProvider.submitData[configurationConstants.LOCATION_CONFIGURATION]?.locations === undefined){
            const addButton = document.querySelector('.onAddClickButton');
            if (addButton) {
              addButton.dispatchEvent(new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1,
              }));
            }
        }}, 500)
        setShow(true);
    }
    
    const renderClientName = () => {
        return data?.client?.map((data) => ({
          label: data.client_name,
          value: data.id,
        }));
      };
    
      const handleShowclose = () => {
        Swal.fire({
            text: "Are you sure you would like to cancel?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, return",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        
        }).then(function (result) {
            if (result.value) {
                configurationProvider.submitData[configurationConstants.LOCATION_CONFIGURATION].locations = [];
                setShow(false);
            } else if (result) {
            }
        });
    };
    
    const handleModalclose = () => {
        Swal.fire({
            text: "Are you sure you would like to cancel?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, return",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {
                setShowModalBox(false);
            } else if (result) {
            }
        });
    };
    
    const data = useContext(Configurationcontext);
    const configurationProvider = useContext(Configurationcontext)
    const [currentForm, setCurrentForm] = useState(configurationConstants.GENERAL_CONFIGURATION);
    // eslint-disable-next-line no-unused-vars
    const [currentlocation, setCurrentLocation] = useState(configurationConstants.LOCATION_CONFIGURATION);
    const [clientCurrentId, setClientCurrentId] = useState()
    const [isSaving, setIsSaving] = useState(false);
    const [flag, setFlag] = useState(false);
    const Cancel = () =>{ configurationProvider.onformCancel(currentForm)
          setFlag(!flag);
    }

    const handleShowCloseTabs = () => {
        Swal.fire({
            text: "Are you sure you would like to cancel?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, return",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {
                Cancel()
                if(document.querySelector('.location-container .active')) {
                    document.querySelector('.location-container .active').dispatchEvent(new MouseEvent("click", {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        buttons: 1,
                    }))
                }
                setShow(false);
            } else if (result) {
            }
        });
    };

    const submitForm = async () => {
        setIsSaving(true);
        try {
            let response = await configurationProvider.onformSubmit(currentForm,selectedLoc,isChecked,clientCurrentId);
            configurationProvider.setLastLocationUpdated((clientCurrentId !== "0" && clientCurrentId !== undefined) ? selectedLoc : 0);
            response.success ? window.toastr.success(response.message) : window.toastr.error(response.message)
        } catch (e) {
            window.toastr.error("something went wrong", "error")
        }
        setIsSaving(false);
    }
    
    const submitFormLocation = async (props) => {
        setIsSaving(true);
        try {
            let response = await configurationProvider.onformSubmitLocation(currentlocation, props);
            if(response?.success === true){
                setSuccessLocation(!successLocation)
                setShow(false)
            }
            response?.success ? window.toastr.success(response?.message) : window.toastr.error(response?.message)
        } catch (e) {
            window.toastr.error("something went wrong", "error")
        }
        setIsSaving(false);
    }
    
    const handleConfigurationModal = () => {
        setShowModalBox(false);
      };
    
      const handleClientName = async (event) => {
        setIsChecked(true)
        setClientCurrentId(event?.value)
        await fetchClientNameMaster(event?.value);
    };
  
    const fetchClientNameMaster = async (cID, temp) => {
    const response = await fetchMasterOnClientLocation(cID, 0);
    setLocation(response?.locations);
    setTimeout(()=>{triggerFirstLocationClick()}, 500)
  };
  
  const triggerFirstLocationClick = () => {
    if(document.querySelector('.location-container ul:first-child')) {
        document.querySelector('.location-container ul:first-child').dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
        }))
    }
  }
  
//   const handleIsChecked = (event) =>{
//              setIsChecked(event.target.checked)
//   }

  useEffect (() => {
    fetchClientNameMaster(clientCurrentId ?? 0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[success,successLocation])

useEffect (()=>{
    setTimeout(()=>{
        const addButton = document.querySelector('.onAddClickButton');
        if (addButton) {
          addButton.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          }));
    }}, 500)
},[])

useEffect(()=>{
    if(document.querySelector('.location-container .active')) {
        document.querySelector('.location-container .active').dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
        }))
    }
},[flag])

return (
        <>
            <div className="row">
                <div className="col-lg-3">
                    <div className="card card-flush mb-4">
                        <div className="card-header">
                            <div className="card-title">
                                <h4>Client </h4>
                            </div>
                            <div className="card-toolbar m-0">   
							<div className="form-group">
							<button type="button" data-repeater-create="" className="btn btn-sm btn-light " onClick={(e) => {setShowModalBox(true)}}>							
							<i className="fas fa-plus"></i>
							Add</button>
							</div>         
							</div>
                        </div>
                        <div className="card-body p-2 pt-0 px-8">
                        <Select name="" options={renderClientName()} onChange={handleClientName}/>
                        </div>
                    </div>
                    <div className="card card-flush mb-4">
                        <div className="card-header pt-0">
                            <h3 className="card-title align-items-start flex-column mt-0 mb-0">
                                <span className="card-label fw-bold text-gray-800 pt-0">Location</span>
                            </h3>
                            <div className="card-toolbar m-0">
                                <div className="form-group">
                                    {(clientCurrentId !== undefined && clientCurrentId !== "0") ? <button type="button"  className="btn btn-sm btn-light "  onClick={handleShow}
                                        >
                                        <i className="fas fa-plus"></i>
                                        Add</button> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0 hide pb-1">
                            <div className="m-0 location-container">
                                {location?.map((item, value) => (<><ul onClick={()=> onLocationClick(item)} style={{cursor: 'pointer'}} className="nav nav-tabs nav-line-tabs flex-row flex-md-column  fs-6 location-nav border-0 link" role="tablist">
                                    <li className="nav-item p-2" role="presentation">
                                        <Link className={selectedLoc===item.id?"nav-link me-0 active":"nav-link me-0"} data-bs-toggle="tab" aria-selected="false" role="tab" tabIndex="-1">
                                            <div className="d-flex flex-stack flex-row-fluid d-grid gap-2">
                                                <div className="me-5">
                                                    {item?.name}
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="m-0">
                                                        <span className="badge badge-light-light fs-base pe-0">
                                                            <span className="svg-icon svg-icon-muted svg-icon-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z" fill="currentColor" />
                                                            </svg>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul><div className="separator separator-dashed"></div>
                                </>))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="tab-content" id="myTV4593013ontent">
                        <div className="tab-pane fade show active" id="kt_tab_pane_critical"
                            role="tabpanel">
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <ul
                                    className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4 active general" data-bs-toggle="tab"
                                            onClick={() => setCurrentForm(configurationConstants.GENERAL_CONFIGURATION)}
                                            href="#general">General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            onClick={() => setCurrentForm(configurationConstants.FEEDBACK_CONFIGURATION)}
                                            href="#error_category">Feedback Categories</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            onClick={() => setCurrentForm(configurationConstants.AUDITING_CONFIGURATION)}
                                            href="#auditing">Auditing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            onClick={() => setCurrentForm(configurationConstants.CODING_CONFIGURATION)}
                                            href="#coding">Coding</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <GeneralConfiguration clientCurrentId={clientCurrentId} location={location} fetchConfigurationData={fetchConfigurationData}/>
                                    <div className="tab-pane fade" id="error_category" role="tabpanel">
                                        <FeedbackCategories clientCurrentId={clientCurrentId} location={location} fetchConfigurationData={fetchConfigurationData}/>
                                    </div>
                                    <div className="tab-pane fade" id="auditing" role="tabpanel">
                                        <AuditingConfiguration clientCurrentId={clientCurrentId} location={location} fetchConfigurationData={fetchConfigurationData}/>
                                    </div>
                                    <div className="tab-pane fade" id="coding" role="tabpanel">
                                        <CodingConfiguration clientCurrentId={clientCurrentId} location={location} fetchConfigurationData={fetchConfigurationData}/>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-3 previous-location-checkbox" style={{ float: "right" }}>
                                </div>
                                <div className="d-flex justify-content-end">
                                <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="" onClick={handleShowCloseTabs} >Cancel</button>
                                    <button type="submit" disabled={isSaving} id="kt_ecommerce_add_product_submit" className="btn btn-primary"
                                        onClick={submitForm}
                                    >
                                        <span className="indicator-label">{isSaving ? "Please wait..." : "Save"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="kt_tab_pane_high" role="tabpanel">
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <ul
                                    className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab"
                                            href="#general">General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#error_category">Feedback Categories</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#auditing">Auditing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#coding">Coding</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="general" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Processes</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div id="process">
                                                                        <div classN
                                                                            ame="applicant-fields">
                                                                            <div className="form-group">
                                                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                        <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                        <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                            <span className="svg-icon svg-icon-1">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                                    <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" >
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Specialities</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div id="specialities">
                                                                        <div className="applicants-fields">
                                                                            <div className="form-group">
                                                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                        <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                        <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                            <span className="svg-icon svg-icon-1">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                                    <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" id="add-row5">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="error_category" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Primary Diagnosis</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Secondary Diagnosis</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Procedures</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>ED/EM Level</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Modifier</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="auditing" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Audit Options</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Feedback Types</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="coding" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Hold Reasons</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Responsible Parties</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">

                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-end">
                                    <a href="../dist/apps/ecommerce/catalog/products.html"
                                        id="kt_ecommerce_add_product_cancel" className="btn btn-light me-5">Cancel</a>
                                    <button type="submit" id="kt_ecommerce_add_product_submit" className="btn btn-primary">
                                        <span className="indicator-label">Save</span>
                                        <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="kt_tab_pane_medium" role="tabpanel">
                            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                <ul
                                    className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4 active" data-bs-toggle="tab"
                                            href="#general">General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#error_category">Feedback Categories</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#auditing">Auditing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-active-primary pb-4" data-bs-toggle="tab"
                                            href="#coding">Coding</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="general" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">

                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">

                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Processes</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">

                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div id="process">
                                                                        <div className="applicant-fields">
                                                                            <div className="form-group">
                                                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                        <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                        <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                            <span className="svg-icon svg-icon-1">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                                    <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" >
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Specialities</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div id="specialities">
                                                                        <div className="applicants-fields">
                                                                            <div className="form-group">
                                                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                    <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                        <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                        <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                            <span className="svg-icon svg-icon-1">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                                    <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                                </svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" id="add-row5">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="error_category" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Primary Diagnosis</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Secondary Diagnosis</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Procedures</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>ED/EM Level</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header minimize">
                                                            <div className="card-title">
                                                                <h4>Modifier</h4>
                                                            </div>
                                                            <div className="card-toolbar mt-0">
                                                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center ">
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="auditing" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Audit Options</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Feedback Types</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="coding" role="tabpanel">
                                        <div className="d-flex flex-column gap-7 gap-lg-5">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Hold Reasons</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="card card-flush mb-4">
                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h4>Responsible Parties</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body pt-0">
                                                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                                                <div id="kt_ecommerce_add_product_options">
                                                                    <div className="form-group">
                                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                            <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">
                                                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value" placeholder="" />
                                                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                                                                    <span className="svg-icon svg-icon-1">
                                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mt-5">
                                                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light">
                                                                            <span className="svg-icon svg-icon-2">
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                                    <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
                                                                                </svg>
                                                                            </span>
                                                                            Add another</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-3 previous-location-checkbox" style={{ float: "right" }}>
                                    <label className="form-check form-check-custom form-check-inline me-5">
                                        {/* <input className="form-check-input" name="communication[]" checked  type="checkbox" value="1"> */}
                                        <span className="fw-semibold ps-2 fs-6 text-gray-600">
                                            Same as previous location
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div w3-include-html="../include/footer.html"></div>
            <div className="modal-dialog modal-dialog-centered w-300px">
                <Modal show={show} centered>
                    <Modal.Body> 
                        <div id="location">
                            <div className="applicant-fileds">
                                <div className="form-group">
                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                        <div data-repeater-item="" className="form-group flex-wrap align-items-center gap-2">
                                            <div className="form-group mt-5">
                                                <label className="form-label mb-0">Location name</label>
                                                <div className="form-group mt-5">
                                                    {(configurationProvider.submitData[configurationConstants.LOCATION_CONFIGURATION].locations ?? []).map((e, i) => {
                                                        return <div className="form-group mt-5" style={{ display: "flex" }}>
                                                            <input type="text" className="form-control mw-100 w-85" value={configurationProvider?.submitData?.LOCATION_CONFIGURATION?.locations !== undefined ? configurationProvider?.submitData?.LOCATION_CONFIGURATION?.locations[i] : ""} onChange={(e) => configurationProvider.onFieldChange(
                                                                configurationConstants.LOCATION_CONFIGURATION,
                                                                configurationConstants.LOCATION_DATA,
                                                                i, e.target.value,
                                                            )} />
                                                            <button type="button" style={{ marginLeft: "35px" }} className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                configurationConstants.LOCATION_CONFIGURATION,
                                                                configurationConstants.LOCATION_DATA,
                                                                i
                                                            )}> 
                                                                <span className="svg-icon svg-icon-1">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-5">
                            <button type="button" data-repeater-create="" className="btn btn-sm btn-light onAddClickButton"
                                onClick={() => configurationProvider.onAddClick(
                                    configurationConstants.LOCATION_CONFIGURATION,
                                    configurationConstants.LOCATION_DATA,
                                )}
                            >
                                <span className="svg-icon svg-icon-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                                        <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"></rect>
                                    </svg>
                                </span>
                                Add another</button>
                        </div>
                        <div className="text-center pt-8 mt-10">
                            <button type="reset" className="btn btn-light me-3"

                                data-kt-users-modal-action="" onClick={handleShowclose }>Cancel</button>

                            <button type="button" disabled={isSaving} className="btn btn-primary me-4" onClick={() => submitFormLocation(clientCurrentId)}>
                                <span className="indicator-label">{isSaving ? "Please wait..." : "Save"}</span>
                            </button>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="modal fade" id="kt_modal_add_client" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-400px">
                    <div className="modal-content">
                        <div className="modal-body scroll-y my-5">
                            <form id="kt_modal_add_user_form" className="form" action="#">
                                <div id="location">
                                    <div className="applicant-fileds">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-2">
                                                    <label className="form-label mb-0">Add Client</label>
                                                    <input type="text" className="form-control mw-100 w-100" name="product_option_value" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center pt-8 mt-10">
                                    <button type="reset" className="btn btn-light me-3"
                                        data-kt-users-modal-action="" onClick={handleShowclose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary me-4"
                                        data-kt-users-modal-action="submit">
                                        <span className="indicator-label">Save</span>
                                        <span className="indicator-progress">Please wait...
                                            <span
                                                className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showModalBox && <ConfigurationAddNewClientModal handleModalclose={handleModalclose} setShowModalBox={setShowModalBox} setSuccess={setSuccess} success={success} showModalBox={showModalBox} handleConfigurationModal={handleConfigurationModal}/>}
        </>
    );
};
export default Configuration;