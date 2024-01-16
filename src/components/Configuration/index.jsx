import React, { useContext, useEffect, useState } from "react";
import Configuration from "./Configuration";
import Configurationcontext from "../../Context/ConfigrationContext/Configurationcontext";
// import { useParams } from "react-router-dom";
import configurationAPI from "../../apis/configuration/configurationAPI";

const Index = () => {
  // const { id } = useParams();
  const configData = useContext(Configurationcontext);
  const [success, setSuccess] = useState(false)
  const [configurationIsLoading, setConfigIsLoading] = useState(false)
  const [selectedLoc, setSelectedLoc] = useState(0)
  const[location,setLocation] = useState([])

  useEffect(() => {
    asyncInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configData.saveConfiguration]);

  const asyncInit = async () => {
    try {
      const locationId = configData.lastLocationUpdated;
      // let loc = await fetchLocationData(locationId);
      await fetchClientData();
      setSelectedLoc(locationId ?? 0)
      fetchConfigurationData(locationId ?? 0);
    } catch (e) {
    }
  }

  // const fetchLocationData = async (locationId = 0) => {
  //   try {
  //     let res = await configurationAPI.getLocationList(locationId)
  //     configData.setLocationData(res);
  //     return res
  //   } catch (e) {
  //   }
  // };

  const fetchClientData = async () => {
    configurationAPI.getClientList(0)
      .then((data) => {
        configData.setClient(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchConfigurationData = async (locID) => {
    setConfigIsLoading(true)
    configurationAPI.getConfiguration(0, locID)
      .then((data) => {
        configData.emptyData();
        configData.setConfigrationProcesses(data.processes);
        configData.setConfigrationSpecialities(data.specialties)
        configData.setConfigprimaryDiagnosis(data.prim_diag_feed);
        configData.setConfigSecondaryDiagnosis(data.sec_diag_feed);
        configData.setConfigProcedures(data.procedure_feed);
        configData.setConfigEd(data.ed_em_feed);
        configData.setConfigModifier(data.modifier_feed);
        configData.setConfigAuditOptions(data.audit_options);
        configData.setConfigFeedbackTypes(data.feedback_types);
        configData.setConfigHoldReasons(data.hold_reasons);
        configData.setConfigResponsibleParties(data.responsible_parties);
        setConfigIsLoading(false)
      })
      .catch((error) => {
        setConfigIsLoading(false)
        console.log(error);
      });
  };

  const onLocationClick = (val) => {
    setSelectedLoc(val?.id ?? 0)
    fetchConfigurationData(val.id ?? 0)
  }

useEffect (() => {
  fetchClientData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[success])

return (
    <>
      <Configuration configurationIsLoading={configurationIsLoading} fetchConfigurationData={fetchConfigurationData} location={location} setLocation={setLocation} success={success} setSuccess={setSuccess} selectedLoc={selectedLoc} onLocationClick={onLocationClick} />
    </>
  );
};
export default Index;
