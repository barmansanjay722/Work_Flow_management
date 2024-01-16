import { useContext, useState } from "react";
import Configurationcontext from "../../Context/ConfigrationContext/Configurationcontext";
import configurationConstants from "../../apis/configuration/configurationConstants";
import { deleteButton } from "../../services/chartService";

const GeneralConfiguration = ({ handleClose, location, clientCurrentId, fetchConfigurationData }) => {

    const data = useContext(Configurationcontext);
    const configurationProvider = useContext(Configurationcontext)
    const processes = "processes";
    const specialties = "specialties";
    const [count, setCount] = useState(true) 

   const handleDeleteButton = (id, name , location, clientCurrentId, key) => {
    const deletebutton ={
       ClientId : clientCurrentId,
       LocationId : location,
       key : {[key] : id},
    }
    deleteButton(deletebutton)
    fetchConfigurationData(location !== undefined ? location : 0)
    setCount(!count)
   }

   const displayProcess = () =>{
    return(<div className="card card-flush mb-4">
                                <div className="card-header minimize">
                                    <div className="card-title">
                                        <h4>Processes</h4>
                                    </div>
                                    <div className="card-toolbar mt-0">
                                        <button className="btn btn-icon btn-sm btn-light-gray justify-content-center">
                                            <i className="fas fa-minus" onClick={handleClose}></i>
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
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        {location?.length !== 0 ? data.configrationprocesses.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                                            <input type="text" className="form-control mw-100 w-85" name="product_option_value" value={(configurationProvider.editedData[configurationConstants.GENERAL_CONFIGURATION][configurationConstants.PROCESS_DATA]??{})[item.id]??item.proc_name} placeholder={item.proc_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                                                configurationConstants.GENERAL_CONFIGURATION,
                                                                                configurationConstants.PROCESS_DATA,
                                                                                item.id,
                                                                                e.target.value
                                                                            )}
                                                                            />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => {handleDeleteButton(item?.id,item?.proc_name,item?.LocationId,clientCurrentId,processes)}}>
                                                                                <span className="svg-icon svg-icon-1">
                                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                                    </svg>
                                                                                </span>

                                                                            </button>
                                                                        </div>)) : ""}
                                                                    </div>
                                                                    {(configurationProvider.submitData[configurationConstants.GENERAL_CONFIGURATION]?.processes??[]).map((e,i)=>{
                                                                        return <div id="kt_ecommerce_add_product_options">
                                                                                     <div id="process">
                                                                                         <div className="applicant-fields">
                                                                                             <div className="form-group">
                                                                                                 <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                                     <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                                                         <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                                            configurationConstants.GENERAL_CONFIGURATION,
                                                                                                            configurationConstants.PROCESS_DATA,
                                                                                                            i,e.target.value
                                                                                                        )} />
                                                                                                         <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                                            configurationConstants.GENERAL_CONFIGURATION,
                                                                                                            configurationConstants.PROCESS_DATA,
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
                                                                                                 </div>
                                                                                             </div>
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                    })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-5">
                                                <button type="button" data-repeater-create="" className="btn btn-sm btn-light"  onClick={()=>configurationProvider.onAddClick(
                                                    configurationConstants.GENERAL_CONFIGURATION,
                                                    configurationConstants.PROCESS_DATA
                                                )}>
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
                            </div>)
   }

    return (
        <>
            <div className="tab-pane fade show active" id="general" role="tabpanel">
                <div className="d-flex flex-column gap-7 gap-lg-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            {displayProcess()}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card card-flush mb-4">
                                <div className="card-header minimize">
                                    <div className="card-title">
                                        <h4>Specialities</h4>
                                    </div>
                                    <div className="card-toolbar mt-0">

                                        <button className="btn btn-icon btn-sm btn-light-gray justify-content-center">
                                            <i className="fas fa-minus" onClick={handleClose}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                        <div id="kt_ecommerce_add_product_options" >
                                            <div id="process">
                                                <div className="applicant-fields">
                                                    <div className="form-group">
                                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                {location?.length !== 0 ? data.configrationSpecialities.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                                    <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                                    value={(configurationProvider.editedData[configurationConstants.GENERAL_CONFIGURATION][configurationConstants.SPECIALITY_DATA]??{})[item.id]??item.spec_name} placeholder={item.spec_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                                        configurationConstants.GENERAL_CONFIGURATION,
                                                                        configurationConstants.SPECIALITY_DATA,
                                                                        item.id,
                                                                        e.target.value
                                                                    )}
                                                                    />
                                                                    <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => handleDeleteButton(item?.id,item?.spec_name,item?.LocationId, clientCurrentId, specialties)}>
                                                                        <span className="svg-icon svg-icon-1">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                                <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                            </svg>
                                                                        </span>
                                                                    </button>
                                                                </div>)) : ""}
                                                            </div>
                                                            {(configurationProvider.submitData[configurationConstants.GENERAL_CONFIGURATION]?.specialties??[]).map((e,i)=>{
                                                                        return <div id="kt_ecommerce_add_product_options">
                                                                                     <div id="process">
                                                                                         <div className="applicant-fields">
                                                                                             <div className="form-group">
                                                                                                 <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                                     <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                                                         <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                                            configurationConstants.GENERAL_CONFIGURATION,
                                                                                                            configurationConstants.SPECIALITY_DATA,
                                                                                                            i,e.target.value
                                                                                                        )} />
                                                                                                         <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                                            configurationConstants.GENERAL_CONFIGURATION,
                                                                                                            configurationConstants.SPECIALITY_DATA,
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
                                                                                                 </div>
                                                                                             </div>
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                    })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-5">
                                                <button type="button" data-repeater-create="" className="btn btn-sm btn-light"
                                                onClick={()=>configurationProvider.onAddClick(
                                                    configurationConstants.GENERAL_CONFIGURATION,
                                                    configurationConstants.SPECIALITY_DATA,
                                                )}
                                                 >
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
        </>
    );
};
export default GeneralConfiguration;