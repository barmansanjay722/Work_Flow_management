import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Timer(props) {
  let { existingTimer } = props;
  const params = useParams();
  const { onEnable, enabled, clientData } = props;
  const [timer, setTimer] = useState("00 : 00");
  // eslint-disable-next-line no-unused-vars
  const [completed, setCompleted] = useState(false);
  const [timerDataObject, setTimerDataObject] = useState({});
  const [intervalData, setIntervalData] = useState(null);
  const [messageStart, setMessageStart] = useState("Start");
  const [messageStop, setMessageStop] = useState("Stop");

  useEffect(() => {
    let timerIntervalObj = "";
    let timerData = window.localStorage.getItem("timerData");
    if (timerData != null && clientData) {
      timerData = JSON.parse(timerData);
      timerData = timerData[params.id];
      if (timerData !== undefined) { 
        setTimerDataObject(timerData);
      }
      if (timerData !== undefined && timerData["startTime"] !== undefined && timerData["endTime"] !== undefined) {
        setCompleted(true);
        let startTime = moment(timerData["startTime"]);
        let endTime = moment(timerData["endTime"]);
        let difference = moment.duration(endTime.diff(startTime));
        setTimer(`${difference._data.minutes < 10 ? "0" : ""}${difference._data.minutes} : ${difference._data.seconds < 10 ? "0" : ""}${difference._data.seconds}`);
      } else if (timerData !== undefined && timerData["startTime"] !== undefined) {
        if (!enabled) onEnable(true);
        timerIntervalObj = setInterval(() => {
          let startTime = moment(existingTimer ?? timerData["startTime"]);
          let endTime = moment();
          let difference = moment.duration(endTime.diff(startTime));
          setTimer(`${difference._data.minutes < 10 ? "0" : ""}${difference._data.minutes} : ${difference._data.seconds < 10 ? "0" : ""}${difference._data.seconds}`);
        }, 1000);
        setIntervalData(timerIntervalObj);
      } else {
        if(timer === "00 : 00") {
          window.toastr.info('Please start timer to work on this chart!')
        }
      }
    }
    return () => clearInterval(timerIntervalObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, existingTimer]);

  const callTimerAPI = (event) => { 
    if((event.target.innerHTML).toLowerCase() === "start" || ((event.target.innerHTML).toLowerCase() === "stop"  && localStorage.getItem('isFormDirty') === "false")) {
      event.target.disabled = true;
      setMessageStart("Starting...");
      setMessageStop("Stopping...");
      let jsonData = { ChartId: params.id };
      fetch(`${process.env.REACT_APP_API_HOST}/charts/${params.id}/timer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(jsonData),
      })
        .then((res) => res.json())
        .then((response) => {
          if (!response.success) {
            window.toastr.error(response.message);
          } else {
            const start_time_new = moment(response.data.start_time).valueOf();
  
            if (response.data.stop_time === null) {
              setTimerData({
                startTime: start_time_new,
              });
  
              onEnable(true);
              setCompleted(false);
            } else {
              setTimerData({
                startTime: start_time_new,
                endTime: moment(response.data.stop_time).valueOf(),
              });
  
              clearInterval(intervalData);
              onEnable(false);
              setCompleted(true);
            }
          }
          event.target.disabled = false;
          setMessageStart("Start");
          setMessageStop("Stop");
          props.onReRenderTimer(true);
          
        })
        .catch((error) => {
          console.log(error);
          event.target.disabled = false;
          setMessageStart("Start");
          setMessageStop("Stop");
        });
    } else {
      window.toastr.error("Please save the form before you stop timer!");
    }
 
  };

  const onTimerClick = (event) => {
    callTimerAPI(event);
  };

  const setTimerData = (timerData) => {
    let storeData = window.localStorage.getItem("timerData") ?? "{}";
    storeData = JSON.parse(storeData);
    storeData[params.id] = timerData;
    window.localStorage.setItem("timerData", JSON.stringify(storeData));
    setTimerDataObject(timerData);
  };
  
  return (
    <>
      <div className="col-xl-3 col-12">
        <div className="card card-flush stopwatch_card mb-5 mb-xl-8">
          <div className="card-header pt-0">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold text-white">Timer</span>
            </h3>
          </div>
          <div className="card-body p-0">
            <div className="d-flex flex-center flex-column py-0">
              <div className="symbol symbol-100px symbol-circle mb-3 mt-0">
                <section id="stopWatch">
                  <p id="timer" style={{ color: "white", fontSize: "2rem" }} className="ms-5">
                    {timer}
                  </p>
                  <button onClick={(e) => { onTimerClick(e); }} className="btn fw-bold me-2 btn-sm w-100 mt-5 mb-2" >
                    {!enabled ? messageStart : messageStop}
                  </button>
                </section>
                <div className="d-flex flex-wrap flex-center text-center mt-7 mb-6">
                  <div className="text-white mx-3 mb-3">
                    <span className="fw-semibold d-block fs-8 opacity-75">Start</span>
                    <span className="fw-bold fs-7">{timerDataObject["startTime"] === undefined ? "00:00" : moment(timerDataObject["startTime"]).format("hh:mm")}</span>
                  </div>
                  <div className="text-white mx-3 mb-3">
                    <span className="fw-semibold d-block fs-8 opacity-75">Stop</span>
                    <span className="fw-bold fs-7">{timerDataObject["endTime"] === undefined ? "00:00" : moment(timerDataObject["endTime"]).format("hh:mm")}</span>
                  </div>
                  <div className="text-white mx-3 mb-3">
                    <span className="fw-semibold d-block fs-8 opacity-75">Time</span>
                    <span className="fw-bold fs-7">{timer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Timer;
