import React, {  useState } from 'react'
import Configurationcontext from './Configurationcontext';
import configurationAPI from '../../apis/configuration/configurationAPI';
import configurationConstants from '../../apis/configuration/configurationConstants';

const ConfigurationContextProvider = ({ children }) => {
    
    const [messageSave, setMessageSave] = useState('Save');
    const [saveConfiguration, setSaveConfiguration] = useState({});
    const [resetForm, setResetForm] = useState(configurationConstants.GENERAL_CONFIGURATION);
    const [locationData, setLocationData] = useState([])
    const [lastLocationUpdated, setLastLocationUpdated] = useState(null)
    const [client, setClient] = useState([])
    const [configrationprocesses, setConfigrationProcesses] = useState([])
    const [configrationSpecialities, setConfigrationSpecialities] = useState([])
    const [configprimaryDiagnosis, setConfigprimaryDiagnosis] = useState([])
    const [configSecondaryDiagnosis, setConfigSecondaryDiagnosis] = useState([])
    const [configProcedures,setConfigProcedures]=useState([])
    const [configEd,setConfigEd]=useState([])
    const [configModifier,setConfigModifier]=useState([])
    const [configAuditOptions,setConfigAuditOptions]=useState([])
    const [configFeedbackTypes,setConfigFeedbackTypes]=useState([])
    const [configHoldReasons,setConfigHoldReasons]=useState([])
    const [configResponsibleParties,setConfigResponsibleParties]=useState([])
    const [submitData,setSubmitData] = useState({
        LOCATION_CONFIGURATION:{},
        GENERAL_CONFIGURATION:{},
        FEEDBACK_CONFIGURATION:{},
        AUDITING_CONFIGURATION:{},
        CODING_CONFIGURATION:{},
        TASKS:{}
    });

    const [editedData,setEditedData] = useState({
        GENERAL_CONFIGURATION:{},
        FEEDBACK_CONFIGURATION:{},
        AUDITING_CONFIGURATION:{},
        CODING_CONFIGURATION:{}
    });

    const onAddClick = (form,key) => {
        let formData = submitData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        if(dataField === undefined) dataField = [];
        dataField = [...dataField,""];
        formData[key] = dataField;
        submitData[form] = formData;
        setSubmitData({...submitData});
    }

    const onAddClickForTasks = (form,key,key1) => {
        let formData = submitData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        let dataField1 = formData[key1];
        if(dataField === undefined) dataField = [];
        if(dataField1 === undefined) dataField1 = [];
        dataField = [...dataField,""];
        dataField1 = [...dataField1,""];
        formData[key] = dataField;
        formData[key1] = dataField1;
        submitData[form] = formData;
        setSubmitData({...submitData});
    }

    const emptyData = () => {
        let localEditData = editedData;
        localEditData[resetForm] = {};
        setEditedData({
            ...localEditData
        });
        let localSubmitData = submitData;
        localSubmitData[resetForm] = {};
        setSubmitData({
            ...localSubmitData
        })
    }

    const onDeleteClick = (form,key,index) => {
        let formData = submitData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        if(dataField === undefined){
            dataField = [];
        }else{
            dataField.splice(index,1);
        }
        formData[key] = dataField;
        submitData[form] = formData;
        setSubmitData({...submitData});
    }

    const onDeleteClickForTasks = (form,key,key1,index) => {
        let formData = submitData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        let dataField1 = formData[key1];
        if(dataField === undefined){
            dataField = [];
        }else{
            dataField.splice(index,1);
        }

        if(dataField1 === undefined){
            dataField1 = [];
        }else{
            dataField1.splice(index,1);
        }
        formData[key] = dataField;
        formData[key1] = dataField1;
        submitData[form] = formData;
        setSubmitData({...submitData});
    }

    const onFieldChange = (form,key,index,value) => {
        let formData = submitData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        if(dataField === undefined){
            dataField = [];
        }else{
            dataField[index] = value;
        }
        formData[key] = dataField;
        submitData[form] = formData;
        setSubmitData({...submitData});
    }

    const onEditFieldChange = (form,key,id,value) => {
        let formData = editedData[form];
        if(formData === undefined) formData = {};
        let dataField = formData[key];
        if(dataField === undefined) dataField = {};
        dataField[id] = value;
        formData[key] = dataField;
        editedData[form] = formData;
        setEditedData({...editedData});
    }

    const onformSubmit = async(form,selectedLoc,isChecked,clientCurrentId) => {
        try{
           var response = await configurationAPI.submitConfigurationForm(
            {
                newData:submitData[form],
                editData:editedData[form],
                locationId: selectedLoc,
                sameForAllLocationCheckedOrNot: isChecked,
                clientCurrentId: clientCurrentId,
            }
           );
           if(response.success){
                setResetForm(form);
                setSaveConfiguration(response);
           }
           return response;
        }catch(e){
            console.log(e);
            return e;
        }
    }

    const onformCancel = async(form) => {
        try{    
               await setResetForm(form);
           }
        catch(e){
            console.log(e);
            return e;
        }
    }

    const onformSubmitLocation = async(form,client_id) => {
        try{
           var response = await configurationAPI.submitLocationConfiguration(
            {
                client_id:client_id,
                newData:submitData[form],
            }
           );
           if(response?.success){
                setResetForm(form);
                setSaveConfiguration(response);
           }
           return response;
        }catch(e){
            console.log(e);
            return e;
        }
    }

    return (
        <Configurationcontext.Provider value={{
            onAddClickForTasks,
            onDeleteClickForTasks,
            onAddClick,
            onDeleteClick,
            onFieldChange,
            onformSubmit,
            emptyData,
            editedData,
            onEditFieldChange,
            saveConfiguration,
            setSaveConfiguration,
            locationData,
            lastLocationUpdated,
            client,
            configrationprocesses,
            configrationSpecialities,
            configprimaryDiagnosis,
            configSecondaryDiagnosis,
            configProcedures,
            configEd,
            configModifier,
            configAuditOptions,
            configFeedbackTypes,
            configHoldReasons,
            configResponsibleParties,
            submitData,
            setSubmitData,
            onformSubmitLocation,
            messageSave,
            setLocationData,
            setLastLocationUpdated,
            setClient,
            setConfigrationProcesses,
            setConfigrationSpecialities,
            setConfigprimaryDiagnosis,
            setConfigSecondaryDiagnosis,
            setConfigProcedures ,
            setConfigEd,
            setConfigModifier,
            setConfigAuditOptions,
            setConfigFeedbackTypes,
            setConfigHoldReasons,
            setConfigResponsibleParties,
            setMessageSave,
            onformCancel,
        }}>
            {children}
        </Configurationcontext.Provider>
    )
}
export default ConfigurationContextProvider
