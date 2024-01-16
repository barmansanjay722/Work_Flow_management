import React from "react";
import StatusCard from "../../StatusCard/StatusCard";
import { useEffect, useState } from "react";
const UserHeader = (renderActiveCoder) => {
  const [userDetails, setUserDetails] = useState({}); 
  async function fetchData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        mode: "cors",
      });
      const data = await response.json();
      setUserDetails(data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [renderActiveCoder]);
  return (
    <>
      <div className="row gy-5 g-xl-10">
        <div className="col-lg-7 col-md-7 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Status
            </span>
          </div>
          <div className="row">
              <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <div className="card h-lg-60 bg-light-info milestone_border">
                <div className="card-body d-flex justify-content-between align-items-start flex-column">
                  <div className="m-0">
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.3"
                          d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                          fill="currentColor"
                        />
                        <path
                          d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                          fill="currentColor"
                        />
                        <rect x={7} y={6} width={4} height={4} rx={2} fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-7">
                    <span className="fw-semibold fs-3x text-info lh-1 ls-n2">{userDetails?.active_coders}</span>
                    <div className="m-0">
                      <span className="fw-semibold fs-6 text-info">Active Coders</span>
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
                            <svg
                              width={22}
                              height={22}
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z"
                                fill="currentColor"
                              />
                              <rect
                                opacity="0.3"
                                x={14}
                                y={4}
                                width={4}
                                height={4}
                                rx={2}
                                fill="currentColor"
                              />
                              <path
                                d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z"
                                fill="currentColor"
                              />
                              <rect
                                opacity="0.3"
                                x={6}
                                y={5}
                                width={6}
                                height={6}
                                rx={3}
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <div className="d-flex flex-column mt-7">
                        <span className="fw-semibold fs-3x text-success lh-1 ls-n2">{userDetails?.active_auditors}</span>
                        <div className="m-0">
                          <span className="fw-semibold fs-6 text-success">
                            Active Auditors
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
                <div className="card h-lg-60 bs-yellow-light milestone_border">
                  <div className="card-body d-flex justify-content-between align-items-start flex-column">
                    <div className="m-0">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.3"
                            d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="d-flex flex-column mt-7">
                      <span className="fw-semibold fs-3x text-yellow lh-1 ls-n2">{userDetails?.active_teamLeads}</span>
                      <div className="m-0">
                        <span className="fw-semibold fs-6 text-yellow">
                          Active Team Leaders
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
					</div>
          </div>
        <div  className="col-lg-5 col-md-5 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 total-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Total Users
            </span>
          </div>
          <div className="row">
            <div className="col-sm-12 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={userDetails?.attending_users} title={"Attending"} colorChange={"fw-semibold fs-3x text-success text-center m-0 p-0"} picContainerDivClass={"pt-0 text-center"} picture1={"../assets/media/svg/illustrations/easy/1.svg"} picture2={"../assets/media/svg/illustrations/easy/1-dark.svg"} pic1WidthChange={"theme-light-show w-114px"} pic2WidthChange={"theme-dark-show w-114px"} />
            </div>

            <div className="col-sm-12 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={userDetails?.not_attending_users} title={"Not-Attending"} colorChange={"fw-semibold fs-3x text-danger text-center m-0 p-0"} picContainerDivClass={"pt-2 pb-1 text-center"} picture1={"../assets/media/svg/illustrations/easy/2.svg"} picture2={"../assets/media/svg/illustrations/easy/2-dark.svg"} pic1WidthChange={"theme-light-show w-125px"} pic2WidthChange={"theme-dark-show w-125px"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserHeader;