import { useContext } from "react";
import Configurationcontext from "../../Context/ConfigrationContext/Configurationcontext";
import configurationConstants from "../../apis/configuration/configurationConstants";
import { deleteButton } from "../../services/chartService";

const FeedbackCategories = ({location,clientCurrentId,fetchConfigurationData}) => {

    const data = useContext(Configurationcontext);
    const configurationProvider = useContext(Configurationcontext)
    const primaryDiagnosis = "primary_diagnosis";
    const secondaryDiagnosis = "secondary_diagnosis";
    const procedures = "procedures";
    const edEmLevel = "ed_em_level";
    const modifier = "modifier";

    const handleDeleteButton = (clientCurrentId,id,name,location,key) =>{
        const deletebutton ={
            ClientId : clientCurrentId,
            LocationId : location,
            key : {[key] : id},
         }
         deleteButton(deletebutton)
         fetchConfigurationData(location)
    }
    
    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card card-flush mb-4">
                        <div className="card-header minimize">
                            <div className="card-title">
                                <h4>Primary Diagnosis</h4>
                            </div>
                            <div className="card-toolbar mt-0">
                                <button className="btn btn-icon btn-sm btn-light-gray justify-content-center">
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                <div id="kt_ecommerce_add_product_options">
                                    <div className="form-group">
                                        <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                            {location?.length !== 0 ? data.configprimaryDiagnosis.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                 value={(configurationProvider.editedData[configurationConstants.FEEDBACK_CONFIGURATION][configurationConstants.PRIMARY_DIAGNOSIS]??{})[item.id]??item.feedback_name} placeholder={item.feedback_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                    configurationConstants.FEEDBACK_CONFIGURATION,
                                                    configurationConstants.PRIMARY_DIAGNOSIS,
                                                    item.id,
                                                    e.target.value
                                                )}
                                                />
                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(clientCurrentId,item?.id,item?.feedback_name,item?.LocationId,primaryDiagnosis)}}>
                                                    <span className="svg-icon svg-icon-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>)) : ""}
                                        </div>
                                    </div>
                                    <div className="form-group mt-5">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                {(configurationProvider.submitData[configurationConstants.FEEDBACK_CONFIGURATION].primfeed ?? []).map((e, i) => {
                                                    return <div id="kt_ecommerce_add_product_options">
                                                        <div id="process">
                                                            <div className="applicant-fields">
                                                                <div className="form-group">
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                            <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.PRIMARY_DIAGNOSIS,
                                                                                i,
                                                                                e.target.value
                                                                            )} />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.PRIMARY_DIAGNOSIS,
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
                                    <div className="form-group mt-5">
                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" onClick={() => configurationProvider.onAddClick(
                                            configurationConstants.FEEDBACK_CONFIGURATION,
                                            configurationConstants.PRIMARY_DIAGNOSIS,
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
                                            {location?.length !== 0 ? data.configSecondaryDiagnosis.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                  value={(configurationProvider.editedData[configurationConstants.FEEDBACK_CONFIGURATION][configurationConstants.SECONDARY_DIAGNOSIS]??{})[item.id]??item.feedback_name} placeholder={item.feedback_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                    configurationConstants.FEEDBACK_CONFIGURATION,
                                                    configurationConstants.SECONDARY_DIAGNOSIS,
                                                    item.id,
                                                    e.target.value
                                                )}
                                                />
                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(clientCurrentId,item?.id,item?.feedback_name,item?.LocationId,secondaryDiagnosis)}}>

                                                    <span className="svg-icon svg-icon-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                        </svg>
                                                    </span>

                                                </button>
                                            </div>)) : ""}
                                        </div>
                                        <div className="form-group mt-5">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                {(configurationProvider.submitData[configurationConstants.FEEDBACK_CONFIGURATION].sec_diag_feed ?? []).map((e, i) => {
                                                    return <div id="kt_ecommerce_add_product_options">
                                                        <div id="process">
                                                            <div className="applicant-fields">
                                                                <div className="form-group">
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                            <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.SECONDARY_DIAGNOSIS,
                                                                                i,
                                                                                e.target.value
                                                                            )} />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.SECONDARY_DIAGNOSIS,
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
                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" onClick={() => configurationProvider.onAddClick(
                                            configurationConstants.FEEDBACK_CONFIGURATION,
                                            configurationConstants.SECONDARY_DIAGNOSIS,
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
                                            {location?.length !== 0 ? data.configProcedures.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                   value={(configurationProvider.editedData[configurationConstants.FEEDBACK_CONFIGURATION][configurationConstants.PROCEDURES]??{})[item.id]??item.feedback_name} placeholder={item.feedback_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                    configurationConstants.FEEDBACK_CONFIGURATION,
                                                    configurationConstants.PROCEDURES,
                                                    item.id,
                                                    e.target.value
                                                )}
                                                />
                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(clientCurrentId,item?.id,item?.feedback_name,item?.LocationId,procedures)}}>
                                                    <span className="svg-icon svg-icon-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                        </svg>
                                                    </span>

                                                </button>
                                            </div>)) : ""}
                                        </div>
                                        <div className="form-group mt-5">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                {(configurationProvider.submitData[configurationConstants.FEEDBACK_CONFIGURATION].procedure_feed ?? []).map((e, i) => {
                                                    return <div id="kt_ecommerce_add_product_options">
                                                        <div id="process">
                                                            <div className="applicant-fields">
                                                                <div className="form-group">
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                            <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.PROCEDURES,
                                                                                i,
                                                                                e.target.value
                                                                            )} />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.PROCEDURES,
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
                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" onClick={() => configurationProvider.onAddClick(
                                            configurationConstants.FEEDBACK_CONFIGURATION,
                                            configurationConstants.PROCEDURES,
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
                                            {location?.length !== 0 ? data.configEd.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                   value={(configurationProvider.editedData[configurationConstants.FEEDBACK_CONFIGURATION][configurationConstants.EDM_LEVEL]??{})[item.id]??item.feedback_name} placeholder={item.feedback_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                    configurationConstants.FEEDBACK_CONFIGURATION,
                                                    configurationConstants.EDM_LEVEL,
                                                    item.id,
                                                    e.target.value
                                                )}
                                                />
                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(clientCurrentId,item?.id,item?.feedback_name,item?.LocationId,edEmLevel)}}>
                                                    <span className="svg-icon svg-icon-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>)) : ""}
                                        </div>
                                        <div className="form-group mt-5">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                {(configurationProvider.submitData[configurationConstants.FEEDBACK_CONFIGURATION].ed_em_feed ?? []).map((e, i) => {
                                                    return <div id="kt_ecommerce_add_product_options">
                                                        <div id="process">
                                                            <div className="applicant-fields">
                                                                <div className="form-group">
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                            <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.EDM_LEVEL,
                                                                                i,
                                                                                e.target.value
                                                                            )} />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.EDM_LEVEL,
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
                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" onClick={() => configurationProvider.onAddClick(
                                            configurationConstants.FEEDBACK_CONFIGURATION,
                                            configurationConstants.EDM_LEVEL,
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
                                            {location?.length !== 0 ? data.configModifier.map((item, i) => (<div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                    value={(configurationProvider.editedData[configurationConstants.FEEDBACK_CONFIGURATION][configurationConstants.MODIFIER]??{})[item.id]??item.feedback_name} placeholder={item.feedback_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                        configurationConstants.FEEDBACK_CONFIGURATION,
                                                        configurationConstants.MODIFIER,
                                                        item.id,
                                                        e.target.value
                                                    )}
                                                />
                                                <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(clientCurrentId,item?.id,item?.feedback_name,item?.LocationId,modifier)}}>
                                                    <span className="svg-icon svg-icon-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                            <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>)) : ""}
                                        </div>
                                        <div className="form-group mt-5">
                                        <div className="form-group">
                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                {(configurationProvider.submitData[configurationConstants.FEEDBACK_CONFIGURATION].modifier_feed ?? []).map((e, i) => {
                                                    return <div id="kt_ecommerce_add_product_options">
                                                        <div id="process">
                                                            <div className="applicant-fields">
                                                                <div className="form-group">
                                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                            <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.MODIFIER,
                                                                                i,
                                                                                e.target.value
                                                                            )} />
                                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                configurationConstants.FEEDBACK_CONFIGURATION,
                                                                                configurationConstants.MODIFIER,
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
                                        <button type="button" data-repeater-create="" className="btn btn-sm btn-light" onClick={() => configurationProvider.onAddClick(
                                            configurationConstants.FEEDBACK_CONFIGURATION,
                                            configurationConstants.MODIFIER,
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
                    </div>
                </div>
            </div>
        </>
    )
};
export default FeedbackCategories

