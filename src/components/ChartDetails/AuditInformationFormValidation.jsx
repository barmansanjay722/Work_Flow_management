import localStorageStore from "../../utils/localStorageStore";
import role from "../../utils/role";

const AuditInformationFormValidation = (values, auditDetail) => {
  const decryptRole = localStorageStore.getRole();
  let errors = {};
  // let strRegex = new RegExp(/^[a-z0-9]+$/i);
  if (values.hasOwnProperty("prim_diag_total")) {
    let isNum = /^\d+$/.test(values?.prim_diag_total);
    if (!isNum && !isNaN(values?.prim_diag_total)) {
      errors.prim_diag_total = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.prim_diag_total)) {
      errors.prim_diag_total = "Required";
    }
    if (values?.prim_diag_total === undefined || values?.prim_diag_total === "") {
      errors.prim_diag_total = "Required";
    }
    if (isNum) {
      if (values?.prim_diag_total < values?.prim_diag_correct) {
        errors.prim_diag_total = "Total should be greater than or equal to correct";
      }
      if (values?.prim_diag_total !== values?.prim_diag_correct && values?.prim_diag_total > values?.prim_diag_correct && (isNaN(values?.PrimDiagFeedbacks) || values?.PrimDiagFeedbacks === null || values?.PrimDiagFeedbacks === undefined)) {
        errors.PrimDiagFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("prim_diag_correct")) {
    let isNum = /^\d+$/.test(values?.prim_diag_correct);
    if (!isNum && !isNaN(values?.prim_diag_correct)) {
      errors.prim_diag_correct = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.prim_diag_correct)) {
      errors.prim_diag_correct = "Required";
    }
    if (values?.prim_diag_correct === undefined || values?.prim_diag_correct === "") {
      errors.prim_diag_correct = "Required";
    }
    if (isNum) {
      if (values?.prim_diag_total < values?.prim_diag_correct) {
        errors.prim_diag_correct = "Total should be greater than or equal to correct";
      }
      if (values?.prim_diag_total !== values?.prim_diag_correct && values?.prim_diag_total > values?.prim_diag_correct && (isNaN(values?.PrimDiagFeedbacks) || values?.PrimDiagFeedbacks === null || values?.PrimDiagFeedbacks === undefined)) {
        errors.PrimDiagFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("sec_diag_total")) {
    let isNum = /^\d+$/.test(values?.sec_diag_total);
    if (!isNum && !isNaN(values?.sec_diag_total)) {
      errors.sec_diag_total = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.sec_diag_total)) {
      errors.sec_diag_total = "Required";
    }
    if (values.sec_diag_total === undefined || values.sec_diag_total === "") {
      errors.sec_diag_total = "Required";
    }
    if (isNum) {
      if (values?.sec_diag_total < values?.sec_diag_correct) {
        errors.sec_diag_total = "Total should be greater than or equal to correct";
      }
      if (values?.sec_diag_total !== values?.sec_diag_correct && values?.sec_diag_total > values?.sec_diag_correct && (values?.SecDiagFeedbacks?.length === 0 || values?.SecDiagFeedbacks?.length === undefined)) {
        errors.SecDiagFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("sec_diag_correct")) {
    let isNum = /^\d+$/.test(values?.sec_diag_correct);
    if (!isNum && !isNaN(values?.sec_diag_correct)) {
      errors.sec_diag_correct = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.sec_diag_correct)) {
      errors.sec_diag_correct = "Required";
    }
    if (values.sec_diag_correct === undefined || values.sec_diag_correct === "") {
      errors.sec_diag_correct = "Required";
    }
    if (isNum) {
      if (values?.sec_diag_total < values?.sec_diag_correct) {
        errors.sec_diag_correct = "Total should be greater than or equal to correct";
      }
      if (values?.sec_diag_total !== values?.sec_diag_correct && values?.sec_diag_total > values?.sec_diag_correct && (values?.SecDiagFeedbacks?.length === 0 || values?.SecDiagFeedbacks?.length === undefined)) {
        errors.SecDiagFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("proc_total")) {
    let isNum = /^\d+$/.test(values?.proc_total);
    if (!isNum && !isNaN(values?.proc_total)) {
      errors.proc_total = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.proc_total)) {
      errors.proc_total = "Required";
    }
    if (values.proc_total === undefined || values.proc_total === "") {
      errors.proc_total = "Required";
    }
    if (isNum) {
      if (values?.proc_total < values?.proc_correct) {
        errors.proc_total = "Total should be greater than or equal to correct";
      }
      if (values?.proc_total !== values?.proc_correct && values?.proc_total > values?.proc_correct && (values?.ProceduresFeedbacks?.length === 0 || values?.ProceduresFeedbacks?.length === undefined)) {
        errors.ProceduresFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("proc_correct")) {
    let isNum = /^\d+$/.test(values?.proc_correct);
    if (!isNum && !isNaN(values?.proc_correct)) {
      errors.proc_correct = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.proc_correct)) {
      errors.proc_correct = "Required";
    }
    if (values?.proc_correct === undefined || values?.proc_correct === "") {
      errors.proc_correct = "Required";
    }
    if (isNum) {
      if (values?.proc_total < values?.proc_correct) {
        errors.proc_correct = "Total should be greater than or equal to correct";
      }
      if (values?.proc_total !== values?.proc_correct && values?.proc_total > values?.proc_correct && (values?.ProceduresFeedbacks?.length === 0 || values?.ProceduresFeedbacks?.length === undefined)) {
        errors.ProceduresFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("ed_em_total")) {
    let isNum = /^\d+$/.test(values?.ed_em_total);
    if (!isNum && values?.ed_em_total !== undefined) {
      errors.ed_em_total = "Only positive whole numbers are allowed";
    }
    if (values?.ed_em_total === undefined || values?.ed_em_total === "") {
      errors.ed_em_total = "Required";
    }
    if (isNum) {
      if (values?.ed_em_total < values?.ed_em_correct) {
        errors.ed_em_total = "Total should be greater than or equal to correct";
      }
      if (values?.ed_em_total !== values?.ed_em_correct && values?.ed_em_total > values?.ed_em_correct && (isNaN(values?.EdEmFeedbacks) || values?.EdEmFeedbacks === null || values?.EdEmFeedbacks === undefined)) {
        errors.EdEmFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("ed_em_correct")) {
    let isNum = /^\d+$/.test(values?.ed_em_correct);
    if (!isNum && values?.ed_em_correct !== undefined) {
      errors.ed_em_correct = "Only positive whole numbers are allowed";
    }
    if (values?.ed_em_correct === undefined || values?.ed_em_correct === "") {
      errors.ed_em_correct = "Required";
    }
    if (isNum) {
      if (parseFloat(values?.ed_em_total) < parseFloat(values?.ed_em_correct)) {
        errors.ed_em_correct = "Total should be greater than or equal to correct";
      }
      if (values?.ed_em_total !== values?.ed_em_correct && values?.ed_em_total > values?.ed_em_correct && (isNaN(values?.EdEmFeedbacks) || values?.EdEmFeedbacks === null || values?.EdEmFeedbacks === undefined)) {
        errors.EdEmFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("modifier_total")) {
    let isNum = /^\d+$/.test(values?.modifier_total);
    if (!isNum && !isNaN(values?.modifier_total)) {
      errors.modifier_total = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.modifier_total)) {
      errors.modifier_total = "Required";
    }
    if (values?.modifier_total === undefined || values?.modifier_total === "") {
      errors.modifier_total = "Required";
    }
    if (isNum) {
      if (values?.modifier_total < values?.modifier_correct) {
        errors.modifier_total = "Total should be greater than or equal to correct";
      }
      if (values?.modifier_total !== values?.modifier_correct && values?.modifier_total > values?.modifier_correct && (values?.ModifierFeedbacks?.length === 0 || values?.ModifierFeedbacks?.length === undefined)) {
        errors.ModifierFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("modifier_correct")) {
    let isNum = /^\d+$/.test(values?.modifier_correct);
    if (!isNum && !isNaN(values?.modifier_correct)) {
      errors.modifier_correct = "Only positive whole numbers are allowed";
    }
    if (!isNum && isNaN(values?.modifier_correct)) {
      errors.modifier_correct = "Required";
    }
    if (values?.modifier_correct === undefined || values?.modifier_correct === "") {
      errors.modifier_correct = "Required";
    }
    if (isNum) {
      if (values?.modifier_total < values?.modifier_correct) {
        errors.modifier_correct = "Total should be greater than or equal to correct";
      }
      if (values?.modifier_total !== values?.modifier_correct && values?.modifier_total > values?.modifier_correct && (values?.ModifierFeedbacks?.length === 0 || values?.ModifierFeedbacks?.length === undefined)) {
        errors.ModifierFeedbacks = "Required";
      }
    }
  }
  if (values.hasOwnProperty("FeedbackTypeId")) {
    let isNum = /^\d+$/.test(values?.FeedbackTypeId);

    if (!isNum && (values?.prim_diag_total > values?.prim_diag_correct || values?.sec_diag_total > values?.sec_diag_correct || values?.proc_total > values?.proc_correct || values?.ed_em_total > values?.ed_em_correct || values?.modifier_total > values?.modifier_correct) && values?.FeedbackTypeId === null) {
      errors.FeedbackTypeId = "Required";
    }
  }
  if (values.hasOwnProperty("QCStatusId")) {
    let isNum = /^\d+$/.test(values?.QCStatusId);
    if (!isNum) {
      errors.QCStatusId = "Required";
    }

  
    if(values?.QCStatusId === 2){
      if(auditDetail.hasOwnProperty("comment") && values.comment_msg === null && (decryptRole === role.Manager || decryptRole === role.Member || decryptRole === role.TeamLead || decryptRole === role.Admin)){
          window.toastr.error("Please enter a comment in the internal comments.")
          errors.comment_msg = "Required"
      }
      else{

      }
    }
  }
  if (values.hasOwnProperty("next_user_id")) {
    let isNum = /^\d+$/.test(values?.next_user_id);
    if (!isNum && values.QCStatusId === 2) {
      errors.next_user_id = "Required";
    }
  } else {
    errors.next_user_id = "Required";
  }

  return errors;
};
export default AuditInformationFormValidation;
