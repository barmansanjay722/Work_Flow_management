import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardContext from "../../Context/DashboardContext/DashboardContext";
import dashboardAPIs from "../../apis/dashboard/dashboardAPI";

const UserStats = ({ showtable }) => {
  const { userStats , setUserStats } = useContext(DashboardContext);
  const fetchUserStats = async () => {
    try {
      let res = await dashboardAPIs.getUserStats();
      setUserStats(res);
    } catch (e) {}
  };

  useEffect(() => {
    fetchUserStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showtable]);

  return (
    <>
      <div className="row gy-5 g-xl-10">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }}></span> Milestones
            </span>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <div className="card h-lg-60 bg-light-warning milestone_border">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M13.341 22H11.341C10.741 22 10.341 21.6 10.341 21V18C10.341 17.4 10.741 17 11.341 17H13.341C13.941 17 14.341 17.4 14.341 18V21C14.341 21.6 13.941 22 13.341 22ZM18.5409 10.7L21.141 9.19997C21.641 8.89997 21.7409 8.29997 21.5409 7.79997L20.5409 6.09997C20.2409 5.59997 19.641 5.49997 19.141 5.69997L16.5409 7.19997C16.0409 7.49997 15.941 8.09997 16.141 8.59997L17.141 10.3C17.441 10.8 18.0409 11 18.5409 10.7ZM8.14096 7.29997L5.54095 5.79997C5.04095 5.49997 4.44096 5.69997 4.14096 6.19997L3.14096 7.89997C2.84096 8.39997 3.04095 8.99997 3.54095 9.29997L6.14096 10.8C6.64096 11.1 7.24095 10.9 7.54095 10.4L8.54095 8.69997C8.74095 8.19997 8.64096 7.49997 8.14096 7.29997Z" fill="currentColor" />
                            <path d="M13.3409 7H11.3409C10.7409 7 10.3409 6.6 10.3409 6V3C10.3409 2.4 10.7409 2 11.3409 2H13.3409C13.9409 2 14.3409 2.4 14.3409 3V6C14.3409 6.6 13.9409 7 13.3409 7ZM5.54094 18.2L8.14095 16.7C8.64095 16.4 8.74094 15.8 8.54094 15.3L7.54094 13.6C7.24094 13.1 6.64095 13 6.14095 13.2L3.54094 14.7C3.04094 15 2.94095 15.6 3.14095 16.1L4.14095 17.8C4.44095 18.3 5.04094 18.5 5.54094 18.2ZM21.1409 14.8L18.5409 13.3C18.0409 13 17.4409 13.2 17.1409 13.7L16.1409 15.4C15.8409 15.9 16.0409 16.5 16.5409 16.8L19.1409 18.3C19.6409 18.6 20.2409 18.4 20.5409 17.9L21.5409 16.2C21.7409 15.7 21.6409 15 21.1409 14.8Z" fill="currentColor" />
                          </svg>
                        </span>
                      </span>
                    </span>
                  </div>

                  <div className="d-flex flex-column mt-7">
                    <span className="fw-semibold fs-3x text-warning lh-1 ls-n2">{userStats?.milestones?.in_progress ?? "..."}</span>
                    <div className="m-0">
                      <span className="fw-semibold fs-6 text-warning">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <div className="card h-lg-60 bg-light-info milestone_border">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.3" d="M17 10H11C10.4 10 10 9.6 10 9V8C10 7.4 10.4 7 11 7H17C17.6 7 18 7.4 18 8V9C18 9.6 17.6 10 17 10ZM22 4V3C22 2.4 21.6 2 21 2H11C10.4 2 10 2.4 10 3V4C10 4.6 10.4 5 11 5H21C21.6 5 22 4.6 22 4ZM22 15V14C22 13.4 21.6 13 21 13H11C10.4 13 10 13.4 10 14V15C10 15.6 10.4 16 11 16H21C21.6 16 22 15.6 22 15ZM18 20V19C18 18.4 17.6 18 17 18H11C10.4 18 10 18.4 10 19V20C10 20.6 10.4 21 11 21H17C17.6 21 18 20.6 18 20Z" fill="currentColor" />
                          <path d="M8 5C8 6.7 6.7 8 5 8C3.3 8 2 6.7 2 5C2 3.3 3.3 2 5 2C6.7 2 8 3.3 8 5ZM5 4C4.4 4 4 4.4 4 5C4 5.6 4.4 6 5 6C5.6 6 6 5.6 6 5C6 4.4 5.6 4 5 4ZM8 16C8 17.7 6.7 19 5 19C3.3 19 2 17.7 2 16C2 14.3 3.3 13 5 13C6.7 13 8 14.3 8 16ZM5 15C4.4 15 4 15.4 4 16C4 16.6 4.4 17 5 17C5.6 17 6 16.6 6 16C6 15.4 5.6 15 5 15Z" fill="currentColor" />
                        </svg>
                      </span>
                    </span>
                  </div>

                  <div className="d-flex flex-column mt-7">
                    <span className="fw-semibold fs-3x text-info lh-1 ls-n2">{userStats?.milestones?.ready_to_code ?? "..."}</span>

                    <div className="m-0">
                      <span className="fw-semibold fs-6 text-info">Ready to Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <div className="card h-lg-60 bg-light-success milestone_border">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-2hx svg-icon-gray-600">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.3" width="12" height="2" rx="1" transform="matrix(-1 0 0 1 15.5 11)" fill="currentColor" />
                          <path d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z" fill="currentColor" />
                          <path d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z" fill="currentColor" />
                        </svg>
                      </span>
                    </span>
                  </div>

                  <div className="d-flex flex-column mt-7">
                    <span className="fw-semibold fs-3x text-success lh-1 ls-n2">{userStats?.milestones?.ready_to_allocate ?? "..."}</span>
                    <div className="m-0">
                      <span className="fw-semibold fs-6 text-success">Ready to Allocate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: " #818181 !important" }}></span> Status
            </span>
          </div>
          <div className="row">
            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <div className="card h-lg-60 milestone_border">
                <div className="card-body d-flex flex-column flex-center py-2">
                  <div className="mb-0 text-center">
                    <h1 className="fw-semibold fs-3x text-success text-center m-0 p-0">
                      {userStats?.complete_status ?? "..."}
                      <span className="fw-bolder fs-6 ">Complete</span>
                    </h1>
                    <div className="pt-0 text-center">
                      <img src="../assets/media/svg/illustrations/easy/1.svg" className="theme-light-show w-114px" alt="" />
                      <img src="../assets/media/svg/illustrations/easy/1-dark.svg" className="theme-dark-show w-114px" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <div className="card h-lg-60 milestone_border">
                <div className="card-body d-flex flex-column flex-center py-2 px-5">
                  <div className="mb-0 text-center">
                    <h1 className="fw-semibold fs-3x text-danger text-center m-0 p-0">
                      {userStats?.incomplete_status ?? "..."}
                      <span className="fw-bolder fs-6 ">Incomplete</span>
                    </h1>

                    <div className="pt-2 pb-1 text-center">
                      <img src="../assets/media/svg/illustrations/easy/2.svg" className="theme-light-show w-125px" alt="" />
                      <img src="../assets/media/svg/illustrations/easy/2-dark.svg" className="theme-dark-show w-125px" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-2 col-5">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator timer">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: " #818181 !important" }}></span> Unallocated
            </span>
          </div>

          <Link to="/manager-worklist">
            <span>
              <div className="card card-flush bg-unallocated mb-5 mb-xl-5">
                <div className="card-body p-0 pt-3">
                  <div className="m-0 text-center pb-2 pt-2">
                    <span className="fw-semibold fs-1 text-white text-center card-label">{`${userStats?.unallocatedCount?.worklist?.unallocated ?? "..."} ${userStats?.unallocatedCount?.worklist?.unallocated ? "of" : ""} ${userStats?.unallocatedCount?.worklist?.total ?? "..."}`}</span>
                    <br></br>
                    <span className="fw-semibold fs-6 text-white text-center card-label opacity-75">Worklists</span>
                  </div>
                </div>
              </div>
            </span>
          </Link>
          <Link to="/">
            <span>
              <div className="card card-flush bg-unallocated mb-5 mb-xl-5">
                <div className="card-body p-0 pt-3">
                  <div className="m-0 text-center pb-2 pt-2">
                    <span className="fw-semibold fs-1 text-white text-center card-label">{`${userStats?.unallocatedCount?.charts?.unallocated ?? "..."} ${userStats?.unallocatedCount?.charts?.unallocated ? "of" : ""} ${userStats?.unallocatedCount?.charts?.total ?? "..."}`}</span>
                    <br></br>
                    <span className="fw-semibold fs-6 text-white text-center card-label opacity-75">Charts</span>
                  </div>
                </div>
              </div>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default UserStats;
