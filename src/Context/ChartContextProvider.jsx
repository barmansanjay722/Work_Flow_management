import React, { useState } from "react";
import Chartcontext from "./Chartcontext";
const ChartContextProvider = ({ children }) => {
  const [get, setget] = useState([]);
  const [audit, setaudit] = useState([]);
  const [inpval, setInputval] = useState({ start_date: "", task_no: "", end_date: "", name: "", description: "", estimation: ""});
  const [chartstatus, setchartstatus] = useState([]);
  const [responsible, setresponsible] = useState([]);
  const [holdreason, setholdreason] = useState([]);
  const [auditor, setauditor] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [milestone, setMilestone] = useState([]);
  const [flagChange, setFlagChange] = useState(true);
  const [defaultAudit, setDefaultAudit] = useState();
  const [defaultHold, setDefaultHold] = useState();
  const [defaultResponsible, setDefaultResponsible] = useState();
  const [defaultChartStatus, setDefaultChartStatus] = useState();
  // const [defaultMilestone, setDefaultMilestone] = useState();
  const [allocateAuditor, setAllocateAuditor] = useState();
  const [activityLogs, setActivityLogs] = useState({});
  const [assignee, setAssignee] = useState({});
  const [epic, setEpic] = useState({});
  const [sprint, setSprint] = useState({});
  return (
    <Chartcontext.Provider
      value={{
        flagChange,
        activityLogs,
        get,
        audit,
        chartstatus,
        responsible,
        holdreason,
        auditor,
        masterData,
        inpval,
        setFlagChange,
        setActivityLogs,
        setget,
        setaudit,
        setchartstatus,
        setresponsible,
        setholdreason,
        setauditor,
        setMasterData,
        setInputval,
        milestone,
        defaultAudit,
        defaultHold,
        defaultResponsible,
        defaultChartStatus,
        // defaultMilestone,
        allocateAuditor,
        setMilestone,
        setDefaultAudit,
        setDefaultHold,
        setDefaultResponsible,
        setDefaultChartStatus,
        // setDefaultMilestone,
        setAllocateAuditor,
        assignee,
        setAssignee,
        epic,
        setEpic,
        sprint,
        setSprint
      }}
    >
      {children}
    </Chartcontext.Provider>
  );
};
export default ChartContextProvider;
