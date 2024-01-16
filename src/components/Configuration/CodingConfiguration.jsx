import { useContext } from "react";
import Configurationcontext from "../../Context/ConfigrationContext/Configurationcontext";
import configurationConstants from "../../apis/configuration/configurationConstants";
import { deleteButton } from "../../services/chartService";

const CodingConfiguration = ({location,clientCurrentId,fetchConfigurationData}) => {
    const data = useContext(Configurationcontext);
    const configurationProvider = useContext(Configurationcontext)
    const holdReasons = "hold_reasons";
    const responsibleParties = "responsible_parties"
    
    const handleDeleteButton = (name,id,location,cid,key) =>{
        const deletebutton ={
            ClientId : cid,
            LocationId : location,
            key : {[key] : id},
         }
         deleteButton(deletebutton)
         fetchConfigurationData(location)
    }
    
    return (
        <>
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
                                            <div className="form-group mt-5">
                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                    {location?.length !== 0 ? data?.configHoldReasons?.map((item, i) => (
                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                            <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                                value={(configurationProvider.editedData[configurationConstants.CODING_CONFIGURATION][configurationConstants.HOLD_REASON] ?? {})[item.id] ?? item.hold_reason} placeholder={item.hold_reason} onChange={(e) => configurationProvider.onEditFieldChange(
                                                                    configurationConstants.CODING_CONFIGURATION,
                                                                    configurationConstants.HOLD_REASON,
                                                                    item.id,
                                                                    e.target.value
                                                                )}
                                                            />
                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(item?.hold_reason,item?.id,item?.LocationId,clientCurrentId,holdReasons)}}>
                                                                <span className="svg-icon svg-icon-1">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                    </svg>
                                                                </span>

                                                            </button>
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>
                                            <div className="form-group mt-5">
                                                <div className="form-group">
                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                        {(configurationProvider.submitData[configurationConstants.CODING_CONFIGURATION].hold_reasons ?? []).map((e, i) => {
                                                            return <div id="kt_ecommerce_add_product_options">
                                                                <div id="process">
                                                                    <div className="applicant-fields">
                                                                        <div className="form-group">
                                                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                                    <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                        configurationConstants.CODING_CONFIGURATION,
                                                                                        configurationConstants.HOLD_REASON,
                                                                                        i,
                                                                                        e.target.value
                                                                                    )} />
                                                                                    <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                        configurationConstants.CODING_CONFIGURATION,
                                                                                        configurationConstants.HOLD_REASON,
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
                                                configurationConstants.CODING_CONFIGURATION,
                                                configurationConstants.HOLD_REASON,
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
                            <div className="card-header">
                                <div className="card-title">
                                    <h4>Responsible Parties</h4>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                                    <div id="kt_ecommerce_add_product_options">
                                        <div className="form-group mt-5">
                                            <div className="form-group">
                                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                    {location?.length !== 0 ? data.configResponsibleParties.map((item, i) => (
                                                        <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" key={i}>
                                                            <input type="text" className="form-control mw-100 w-85" name="product_option_value"
                                                                value={(configurationProvider.editedData[configurationConstants.CODING_CONFIGURATION][configurationConstants.RESPONSIBLE_PARTIES] ?? {})[item.id] ?? item.resp_party_name} placeholder={item.resp_party_name} onChange={(e) => configurationProvider.onEditFieldChange(
                                                                    configurationConstants.CODING_CONFIGURATION,
                                                                    configurationConstants.RESPONSIBLE_PARTIES,
                                                                    item.id,
                                                                    e.target.value
                                                                )}
                                                            />
                                                            <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={()=>{handleDeleteButton(item?.resp_party_name,item?.id,item?.LocationId,clientCurrentId,responsibleParties)}}>
                                                                <span className="svg-icon svg-icon-1">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect opacity="0.5" x="7.05025" y="15.5356" width="12" height="2" rx="1" transform="rotate(-45 7.05025 15.5356)" fill="currentColor" />
                                                                        <rect x="8.46447" y="7.05029" width="12" height="2" rx="1" transform="rotate(45 8.46447 7.05029)" fill="currentColor" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>
                                            <div className="form-group mt-5">
                                                <div className="form-group">
                                                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                        {(configurationProvider.submitData[configurationConstants.CODING_CONFIGURATION].responsible_parties ?? []).map((e, i) => {
                                                            return <div id="kt_ecommerce_add_product_options">
                                                                <div id="process">
                                                                    <div className="applicant-fields">
                                                                        <div className="form-group">
                                                                            <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                                                                <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5" >
                                                                                    <input type="text" className="form-control mw-100 w-85" onChange={(e) => configurationProvider.onFieldChange(
                                                                                        configurationConstants.CODING_CONFIGURATION,
                                                                                        configurationConstants.RESPONSIBLE_PARTIES,
                                                                                        i,
                                                                                        e.target.value
                                                                                    )} />
                                                                                    <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger" onClick={() => configurationProvider.onDeleteClick(
                                                                                        configurationConstants.CODING_CONFIGURATION,
                                                                                        configurationConstants.RESPONSIBLE_PARTIES,
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
                                                configurationConstants.CODING_CONFIGURATION,
                                                configurationConstants.RESPONSIBLE_PARTIES
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
            </div>
        </>
    )
};
export default CodingConfiguration
