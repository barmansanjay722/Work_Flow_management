import {useEffect, useState} from "react";
import StatusCard from "../../StatusCard/StatusCard";
import {worklistProgressStatus} from "../../../services/managerService"
import localStorageStore from "../../../utils/localStorageStore";
import role from "../../../utils/role";

const WorkListHeader = ({query}) => {
  const [progressStat, setProgressStat] = useState();

  useEffect(() => {
    fetchRecord()
  }, [query])

  const fetchRecord = async() => {
    const response = await worklistProgressStatus()
    setProgressStat(response)
  } 

  const decryptRole = localStorageStore.getRole();
  
  return (
    <div className="row gy-8 g-xl-10">
      <div className="col-xxl-7 col-xl-7 col-lg-9 col-md-12 col-sm-12 col-12">
      {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member ) && <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
           <span className="h4 d-flex">
            <span className="bullet bullet-dot bg-grey me-2 h-7px w-7px mt-2" /> Status
          </span>
        </div>}
        <div className="row">
          {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member) && <div className="col-sm-6 col-6 col-xl-4 col-md-4 mb-5 mb-xl-10">
            <StatusCard title={"Open"} colorChange={"fw-semibold fs-3x text-warning text-center m-0 p-0"} picture1={"../assets/media/svg/illustrations/easy/2.svg"} picture2={"../assets/media/svg/illustrations/easy/2-dark.svg"} pic1WidthChange={"theme-light-show w-125px h-100px"} pic2WidthChange={"theme-dark-show w-125px h-100px"} data={progressStat?.openStatusWorklistsCount}/>
          </div>}
          {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member) && <div className="col-sm-6 col-6 col-xl-4 col-md-4 mb-5 mb-xl-10">
            <StatusCard title={"In Progress"} colorChange={"fw-semibold fs-3x text-info text-center m-0 p-0"} picture1={"../assets/media/svg/illustrations/easy/3.svg"} picture2={"../assets/media/svg/illustrations/easy/3-dark.svg"} pic1WidthChange={"theme-light-show w-125px h-100px"} pic2WidthChange={"theme-dark-show w-125px h-100px"} data={progressStat?.inProgressStatusWorklistsCount}/>
          </div>}
          {(decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member) && <div className="col-sm-6 col-6 col-xl-4 col-md-4 mb-5 mb-xl-10">
            <StatusCard title={"Closed"} colorChange={"fw-semibold fs-3x text-success text-center m-0 p-0"} picture1={"../assets/media/svg/illustrations/easy/1.svg"} picture2={"../assets/media/svg/illustrations/easy/1-dark.svg"} pic1WidthChange={"theme-light-show w-125px h-100px"} pic2WidthChange={"theme-dark-show w-125px h-100px"} data={progressStat?.closedStatusWorklistsCount}/>
          </div>}
        </div>
      </div>
    </div>
  );
};
export default WorkListHeader;
