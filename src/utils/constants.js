const priorityConstants = {
  CRITICAL_PRIORITY_ID: 1,
  HIGH_PRIORITY_ID: 2,
  MED_PRIORITY_ID: 3,
  LOW_PRIORITY_ID: 4,
};

const commentFlagConstants = {
  ACCEPTED_COMMENT_FLAG_ID: 1,
  REJECTED_COMMENT_FLAG_ID: 2,
  NEUTRAL_COMMENT_FLAG_ID: 3,
};

const qcStatusConstants = {
  QC_PASS_ID: 1,
  QC_FAIL_ID: 2,
};

const worklistStatusConstants = {
  OPEN_WORKLIST_STATUS_ID: 1,
  IN_PROGRESS_STATUS_ID: 2,
  CLOSED_STATUS_ID: 3,
  OPEN_STATUS: "Open",
  IN_PROGRESS_STATUS: "In Progress",
  CLOSED_STATUS: "Closed",
};

const worklistStatusIdConstants = {
  OPEN_STATUS_ID: 1,
  IN_PROGRESS_STATUS_ID: 2,
  CLOSED_STATUS_ID: 3,
};

const userRoleConstants = {
  MANAGER_ID: 1,
  TEAM_LEAD_ID: 2,
  CODER_ID: 3,
  MEMBER_ID: 4,
  ADMIN_ID: 5
};

module.exports = {
  worklistStatusIdConstants,
  worklistStatusConstants,
  priorityConstants,
  commentFlagConstants,
  qcStatusConstants,
  userRoleConstants
};
