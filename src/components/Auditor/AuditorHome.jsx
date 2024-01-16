import React from "react";
import CoderMilestones from "../Coder/CoderMilestones";
import StatusCard from "../StatusCard/StatusCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuditorHome = (show) => {
  const [coderStatus, setcoderStatus] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    return fetch(`${process.env.REACT_APP_API_HOST}/charts/user-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setcoderStatus(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLinkClick = (id) => {
    navigate(`/process-chart/${id}`);
  };

  return (
    <>
      <div className="row gy-5 g-xl-10">
        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Milestones
            </span>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <CoderMilestones data={coderStatus?.ready_to_code} cardColorChange={"card h-lg-60 bg-light-info"} title={"Ready to Code"} textColorChange={"d-flex flex-column mt-7 text-info"} iconOpacity={"0.3"} iconPath1={"M17 10H11C10.4 10 10 9.6 10 9V8C10 7.4 10.4 7 11 7H17C17.6 7 18 7.4 18 8V9C18 9.6 17.6 10 17 10ZM22 4V3C22 2.4 21.6 2 21 2H11C10.4 2 10 2.4 10 3V4C10 4.6 10.4 5 11 5H21C21.6 5 22 4.6 22 4ZM22 15V14C22 13.4 21.6 13 21 13H11C10.4 13 10 13.4 10 14V15C10 15.6 10.4 16 11 16H21C21.6 16 22 15.6 22 15ZM18 20V19C18 18.4 17.6 18 17 18H11C10.4 18 10 18.4 10 19V20C10 20.6 10.4 21 11 21H17C17.6 21 18 20.6 18 20Z"} iconPath2={"M8 5C8 6.7 6.7 8 5 8C3.3 8 2 6.7 2 5C2 3.3 3.3 2 5 2C6.7 2 8 3.3 8 5ZM5 4C4.4 4 4 4.4 4 5C4 5.6 4.4 6 5 6C5.6 6 6 5.6 6 5C6 4.4 5.6 4 5 4ZM8 16C8 17.7 6.7 19 5 19C3.3 19 2 17.7 2 16C2 14.3 3.3 13 5 13C6.7 13 8 14.3 8 16ZM5 15C4.4 15 4 15.4 4 16C4 16.6 4.4 17 5 17C5.6 17 6 16.6 6 16C6 15.4 5.6 15 5 15Z"} />
            </div>
            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <CoderMilestones data={coderStatus?.coding_done} cardColorChange={"card h-lg-60 bg-light-success"} title={"Coding Done"} textColorChange={"d-flex flex-column mt-7 text-success"} iconOpacity={"0.5"} iconPath1={"M12.8956 13.4982L10.7949 11.2651C10.2697 10.7068 9.38251 10.7068 8.85731 11.2651C8.37559 11.7772 8.37559 12.5757 8.85731 13.0878L12.7499 17.2257C13.1448 17.6455 13.8118 17.6455 14.2066 17.2257L21.1427 9.85252C21.6244 9.34044 21.6244 8.54191 21.1427 8.02984C20.6175 7.47154 19.7303 7.47154 19.2051 8.02984L14.061 13.4982C13.7451 13.834 13.2115 13.834 12.8956 13.4982Z"} iconPath2={"M7.89557 13.4982L5.79487 11.2651C5.26967 10.7068 4.38251 10.7068 3.85731 11.2651C3.37559 11.7772 3.37559 12.5757 3.85731 13.0878L7.74989 17.2257C8.14476 17.6455 8.81176 17.6455 9.20663 17.2257L16.1427 9.85252C16.6244 9.34044 16.6244 8.54191 16.1427 8.02984C15.6175 7.47154 14.7303 7.47154 14.2051 8.02984L9.06096 13.4982C8.74506 13.834 8.21146 13.834 7.89557 13.4982Z"} />
            </div>
            <div className="col-sm-6 col-md-6 col-6 col-xl-4 mb-xl-10 mb-5">
              <CoderMilestones
                data={coderStatus?.ready_to_audit}
                cardColorChange={"card h-lg-60 bs-yellow-light"}
                title={"Ready to Audit"}
                textColorChange={"fw-d-flex flex-column mt-7 text-yellow"}
                rectOpacity={"0.3"}
                iconPath1={"M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z"}
                iconPath2={"M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z"}
                width={12}
                height={2}
                rx={1}
                transform={"matrix(-1 0 0 1 15.5 11)"}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Status
            </span>
          </div>
          <div className="row">
            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={coderStatus?.complete_status} title={"Complete"} colorChange={"fw-semibold fs-3x text-success text-center m-0 p-0"} picture1={"../assets/media/svg/illustrations/easy/1.svg"} picture2={"../assets/media/svg/illustrations/easy/1-dark.svg"} pic1WidthChange={"theme-light-show w-125px"} pic2WidthChange={"theme-dark-show w-125px"} />
            </div>

            <div className="col-sm-6 col-6 col-xl-6 col-md-12 mb-5 mb-xl-10">
              <StatusCard data={coderStatus?.incomplete_status} title={"Incomplete"} colorChange={"fw-semibold fs-3x text-danger text-center m-0 p-0"} picture1={"../assets/media/svg/illustrations/easy/2.svg"} picture2={"../assets/media/svg/illustrations/easy/2-dark.svg"} pic1WidthChange={"theme-light-show w-150px"} pic2WidthChange={"theme-dark-show w-150px"} />
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-12">
          <div className="separator separator-dotted separator-content border-dark my-4 mb-6 home-separator timer">
            <span className="h4 d-flex">
              <span className="bullet bullet-dot bg-danger me-2 h-7px w-7px mt-2" style={{ backgroundColor: "#818181 !important" }} /> Current Chart
            </span>
          </div>
          <div onClick={() => (!show && coderStatus?.current_chart_stats.success ? handleLinkClick(coderStatus?.current_chart_stats.chartId) : "")} style={{ cursor: "pointer" }}>
            <div className="card card-flush stopwatch_card mb-5 mb-xl-8">
              <div className="card-body p-0 pt-3">
                <div className="m-0 text-center pb-3 pt-4">
                  <span className="fw-semibold fs-1 text-white text-center card-label">{coderStatus?.current_chart_stats?.chart_no}</span>
                  <br />
                  <span className="fw-semibold fs-8 text-white text-center card-label opacity-75">{coderStatus?.current_chart_stats?.milestone}</span>
                </div>
                <div className="d-flex flex-center flex-column py-0">
                  <div className="symbol symbol-100px symbol-circle mb-0 mt-0">
                    <section id="stopWatch">
                      <p id="timer"> {coderStatus.current_chart_stats?.success ? <span>10:00</span> : coderStatus?.current_chart_stats?.message}</p>
                      <p className=" fs-7 text-white text-center card-label pt-1 mb-3">{coderStatus?.current_chart_stats?.success ? "Tap to view" : " "} </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuditorHome;