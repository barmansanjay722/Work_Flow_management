/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getChartAuditInfo, saveChartAuditInfo } from "../../services/chartService";
import { saveChartInfo } from "../../services/chartService";
import Chartcontext from "../../Context/Chartcontext";
import localStorageStore from "../../utils/localStorageStore";
import AuthContext from "../Auth/Middleware/AuthContext";
import role from "../../utils/role";
import Select from "react-select";
import validate from "../ChartDetails/AuditInformationFormValidation";
import CommentContext from "../../Context/CommentContext/CommentContext";
import validation from "./ChartFormValidationRules"

function AuditInformation({data, masterData, enabled, clientData, handleManagerSubmit, isMangerSubmit, setIsTouched}) {
  const [auditDetail, setAuditDetail] = useState([]);
  const [defaultEM, setDefaultEM] = useState();
  const [defaultProcedures, setProcedures] = useState([]);
  const [defaultPrimaryDiagnosis, setPrimaryDiagnosis] = useState([]);
  const [defaultSecondaryDiagnosis, setSecondaryDiagnosis] = useState([]);
  const [defaultModifier, setDefaultModifier] = useState([]);
  const [auditInfo, setAuditInfo] = useState({});
  const [defaultFeed, setDefaultField] = useState({});
  const [defaultQC, setDefaultQC] = useState({});
  const [selectedEdTotal, setSelectedEdTotal] = useState();
  const [selectedEdCorrect, setSelectedEdCorrect] = useState();
  const [flag, setFlag] = useState(false)
  const [defaultAllocateToAuditor, setDefaultAllocateToAuditor] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState(false);
  const feedback_error_message = "* Leave your feedback in the comments log.";
  let [showFeedbackError, setFeedbackError] = useState(false);
  const [sumOfCodes, setSumofCodes] = useState({
    prim_diag_total: 0,
    proc_total: 0,
    sec_diag_total: 0,
    ed_em_total: 0,
    modifier_total: 0,
  });
  const [count, setCount] = useState(0);
  const [sumOfCorrectCodes, setSumOfCorrectCodes] = useState({
    prim_diag_correct: 0,
    proc_correct: 0,
    sec_diag_correct: 0,
    ed_em_correct: 0,
    modifier_correct: 0,
  });
  const [total, setTotal] = useState(0);
  const [correctSum, setCorrectSum] = useState(0);
  const options = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
  ];
  const auth = useContext(AuthContext);
  const { inpval, defaultAudit, defaultHold, defaultResponsible, defaultChartStatus, defaultDisposition, allocateAuditor } = useContext(Chartcontext);
  const { commentInpval, errors, setErrors, commentedInCommentLog, setErrorsFromAuditorToChart } = useContext(CommentContext);
  const { id } = useParams();

  const fetchRecords = (id) => {
    getChartAuditInfo(id)
      .then((data) => {
        setAuditDetail(data?.data);
        setDefaultEM(data?.data?.EdEmFeedbacks);
        setProcedures(data?.data?.ProceduresFeedbacks);
        setPrimaryDiagnosis(data?.data?.PrimDiagFeedbacks);
        setSecondaryDiagnosis(data?.data?.SecDiagFeedbacks);
        setDefaultModifier(data?.data?.ModifierFeedbacks);
        setSelectedEdTotal({ value: data?.data?.ed_em_total, label: data?.data?.ed_em_total });
        setSelectedEdCorrect({ value: data?.data?.ed_em_correct, label: data?.data?.ed_em_correct });
        setDefaultQC({ value: data?.data?.QCStatus?.value, label: data?.data?.QCStatus?.label });
        setDefaultField({ value: data?.data?.FeedbackType?.value ?? null, label: data?.data.FeedbackType?.label ?? null });
        setAuditInfo({ ed_em_correct: parseFloat(data?.data?.ed_em_correct ?? ""), ed_em_total: parseFloat(data?.data?.ed_em_total ?? ""), QCStatusId: parseFloat(data?.data?.QCStatus?.value ?? ""), FeedbackTypeId: parseFloat(data?.data?.FeedbackType?.value ?? ""), modifier_correct: parseFloat(data?.data?.modifier_correct ?? ""), modifier_total: parseFloat(data?.data?.modifier_total ?? ""), prim_diag_correct: parseFloat(data?.data?.prim_diag_correct ?? ""), prim_diag_total:Object.keys(data?.data).length === 1 ? 1 : parseFloat(data?.data?.prim_diag_total ?? ""), proc_correct: parseFloat(data?.data?.proc_correct ?? ""), proc_total: parseFloat(data?.data?.proc_total ?? ""), sec_diag_correct: parseFloat(data?.data?.sec_diag_correct ?? ""), sec_diag_total: parseFloat(data?.data?.sec_diag_total ?? "") });
        setTotal(data?.data?.total_total);
        setCorrectSum(data?.data?.total_correct);
        setSumofCodes({ prim_diag_total: Object.keys(data?.data).length === 1 ? 1 : parseFloat(data?.data?.prim_diag_total ?? ""), proc_total: data?.data?.proc_total, sec_diag_total: data?.data?.sec_diag_total, ed_em_total: data?.data?.ed_em_total, modifier_total: data?.data?.modifier_total });
        setSumOfCorrectCodes({ prim_diag_correct: data?.data?.prim_diag_correct, proc_correct: data?.data?.proc_correct, sec_diag_correct: data?.data?.sec_diag_correct, ed_em_correct: data?.data?.ed_em_correct, modifier_correct: data?.data?.modifier_correct });
        setDefaultAllocateToAuditor(Object.keys(data?.data).length === 1 ? { label: clientData?.Coder?.name, value: clientData?.Coder?.id } : { label: data?.data?.next_user?.name, value: data?.data?.next_user?.id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderEDEM = () => {
    return masterData?.ed_em_feed?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderProcedures = () => {
    return masterData?.procedure_feed?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderPrimaryDiagnosis = () => {
    return masterData?.prim_diag_feed?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderSecondaryDiagnosis = () => {
    return masterData?.sec_diag_feed?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderModifier = () => {
    return masterData?.modifier_feed?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  const renderQC = () => {
    return masterData?.qc_status?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  const renderAllocateToCoder = () => {
    let coderAuditor = [];
    masterData?.coders_active?.forEach((data) => {
      coderAuditor.push({ // Active Coders
        label: `${data.name} (Coder)`,
        value: data.id,
      });
    });

    masterData?.auditors_active?.forEach((data) => { // Active Auditors
      if(data?.id !== undefined && data?.id !== "" && data?.id !== null){
      coderAuditor.push({
        label: `${data.name} (Auditor)`,
        value: data.id,
      });
    }else{}
    });

    return coderAuditor;
  };

  const renderFeed = () => {
    return masterData?.feedback_types?.map((data) => ({
      label: data.name,
      value: data.id,
    }));
  };

  const handleEMED = (event) => {
    if (selectedEdTotal?.value !== selectedEdCorrect?.value && selectedEdTotal?.value > selectedEdCorrect?.value) {
      setDefaultEM(event);
      setFlag(!flag)
    }
  };

  const handleProcedures = (event) => {
    if (auditInfo?.proc_total !== auditInfo?.proc_correct && auditInfo?.proc_total > auditInfo?.proc_correct) {
      setProcedures(event);
      setFlag(!flag)
    }
  };

  const handlePrimaryDiagnosis = (event) => {
    if (auditInfo?.prim_diag_total !== auditInfo?.prim_diag_correct && auditInfo?.prim_diag_total > auditInfo?.prim_diag_correct) {
      setPrimaryDiagnosis(event);
      setFlag(!flag)
    }
  };

  const handleSecondaryDiagnosis = (event) => {
    if (auditInfo?.sec_diag_total !== auditInfo?.sec_diag_correct && auditInfo?.sec_diag_total > auditInfo?.sec_diag_correct) {
      setSecondaryDiagnosis(event);
      setFlag(!flag)
    }
  };

  const handleModifier = (event) => {
    if (auditInfo?.modifier_total !== auditInfo?.modifier_correct && auditInfo?.modifier_total > auditInfo?.modifier_correct) {
      setDefaultModifier(event);
      setFlag(!flag)
    }
  };

  const handledefaultQC = (event) => {
    if (event.value !== 2) {
      setDefaultAllocateToAuditor("");
      setFeedbackError(false);
      setFlag(!flag)
    }
    if (event.value === 2) {
      setFeedbackError(true);
      setDefaultAllocateToAuditor(Object.keys(auditDetail).length === 1 ? { label: clientData?.Coder?.name, value: clientData?.Coder?.id } : { label: auditDetail?.next_user?.name, value: auditDetail?.next_user?.id });
      setFlag(!flag)
    }
    setDefaultQC(event);
  };

  const handledefaultFeed = (event) => {
    if ((auditInfo?.prim_diag_total !== auditInfo?.prim_diag_correct && auditInfo?.prim_diag_total > auditInfo?.prim_diag_correct) || (auditInfo?.sec_diag_total !== auditInfo?.sec_diag_correct && auditInfo?.sec_diag_total > auditInfo?.sec_diag_correct) || (auditInfo?.proc_total !== auditInfo?.proc_correct && auditInfo?.proc_total > auditInfo?.proc_correct) || (selectedEdTotal?.value !== selectedEdCorrect?.value && selectedEdTotal?.value > selectedEdCorrect?.value) || (auditInfo?.modifier_total !== auditInfo?.modifier_correct && auditInfo?.modifier_total > auditInfo?.modifier_correct)) {
      setDefaultField(event);
      setFlag(!flag)
    }
  };

  const handleDefaultAllocateToCoder = (event) => {
    setDefaultAllocateToAuditor(event);
    setFlag(!flag)
  };

  const handleInputChange = async (e) => {
    if (e.target.name === "prim_diag_correct" || e.target.name === "prim_diag_total") {
      if (auditInfo?.prim_diag_total <= auditInfo?.prim_diag_correct) {
        setPrimaryDiagnosis(null);
      }
    }
    if (e.target.name === "sec_diag_correct" || e.target.name === "sec_diag_total") {
      if (auditInfo?.sec_diag_total <= auditInfo?.sec_diag_correct) {
        setSecondaryDiagnosis([]);
      }
    }
    if (e.target.name === "proc_correct" || e.target.name === "proc_total") {
      if (auditInfo?.proc_total <= auditInfo?.proc_correct) {
        setProcedures([]);
      }
    }
    if (e.target.name === "modifier_correct" || e.target.name === "modifier_total") {
      if (auditInfo?.modifier_total <= auditInfo?.modifier_correct) {
        setDefaultModifier([]);
      }
    }
    setAuditInfo((auditInfo) => ({ ...auditInfo, [e.target.name]: parseFloat(e.target.value) }));
    if (e.target.name.includes("total")) {
      await setSumofCodes((sumOfCodes) => {
        return { ...sumOfCodes, [e.target.name]: parseFloat(e.target.value) };
      });
    }
    if (e.target.name.includes("correct")) {
      await setSumOfCorrectCodes((sumOfCorrectCodes) => {
        return { ...sumOfCorrectCodes, [e.target.name]: parseFloat(e.target.value) };
      });
    }
    setFlag(!flag)
  };

  const reduceTotalValue = (x) => {
    const values = Object.values(x);
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setTotal(sum);
  };

  const reduceCorrectValue = (x) => {
    const values = Object.values(x);
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setCorrectSum(sum);
  };

  const handleSelectedEdTotal = (event) => {
    setSelectedEdTotal(event);
    setSumofCodes((sumOfCodes) => ({ ...sumOfCodes, ed_em_total: parseFloat(event.value) }));
    if (auditInfo?.ed_em_total <= auditInfo?.ed_em_correct || event?.value <= selectedEdCorrect?.value) {
      setDefaultEM(null);
      setFlag(!flag)
    }
  };

  const handleSelectedEdCorrect = (event) => {
    setSelectedEdCorrect(event);
    setSumOfCorrectCodes((sumOfCorrectCodes) => ({ ...sumOfCorrectCodes, ed_em_correct: parseFloat(event.value) }));
    if (auditInfo?.ed_em_total <= auditInfo?.ed_em_correct || selectedEdTotal?.value <= event.value) {
      setDefaultEM(null);
      setFlag(!flag)
    }
  };

  const decimalRegex = /^\d+\.\d+$/;
  const submitChartForm = async () => {
    if (auth.role === role?.Member || auth.role === role?.Manager || auth.role === role?.TeamLead ||auth.role === role?.Admin) {
    getChartAuditInfo(id)
    }
    let object = inpval;
    object = {
      ...object,
      HoldReasons: defaultHold?.map((item) => item.value),
      DispositionId: defaultDisposition?.value,
      ResponsibleParties: defaultResponsible?.map((item) => item.value),
      StatusId: defaultChartStatus?.value,
      AuditOptions: defaultAudit?.map((item) => item.value),
      next_user_id:clientData?.MilestoneId === 3 ? allocateAuditor?.value ?? data?.next_user?.id ?? null : null,
      comment_msg: commentedInCommentLog === true ? commentInpval?.comment_msg : null,
    };
    let isValid = clientData?.MilestoneId === 3 || clientData?.MilestoneId === 6 ? await validationSchema(object, clientData) : false;
    const decryptRole = localStorageStore.getRole();
    if (decryptRole === role.Manager || decryptRole === role.Member || decryptRole === role.TeamLead || decryptRole === role.Admin || auth.role === role?.TeamLead) {
      if ((isValid)) {
        setErrorsFromAuditorToChart({})
        saveChartInfo(id, object, errors,clientData)
          .then((res) => {
            if (res === true) {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    let obj = auditInfo;
    obj = {
      ...obj,
      PrimDiagFeedbacks: defaultPrimaryDiagnosis?.value ?? null,
      SecDiagFeedbacks: defaultSecondaryDiagnosis?.map((item) => item.value) ?? null,
      ProceduresFeedbacks: defaultProcedures?.map((item) => item.value) ?? null,
      EdEmFeedbacks: defaultEM?.value ?? null,
      ModifierFeedbacks: defaultModifier?.map((item) => item.value) ?? null,
      QCStatusId: defaultQC?.value,
      FeedbackTypeId: defaultFeed?.value,
      ed_em_total: selectedEdTotal?.value,
      ed_em_correct: selectedEdCorrect?.value,
      next_user_id: defaultQC?.value === 2 ? defaultAllocateToAuditor?.value : null,
      total_total: total,
      total_correct: correctSum,
      comment_msg: commentedInCommentLog === true ? commentInpval?.comment_msg : null,
    };
    if (obj?.prim_diag_total === obj?.prim_diag_correct && obj?.sec_diag_total === obj?.sec_diag_correct && obj?.proc_total === obj?.proc_correct && obj?.ed_em_total === obj?.ed_em_correct && obj?.modifier_total === obj?.modifier_correct) {
      obj.FeedbackTypeId = null;
    }
    if (obj.QCStatusId === 2) {
      setFeedbackError(true);
    }
    let boolValid = false
    if (auth.role === role?.Member || auth.role === role?.Manager || auth.role === role?.TeamLead || auth.role === role?.Admin) {
    boolValid = clientData?.MilestoneId === 6 ? await validateSchema(obj, auditDetail) : false;
    }
    if (boolValid && isValid) {
      setErrors({});
      saveChartAuditInfo(id, obj,clientData)
        .then((data) => {
          if (data === true) {
            setIsSubmitted(true);
            localStorage.setItem("isFormDirty", false);
            setFeedbackError(false);
            setCount(count + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if(isMangerSubmit === true) {
    handleManagerSubmit(false)
    }
  };

  const validateSchema = async (obj, auditDetail) => {
    const response = await validate(obj, auditDetail);
    if (Object.keys(response).length === 0) {
      return true;
    } else {
      setErrors(response);
      return false;
    }
  };

  const validationSchema = async (object, clientData) => {
    const response = await validation(object, clientData);
    if (Object.keys(response).length === 0) {
      return true;
    } else {
      setErrorsFromAuditorToChart(response);
      return false;
    }
  };

  const handleKeypress = (e) => {
    if (e.target.name === "prim_diag_correct" || e.target.name === "prim_diag_total") {
      if (auditInfo?.prim_diag_total <= auditInfo?.prim_diag_correct) {
        setPrimaryDiagnosis(null);
      }
    }
    if (e.target.name === "sec_diag_correct" || e.target.name === "sec_diag_total") {
      if (auditInfo?.sec_diag_total <= auditInfo?.sec_diag_correct) {
        setSecondaryDiagnosis([]);
      }
    }
    if (e.target.name === "proc_correct" || e.target.name === "proc_total") {
      if (auditInfo?.proc_total <= auditInfo?.proc_correct) {
        setProcedures([]);
      }
    }
    if (e.target.name === "ed_em_correct" || e.target.name === "ed_em_total") {
      if (auditInfo?.ed_em_total <= auditInfo?.ed_em_correct) {
        setDefaultEM(null);
      }
    }
    if (e.target.name === "modifier_correct" || e.target.name === "modifier_total") {
      if (auditInfo?.modifier_total <= auditInfo?.modifier_correct) {
        setDefaultModifier([]);
      }
    }
    if (e.keyCode === 8) {
      setAuditInfo((auditInfo) => ({ ...auditInfo, [e.target.name]: parseFloat(e.target.value) }));
    }
    setFlag(!flag)
  };

  useEffect(() => {
    if (auditInfo?.prim_diag_total===auditInfo?.prim_diag_correct && auditInfo?.sec_diag_total===auditInfo?.sec_diag_correct && auditInfo?.proc_total===auditInfo?.proc_correct && selectedEdTotal?.value===selectedEdCorrect?.value && auditInfo?.modifier_total===auditInfo?.modifier_correct) {
    }
    if (defaultQC.value !== 2) {
      setDefaultAllocateToAuditor("");
    }
  }, []);

  useEffect(() => {
    console.log("");
  }, [commentInpval, defaultAllocateToAuditor, auditDetail]);
  useEffect(() => {
    reduceTotalValue(sumOfCodes);
    reduceCorrectValue(sumOfCorrectCodes);
  }, [auditInfo, auditDetail, defaultEM, defaultModifier, defaultPrimaryDiagnosis, defaultProcedures, defaultSecondaryDiagnosis, defaultFeed, defaultQC, selectedEdTotal, errors, sumOfCodes, sumOfCorrectCodes]);
  useEffect(() => {
    fetchRecords(id);
    setCount(count + 1);
  }, []);

  useEffect(() => {
    getChartAuditInfo(id);
    fetchRecords(id);
  }, [count, enabled]);
  useEffect(() => {
    if (commentInpval) {
      commentInpval.comment_msg = null}
  }, [enabled]);
  useEffect(() => {
    if(isMangerSubmit === true) {
      submitChartForm();
    } 
  }, [isMangerSubmit])
  
  useEffect(()=>{
    localStorage.setItem("isFormDirty", true);
    setIsTouched(true) 
  },[flag])

  return (
    <>
      <div className="card pt-4 mb-6 mb-xl-9">
        <div className="card-header border-0 minimize">
          <div className="card-title">
            <h2>Audit Information</h2>
          </div>
          <div className="card-toolbar mt-0">
            <button className="btn btn-icon btn-sm btn-light-primary justify-content-center">
              <i className={(clientData?.MilestoneId === 2 || clientData?.MilestoneId === 3 || clientData?.MilestoneId === 4) ? "fas fa-plus" : "fas fa-minus"} />
            </button>
          </div>
        </div>
        <div className="card-body p-0 collapse" style={{"display":(clientData?.MilestoneId === 2 || clientData?.MilestoneId === 3 || clientData?.MilestoneId === 4) ?  "none" : "block"}}>
          <div className="table-responsive audit-information-table mb-6 mt-0 m-8">
            <table className="table table-rounded mb-5 gs-10 gy-5">
              <thead>
                <tr className="border-bottom text-muted fw-bold fs-7 text-uppercase gs-0">
                  <th className="min-w-175px pb-2">Area</th>
                  <th width="25%" className="pb-2">
                    TOTAL CODES
                  </th>
                  <th width="25%" className="pb-2">
                    CORRECT CODES
                  </th>
                  <th width="25%" className="pb-2">
                    FEEDBACK CATEGORY
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left pt-5">Primary Diagnosis</td>
                  <td>
                    <input type="number" min={0} className="form-control" name="prim_diag_total" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} 
                    defaultValue={(auditDetail!==undefined && auditDetail != null) ?  (Object.keys(auditDetail)?.length === 1 && (inpval?.primary_diagnosis === null || inpval?.primary_diagnosis?.trim() === "") ? null : auditInfo?.prim_diag_total) : ""} 
                    onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.prim_diag_total && (isNaN(auditInfo?.prim_diag_total))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.prim_diag_total && ((auditInfo?.prim_diag_total < auditInfo?.prim_diag_correct) && !(decimalRegex.test(auditInfo?.prim_diag_total)))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.prim_diag_total && (decimalRegex.test(auditInfo?.prim_diag_total))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    <input type="number" min={0} name="prim_diag_correct" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.prim_diag_correct} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.prim_diag_correct && (isNaN(auditInfo?.prim_diag_correct))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.prim_diag_correct && (auditInfo?.prim_diag_total < auditInfo?.prim_diag_correct) && !(decimalRegex.test(auditInfo?.prim_diag_correct))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.prim_diag_correct && (decimalRegex.test(auditInfo?.prim_diag_correct))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    {auditInfo?.prim_diag_total !== auditInfo?.prim_diag_correct && auditInfo?.prim_diag_total > auditInfo?.prim_diag_correct ? <Select name="PrimDiagFeedbacks" options={renderPrimaryDiagnosis()} isMulti={false} value={defaultPrimaryDiagnosis} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handlePrimaryDiagnosis} /> : <Select name="PrimDiagFeedbacks" options={[]} isMulti={false} value={null} isDisabled={true} onChange={handlePrimaryDiagnosis} />}
                    {(errors.PrimDiagFeedbacks && (defaultPrimaryDiagnosis?.value === undefined || defaultPrimaryDiagnosis?.value === null) && (auditInfo?.prim_diag_total !== auditInfo?.prim_diag_correct)) && <p className="help is-danger errorDanger">{errors.PrimDiagFeedbacks}</p>}
                  </td>
                </tr>
                <tr>
                  <td className="text-left pt-5">Secondary Diagnosis</td>
                  <td>
                    <input type="number" min={0} name="sec_diag_total" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.sec_diag_total} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.sec_diag_total && (isNaN(auditInfo?.sec_diag_total))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.sec_diag_total && (auditInfo?.sec_diag_total < auditInfo?.sec_diag_correct ) && !(decimalRegex.test(auditInfo?.sec_diag_total))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.sec_diag_total && (decimalRegex.test(auditInfo?.sec_diag_total))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    <input type="number" min={0} name="sec_diag_correct" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.sec_diag_correct} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.sec_diag_correct && (isNaN(auditInfo?.sec_diag_correct))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.sec_diag_correct && (auditInfo?.sec_diag_total < auditInfo?.sec_diag_correct) && !(decimalRegex.test(auditInfo?.sec_diag_correct))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.sec_diag_correct && (decimalRegex.test(auditInfo?.sec_diag_correct))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    {auditInfo?.sec_diag_total !== auditInfo?.sec_diag_correct && auditInfo?.sec_diag_total > auditInfo?.sec_diag_correct ? <Select options={renderSecondaryDiagnosis()} isMulti={true} value={defaultSecondaryDiagnosis} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handleSecondaryDiagnosis} /> : <Select options={[]} isMulti={true} value={null} isDisabled={true} onChange={handleSecondaryDiagnosis} />}
                    {(errors.SecDiagFeedbacks && (defaultSecondaryDiagnosis === undefined || defaultSecondaryDiagnosis?.length === 0) && (auditInfo?.sec_diag_total !== auditInfo?.sec_diag_correct)) && <p className="help is-danger errorDanger">{errors.SecDiagFeedbacks}</p>}
                  </td>
                </tr>
                <tr>
                  <td className="text-left pt-5">Procedures</td>
                  <td>
                    <input type="number" min={0} name="proc_total" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.proc_total} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.proc_total && (isNaN(auditInfo?.proc_total))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.proc_total && (auditInfo?.proc_total < auditInfo?.proc_correct) && !(decimalRegex.test(auditInfo?.proc_total))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.proc_total && (decimalRegex.test(auditInfo?.proc_total))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    <input type="number" min={0} name="proc_correct" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.proc_correct} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.proc_correct && (isNaN(auditInfo?.proc_correct))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.proc_correct && (auditInfo?.proc_total < auditInfo?.proc_correct) && !(decimalRegex.test(auditInfo?.proc_correct))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.proc_correct && (decimalRegex.test(auditInfo?.proc_correct))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    {auditInfo?.proc_total !== auditInfo?.proc_correct && auditInfo?.proc_total > auditInfo?.proc_correct ? <Select options={renderProcedures()} isMulti={true} value={defaultProcedures} onChange={handleProcedures} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} /> : <Select options={[]} isMulti={true} value={null} onChange={handleProcedures} isDisabled={true} />}
                    {(errors.ProceduresFeedbacks && (defaultProcedures === undefined || defaultProcedures?.length === 0) && (auditInfo?.proc_total !== auditInfo?.proc_correct)) && <p className="help is-danger errorDanger">{errors.ProceduresFeedbacks}</p>}
                  </td>
                </tr>
                <tr>
                  <td className="text-left pt-7" style={{ width: "10%" }}>
                    ED/EM Level
                  </td>
                  <td style={{ width: "5%" }}>
                    <Select name="ed_em_total" isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} options={options} onChange={handleSelectedEdTotal} value={selectedEdTotal} />
                    {(errors.ed_em_total && (selectedEdTotal?.value === undefined)) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.ed_em_total && (selectedEdTotal?.value < selectedEdCorrect?.value)) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                  </td>
                  <td style={{ width: "5%" }}>
                    <Select name="ed_em_correct" isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} options={options} onChange={handleSelectedEdCorrect} value={selectedEdCorrect} />
                    {(errors.ed_em_correct && (selectedEdCorrect?.value === undefined)) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.ed_em_correct && (selectedEdTotal?.value < selectedEdCorrect?.value)) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                  </td>
                  <td style={{ width: "80%" }}>
                    {selectedEdTotal?.value !== selectedEdCorrect?.value && selectedEdTotal?.value > selectedEdCorrect?.value ? <Select options={renderEDEM()} isMulti={false} value={defaultEM} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handleEMED} /> : <Select options={[]} isMulti={false} value={null} isDisabled={true} onChange={handleEMED} />}
                    {(errors.EdEmFeedbacks && (defaultEM === undefined || defaultEM === null) && (selectedEdTotal?.value !== selectedEdCorrect?.value)) && <p className="help is-danger errorDanger">{errors.EdEmFeedbacks}</p>}
                  </td>
                </tr>

                <tr>
                  <td className="text-left pt-5">Modifier</td>
                  <td>
                    <input type="number" min={0} name="modifier_total" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.modifier_total} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.modifier_total && (isNaN(auditInfo?.modifier_total))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.modifier_total && (auditInfo?.modifier_total < auditInfo?.modifier_correct) && !(decimalRegex.test(auditInfo?.modifier_total))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.modifier_total && (decimalRegex.test(auditInfo?.modifier_total))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    <input type="number" min={0} name="modifier_correct" className="form-control" disabled={(clientData?.MilestoneId === 6) ? !enabled : true} defaultValue={auditDetail?.modifier_correct} onChange={handleInputChange} onKeyUp={handleKeypress} />
                    {(errors.modifier_correct && (isNaN(auditInfo?.modifier_correct))) && <p className="help is-danger errorDanger">Required</p>}
                    {(errors.modifier_correct && (auditInfo?.modifier_total < auditInfo?.modifier_correct && !(decimalRegex.test(auditInfo?.modifier_correct)))) && <p className="help is-danger errorDanger">Total should be greater than or equal to correct</p>}
                    {(errors.modifier_correct && (decimalRegex.test(auditInfo?.modifier_correct))) && <p className="help is-danger errorDanger">Only positive whole numbers are allowed</p>}
                  </td>
                  <td>
                    {auditInfo?.modifier_total !== auditInfo?.modifier_correct && auditInfo?.modifier_total > auditInfo?.modifier_correct ? <Select options={renderModifier()} isMulti={true} value={defaultModifier} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handleModifier} /> : <Select options={[]} isMulti={true} value={null} isDisabled={true} onChange={handleModifier} />}
                    {(errors.ModifierFeedbacks && (defaultModifier === undefined || defaultModifier?.length === 0) && (auditInfo?.modifier_total !== auditInfo?.modifier_correct))&& <p className="help is-danger errorDanger">{errors.ModifierFeedbacks}</p>}
                  </td>
                </tr>
                <tr className="bg-light-primary">
                  <td className="text-left pt-5">Total</td>
                  <td>
                    <input type="number" min={0} id="total_total" name="total_total" className="form-control form-control-solid text-gray-400" disabled={true} value={total} onChange={handleInputChange} />
                    {errors.total_total && <p className="help is-danger errorDanger">{errors.total_total}</p>}
                  </td>
                  <td>
                    <input type="number" min={0} name="total_correct" className="form-control form-control-solid text-gray-400" disabled={true} value={correctSum} onChange={handleInputChange} />
                    {errors.total_correct && <p className="help is-danger errorDanger">{errors.total_correct}</p>}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="separator separator-dashed my-3" />
          <div className="d-flex flex-column gap-5 gap-md-7 mb-10 mt-10">
            <div className="row px-10">
              <div className="col-md-4 col-6">
                <label className="required form-label">Feedback Type</label>
                {(auditInfo?.prim_diag_total !== auditInfo?.prim_diag_correct && auditInfo?.prim_diag_total > auditInfo?.prim_diag_correct) || (auditInfo?.sec_diag_total !== auditInfo?.sec_diag_correct && auditInfo?.sec_diag_total > auditInfo?.sec_diag_correct) || (auditInfo?.proc_total !== auditInfo?.proc_correct && auditInfo?.proc_total > auditInfo?.proc_correct) || (selectedEdTotal?.value !== selectedEdCorrect?.value && selectedEdTotal?.value > selectedEdCorrect?.value) || (auditInfo?.modifier_total !== auditInfo?.modifier_correct && auditInfo?.modifier_total > auditInfo?.modifier_correct) ? <Select value={defaultFeed !== null ? defaultFeed : null} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handledefaultFeed} options={renderFeed()} /> : <Select value={{ label: "", value: "" }} isDisabled={true} onChange={handledefaultFeed} options={[]} />}
                {(errors.FeedbackTypeId && defaultFeed?.value === null) && <p className="help is-danger errorDanger">{errors.FeedbackTypeId}</p>}
              </div>
              <div className="col-md-4 col-6">
                <label className="required form-label">QC Status</label>
                <Select value={defaultQC} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handledefaultQC} options={renderQC()} />
                {showFeedbackError && <p style={{ color: "lightBlue" }}>{feedback_error_message}</p>}
                {(errors.QCStatusId && defaultQC?.value === undefined) && <p className="help is-danger errorDanger">{errors.QCStatusId}</p>}
              </div>
              {(auth.role === role.Member || auth.role === role.Manager || auth.role === role?.TeamLead || auth.role === role?.Admin) && (<div className={(defaultQC?.value === 1 || defaultQC.value === undefined || clientData?.MilestoneId !== 6) ? "col-4 d-none" : "col-4"}>
                <label className="required form-label">Allocate to coder</label>{defaultQC?.value===2 ? <Select value={defaultAllocateToAuditor} isDisabled={(clientData?.MilestoneId === 6) ? !enabled : true} onChange={handleDefaultAllocateToCoder} options={renderAllocateToCoder()} /> : <Select options={[]} value={null} isDisabled={true} styles={{ visibility: "hidden" }} />}
                {errors.next_user_id && <p className="help is-danger errorDanger">{errors.next_user_id}</p>}
              </div>)}
            </div>
          </div>
        </div>
      </div>
      {(auth.role === role.Member || auth.role === role.Manager || auth.role === role?.TeamLead || auth.role === role?.Admin) && (
        <div className="d-flex justify-content-start ms-5 mb-6">
          <button disabled={!enabled} onClick={submitChartForm} type="submit" className="btn fw-bold btn-primary me-2">
            Save
          </button>
          <button type="reset" className="btn btn-light fw-bold btn-active-light-primary" data-kt-search-element="preferences-dismiss">
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
export default AuditInformation;
