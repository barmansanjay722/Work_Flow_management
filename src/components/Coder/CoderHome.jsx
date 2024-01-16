import React from "react";
import CoderMilestones from "./CoderMilestones";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Case from "case";
import localStorageStore from "../../utils/localStorageStore";

// import moment from "moment/moment";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./coder.css";
import role from "../../utils/role";

const CoderHome = ({ showtable, query }) => {
  // const [coderStatus, setcoderStatus] = useState({});
  const [milestones, setMilestones] = useState({});
  // const [currentChartTimer, setCurrentChartTimer] = useState("--:--");

  let currentTimerIntervalObj = "";
  const navigate = useNavigate();

  const fetchData = () => {
    return fetch(`${process.env.REACT_APP_API_HOST}/charts/user-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success && response.message === "Unauthorized" && !localStorage.getItem("AzureTokenGranted")) {
          navigate("/login");
        } else if (!response.success && response.message === "Unauthorized" && localStorage.getItem("AzureTokenGranted")) {
          navigate("/redirect");
        }
        // setcoderStatus(response?.data);

        // if (response?.data?.current_chart_stats?.timer) {
        //   currentTimerIntervalObj = setInterval(() => {
        //     let startTime = moment(response?.data?.current_chart_stats?.timer);
        //     let endTime = moment(Date.now());
        //     let difference = moment.duration(endTime.diff(startTime));
        //     setCurrentChartTimer(`${difference._data.minutes < 10 ? "0" : ""}${difference._data.minutes} : ${difference._data.seconds < 10 ? "0" : ""}${difference._data.seconds}`);
        //   }, 1000);
        // }

        if (response.data.milestones !== undefined) {
          setMilestones(response.data.milestones)};
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    return () => clearInterval(currentTimerIntervalObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showtable, query]);

  // const handleLinkClick = (id) => {
  //   navigate(`/process-chart/${id}`);
  // };

  const decryptRole = localStorageStore.getRole();
  return (
    <>
      <div className="row gy-5 g-xl-10">
        <div className={decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member ? "col-lg-12 col-md-12 col-sm-12 col-12" : "col-xxl-6 col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12"}>
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Milestones
            </span>
          </div>
          <div className="row">
            {Object.keys(milestones).map((e, i) => {
              return (
                <div key={i} className={decryptRole === role.Manager || decryptRole === role.TeamLead || decryptRole === role.Admin || decryptRole === role.Member ? "milestones col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12  mb-xl-10 mb-5 mx-1" : "milestones col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5 mx-1"}>
                  <CoderMilestones data={milestones} dataKey={e} title={Case.title(e)} />
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Status
            </span>
          </div>
          <div className="row">
            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={coderStatus?.complete_status} title={"Complete"} colorChange={"fw-semibold fs-3x text-success text-center m-0 p-0"} picContainerDivClass={"pt-0 text-center"} picture1={"../assets/media/svg/illustrations/easy/1.svg"} picture2={"../assets/media/svg/illustrations/easy/1-dark.svg"} pic1WidthChange={"theme-light-show w-114px"} pic2WidthChange={"theme-dark-show w-114px"} />
            </div>
            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={coderStatus?.incomplete_status} title={"Incomplete"} colorChange={"fw-semibold fs-3x text-danger text-center m-0 p-0"} picContainerDivClass={"pt-2 pb-1 text-center"} picture1={"../assets/media/svg/illustrations/easy/2.svg"} picture2={"../assets/media/svg/illustrations/easy/2-dark.svg"} pic1WidthChange={"theme-light-show w-125px"} pic2WidthChange={"theme-dark-show w-125px"} />
            </div>
          </div>
        </div> */}
        {/* {decryptRole !== role.Manager && decryptRole !== role.TeamLead && decryptRole !== role.Admin && (
          <div className="col-xl-2 col-12">
            <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator timer">
              <span className="h4 d-flex">
                <span className="bullet bullet-dot me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Current Chart
              </span>
            </div>
            <div onClick={() => (coderStatus?.current_chart_stats?.success ? handleLinkClick(coderStatus?.current_chart_stats?.chartId) : "")} style={{ cursor: "pointer" }}>
              <div className="card card-flush stopwatch_card mb-5 mb-xl-8">
                <div className="card-body p-0 pt-3">
                  <div className="m-0 text-center pb-3 pt-4">
                    <span className="fw-semibold fs-1 text-white text-center card-label">{coderStatus?.current_chart_stats?.chart_no}</span>
                    <br />
                    <span className="fw-semibold fs-8 text-white text-center card-label opacity-75">{coderStatus?.current_chart_stats?.success ? coderStatus?.current_chart_stats?.milestone : coderStatus?.current_chart_stats?.message}</span>
                  </div>
                  <div className="d-flex flex-center flex-column py-0">
                    <div className="symbol symbol-100px symbol-circle mb-0 mt-0">
                      <section id="stopWatch">
                        <p id="timer"> {coderStatus?.current_chart_stats?.success ? <span>{currentChartTimer}</span> : <span>--:--</span>}</p>
                        <p className=" fs-7 text-white text-center card-label pt-1 mb-3">{coderStatus?.current_chart_stats?.success ? "Tap to view" : " "} </p>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(localStorage.Role === role.Manager || localStorage.Role === role.TeamLead) && (
          <div className="row">
            <div className="col-xl-4 offset-xl-8 col-lg-5 offset-lg-7 col-md-6 offset-md-6 col-sm-12 col-12 pe-0">
              <div className="card-toolbar mt-0 mb-3">
                <div className="d-flex justify-content-between stopwatch_card pb-1 pt-0 py-4 stopwatch_button text-white justify-content-center ms-4 px-5">
                  <div className="m-0 text-center pb-1 pt-2 me-5 user-chart-number">
                    <OverlayTrigger placement={"top"} overlay={<Tooltip> {coderStatus?.current_chart_stats?.chart_no}</Tooltip>}>
                      <span className="fw-semibold fs-1 text-white text-center card-label mb-0 coding-status" style={{ cursor: "pointer" }}>
                        {coderStatus?.current_chart_stats?.success ? coderStatus?.current_chart_stats?.chart_no : ""}
                      </span>
                    </OverlayTrigger>
                    {coderStatus?.current_chart_stats?.success && coderStatus?.current_chart_stats?.chart_no ? <br /> : ""}
                    <span className="fw-semibold fs-8 text-white text-center card-label opacity-75">{coderStatus?.current_chart_stats?.success ? coderStatus?.current_chart_stats?.milestone : coderStatus?.current_chart_stats?.message}</span>
                  </div>
                  <div className="d-flex flex-center flex-column py-0 me-5 ms-5">
                    <div className="symbol symbol-100px symbol-circle mb-0 mt-0">
                      <section id="stopWatch">
                        <p id="timer">{coderStatus?.current_chart_stats?.success ? <span>{currentChartTimer}</span> : <span>--:--</span>}</p>
                      </section>
                    </div>
                  </div>
                  <div className="ms-5" onClick={() => (coderStatus?.current_chart_stats?.success ? handleLinkClick(coderStatus?.current_chart_stats?.chartId) : "")} style={{ cursor: "pointer" }}>
                    {coderStatus?.current_chart_stats?.success ? (
                      <OverlayTrigger placement={"top"} overlay={<Tooltip> Tap to view </Tooltip>}>
                        <i className="fa-solid fa-arrow-right text-white" style={{ fontSize: "25px" }} />
                      </OverlayTrigger>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};
export default CoderHome;
