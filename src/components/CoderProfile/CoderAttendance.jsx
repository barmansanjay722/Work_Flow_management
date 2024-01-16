import FullCalendar from "@fullcalendar/react";
import React, { useRef } from "react";
import daygridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import LeaveRequestModal from "./LeaveRequestModal";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { fetchEventsDetailsForCalender } from "../../services/userService";
import moment from "moment";

const CoderAttendance = ({ events, userId, handleLeaveRequest, role, rollId }) => {
  const navigate = useNavigate();
  const [showModalBox, setShowModalBox] = useState(false);
  const [reasons, setReasons] = useState();
  const [currentMonth, setCurrentMonth] = useState(moment().format("MM"));
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));
  const navigateStateGlobal =  useLocation();
  const user_id = userId;
  const handleCloseModal = () => {
    setShowModalBox(false);
  };

  const handleRedirect = () => {
    navigate("/", { state: { role: role.toLowerCase(), id: userId } });
  };
  const fetchCalenderDetails = async () => {
    const response = await fetchEventsDetailsForCalender(user_id, currentMonth, currentYear);
    setReasons(response);
  };

  useEffect(() => {
    if (userId !== undefined && currentMonth !== undefined && currentYear !== undefined) {
      fetchCalenderDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentMonth, currentYear, handleLeaveRequest,navigateStateGlobal]);

  const calendarRef = useRef(null);
  const handlePrevClick = async () => {
    calendarRef.current.getApi().prev();
    setCurrentMonth(moment(calendarRef.current.getApi().currentData.dateProfile.currentDate).format("MM"));
    setCurrentYear(moment(calendarRef.current.getApi().currentData.dateProfile.currentDate).format("YYYY"));
  };

  const handleNextClick = async () => {
    calendarRef.current.getApi().next();
    setCurrentMonth(moment(calendarRef.current.getApi().currentData.dateProfile.currentDate).format("MM"));
    setCurrentYear(moment(calendarRef.current.getApi().currentData.dateProfile.currentDate).format("YYYY"));
  };
  
  const handleTodayClick = () => {
    const today = moment().format('YYYY-MM-DD');
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today);
    setCurrentMonth(moment(calendarRef.current.getApi().currentData.dateProfileGenerator.nowDate).format("MM"));
    setCurrentYear(moment(calendarRef.current.getApi().currentData.dateProfileGenerator.nowDate).format("YYYY"));
  };
  return (
    <>
      <div className="flex-lg-row-fluid ms-lg-8">
        <div className="card card-flush mb-6 mb-xl-9">
          <div className="card-header mt-6" style={{ display: "block" }}>
            <div>
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="d-flex align-items-center pt-3"> Attendance &amp; Leaves</h2>
                </div>
                {parseInt(localStorage.getItem("RoleId")) === userId && (
                  <>
                    <div className="col-lg-3 d-flex justify-content-end mb-md-5">
                      <button
                        type="button"
                        className="btn btn-light-primary btn-sm me-4"
                        onClick={(e) => {
                          setShowModalBox(true);
                        }}
                      >
                        <i className="far fa-plus" />
                        Add Leave
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="card-body p-9 pt-0 management-calendar">
            <div className="row g-3">
              <div className="col-lg-7 col-md-12">
                <div className="p-card">
                  <FullCalendar
                    ref={calendarRef}
                    displayEventTime={false}
                    plugins={[daygridPlugin, bootstrapPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    eventOverlap = {false}
                    customButtons={{
                      prev: {
                        text: "Prev",
                        click: handlePrevClick,
                      },
                      next: {
                        text: "Next",
                        click: handleNextClick,
                      },
                      today: {
                        text: "Today",
                        click: handleTodayClick,
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-5 pt-3" style={{height: '60vh', overflow: 'auto'}}>
                <div className="px-3">
                  <ul className="list-unstyled mt-3 scrollbar management-calendar-events" id="management-calendar-events">
                    {reasons?.data?.map((item) => (
                      <li className="border-top pt-3 mb-3 pb-1 cursor-pointer" data-calendar-events="" key={item?.id}>
                        <div className="border-start border-3 border-primary ps-3 mt-1">
                          <h6 className="mb-1 fw-semi-bold text-700">{item?.reason}</h6>
                          <p className="fs--2 text-600 mb-0">{item?.period}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(role === "Coder" || role === "Member") && (
          <div className="col-lg-12 d-flex justify-content-end">
            <button type="button" className="btn btn-primary btn-sm me-4" onClick={handleRedirect}>
              Allocated Work
            </button>
          </div>
        )}
      </div>
      {parseInt(localStorage.getItem("RoleId")) === userId && <LeaveRequestModal showModalBox={showModalBox} handleCloseModal={handleCloseModal} handleLeaveRequest={handleLeaveRequest} />}
    </>
  );
};
export default CoderAttendance;
