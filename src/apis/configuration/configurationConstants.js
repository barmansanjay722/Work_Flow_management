const configurationConstants = {}

configurationConstants.GET_CONFIGURATION = "users/getcongfiguration";

configurationConstants.GET_CLIENTS = "users/client/:ID";

configurationConstants.GET_LOCATIONS = "users/location/:ID";

configurationConstants.SAVE_CONFIGURATION = "users/addcongfiguration";

configurationConstants.SAVE_LOCATION = "users/display/addLocation/:ID";

//form constants

configurationConstants.LOCATION_CONFIGURATION = "LOCATION_CONFIGURATION";
configurationConstants.LOCATION_DATA = "locations";

configurationConstants.TASKS = "TASKS";
configurationConstants.TASKS_DATA = "tasks";
configurationConstants.TASKS_ASSIGNED_TO = "assigned_to";

configurationConstants.GENERAL_CONFIGURATION = "GENERAL_CONFIGURATION";
configurationConstants.PROCESS_DATA = "processes";
configurationConstants.SPECIALITY_DATA = "specialties";

configurationConstants.FEEDBACK_CONFIGURATION = "FEEDBACK_CONFIGURATION";
configurationConstants.PRIMARY_DIAGNOSIS = "primfeed";
configurationConstants.SECONDARY_DIAGNOSIS = "sec_diag_feed";
configurationConstants.PROCEDURES = "procedure_feed";
configurationConstants.EDM_LEVEL = "ed_em_feed";
configurationConstants.MODIFIER = "modifier_feed";

configurationConstants.AUDITING_CONFIGURATION = "AUDITING_CONFIGURATION";
configurationConstants.AUDIT_OPTIONS = "auditorOption";
configurationConstants.FEEDBACK_TYPES = "feedback_types";
configurationConstants.CODING_CONFIGURATION = "CODING_CONFIGURATION";
configurationConstants.HOLD_REASON = "hold_reasons";
configurationConstants.RESPONSIBLE_PARTIES = "responsible_parties";



export default configurationConstants;