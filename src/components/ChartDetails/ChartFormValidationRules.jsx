// let strRegex = new RegExp(/^[a-z0-9]+$/i);
// let strRegexPirmaryDiagnosis = new RegExp(/^[a-z0-9.]+$/i);
const ChartFormValidationRules = (values, clientData) => {
  let errors = {};
  if (values.hasOwnProperty("task_no")) {
    if (values?.task_no === "" || values?.task_no === null) {
      errors.task_no = "Required";
    }
    //  else {
    //   let result = strRegex.test(values?.task_no);
    //   if (!result) {
    //     errors.task_no = "Only alphanumeric allowed";
    //   }
    // }
  }
  if (values.hasOwnProperty("start_date")) {
    if (values?.start_date === "" || values?.start_date === null) {
      errors.start_date = "Required";
    }
  }
  if (values.hasOwnProperty("end_date")) {
    if (values?.end_date === "" || values?.end_date === null) {
      errors.end_date = "Required";
    }
  }
  if (values.hasOwnProperty("task_name")) {
    if (values?.task_name === "" || values?.task_name === null) {
      errors.task_name = "Required";
    }
  }
  // if (values.hasOwnProperty("description")) {
  //   if (values?.description === "" || values?.description === null) {
  //     errors.description = "Required";
  //   }
  // }
  if (values.hasOwnProperty("MilestoneId")) {
    if (values?.MilestoneId === "" || values?.MilestoneId === null) {
      errors.description = "Required";
    }
  }
  if (values.hasOwnProperty("HoldReasons")) {
    if (values?.HoldReasons?.length === 0) {
      errors.HoldReasons = "Required";
    }
  }
  return errors;
};
export default ChartFormValidationRules;
