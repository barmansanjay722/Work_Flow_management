import React, { useContext, useState } from "react";
import ManagerContext from "../../../Context/ManagerReportContext/ManagerReportContext";
import managerAPI from "../../../apis/manager/managerAPI";

const ReportsTemplates = ({onTemplateSelect}) => {
    const { templatesList, setTemplatesList,  filtersData,
         activeTemplate } = useContext(ManagerContext);
    const [templateName, setTemplateName] = useState('')
    const [createTemplateLoading, setCreateTemplateLoading] = useState(false)
    const [templateLoading, setTemplateLoading] = useState(false)
    const [updateTemplateLoading, setUpdateTemplateLoading] = useState(false)

    const createNewTemplate = async () => {
        if(!templateName){
            window.toastr.error('Template name is required');
            return;
        }
        if(createTemplateLoading){
            return;
        }
        try {
            setCreateTemplateLoading(true)
            let filterDataCopy = filtersData
            let payload = {}
            payload.name = templateName.trim();
            payload.configuration = [];
            for(let a in filterDataCopy){
                let item = filterDataCopy[a];
                payload.configuration.push({
                    key: item.key,
                    filter: item.filterChecked,
                    report: item.reportChecked
                });
            }
            let res = await managerAPI.createReportsTemplate(payload)
            if (res && res.success) {
                window.toastr.success('New template created successfully');

                setTemplateName('')
                setCreateTemplateLoading(false)
                setTemplateLoading(true)
                fetchTemplates()
                setTemplateLoading(false)
            }else {

                window.toastr.error(res.message);

            }
            setCreateTemplateLoading(false)
        } catch (e) {
            setCreateTemplateLoading(false)
            setTemplateLoading(false)
        }
    }

    const fetchTemplates = async () => {
        let res = await managerAPI.getAllTemplates()
        setTemplatesList(res)
    }

    const updateTemplate = async () => {
        try {
            setUpdateTemplateLoading(true)
            let configuration = [];
            for(let a in filtersData){
                let item = filtersData[a];
                configuration.push({
                    id: item.id,
                    key: item.key,
                    report: item.reportChecked,
                    filter: item.filterChecked,
                });
            }
            let res = await managerAPI.updateReportsTemplate({configuration}, activeTemplate)
            if (res && res.success) {
                window.toastr.success(res.message);
            }
            setUpdateTemplateLoading(false)

        } catch (e) {
            setUpdateTemplateLoading(false)
        }
    }
    
    return (
        <>
            <div className="px-7 py-5 d-flex justify-content-between">
                <div className="fs-5 text-dark fw-bold">Timesheet Templates</div>
                <div className="card-toolbar" >
                    <i className="fa fa-close close-template-dropdown" style={{cursor: "pointer"}} onClick={() => { document.querySelector('.btn.template-btn').classList.remove('show'); document.querySelector('.template-dropdown').classList.remove('show') }}></i>
                </div>
            </div>
            <div className="separator border-gray-200"></div>
            <div className="border-dashed border-gray-300 rounded px-5 m-5 pb-7 pt-8" style={{ border: "1px dashed #333" }}>
                <div className="d-flex flex-column">
                    <div className="d-flex align-self-center">

                        <button onClick={updateTemplate} className="btn btn-icon btn-sm btn-primary w-60px me-5" style={{ color: '#414141' }}>{updateTemplateLoading ? <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> :
                            <>Save </>}
                        </button>
                        <div className="flex-grow-1 w-150px">
                            <input required={true} value={templateName} onChange={(e) => {
                                 if( /[^a-zA-Z0-9\-\s_']/.test(e.target.value )) {

                                }else{

                                    setTemplateName(e.target.value)
                                }
                            }} type="text" className="form-control" placeholder="Enter name" />
                        </div>
                        <button className="btn btn-icon btn-sm btn-primary w-100px" onClick={createNewTemplate} style={{
                            borderRadius: 5,
                            color: '#414141',
                            marginLeft: "-10px",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }}>
                            {createTemplateLoading ? <div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> :
                                <><i className="fa-solid fa-save fs-4 me-1" style={{ color: '#414141' }}></i>Save as</>}
                        </button>
                    </div>
                </div>
            </div>
            <div className="scroll-y h-200px mx-10 mb-10">
                <div className="card-body pe-10">
                    <div className="menu-item">
                        <div className="menu-content fs-8 text-dark fw-bold px-3 py-4 text-uppercase">Saved Templates</div>
                    </div>

                    {templateLoading ? <div className="spinner-border text-primary d-flex m-auto mt-18" role="status">
                        <span className="sr-only">Loading...</span></div> : templatesList.map((item) => (
                            <div key={item.id} className="d-flex flex-column justify-content-center flex-grow-1" >
                                <div className="d-flex fs-6 fw-normal align-items-center">
                                    <i className="bullet-dot rounded-2 bg-primary me-3 mb-3"></i>
                                    <p className="text-primary"  style={{ cursor: 'pointer', fontWeight: item.id===activeTemplate?'bold':'normal' }} onClick={() => {
                                        onTemplateSelect(item.id)
                                    }}>{item.name}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )

}
export default ReportsTemplates;

