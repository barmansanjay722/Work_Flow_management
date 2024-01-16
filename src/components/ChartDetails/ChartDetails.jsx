import React, { useContext } from "react";
import NewChart from "./NewChart";
// import Timer from "./Timer";
import ChartForm from "./ChartForm";
// import ChartUsers from "./ChartUsers";
import ChartComments from "./ChartComments";
// import TimeTracker from "./TimeTracker";
// import ActivityLogs from "./ActivityLogs";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getChartDetails, getMasterData, getActivityLogData } from "../../services/chartService";
import { useParams, useLocation } from "react-router-dom";
import Chartcontext from "../../Context/Chartcontext";
import AuthContext from "../Auth/Middleware/AuthContext";
import role from "../../utils/role";
import LogHours from "./LogHours";

const EnabledContext = createContext(false);

function ChartDetails(props) {
  const navigateStateGlobal = useLocation();
  // const [enabled, setEnabled] = useState(false);
  const enabled  = false;
  const [chartData, setChartData] = useState([]);
  const [reRenderChart, setReRenderChart] = useState(false);
  const [reRenderTimer, setReRenderTimer] = useState(false);
  const { id } = useParams();
  const Chartform = useContext(Chartcontext);
  const auth = useContext(AuthContext);

  const showLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/charts/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(Chartform.inpval),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRecord(id);
    fetchChartData();
    fetchActivityLogs(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Chartform?.flagChange, navigateStateGlobal, reRenderChart]);

  const fetchChartData = async () => {
    getMasterData(id)
      .then((response) => {
        Chartform.setholdreason(response?.data.hold_reasons);
        Chartform.setMasterData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchActivityLogs = async () => {
    getActivityLogData(id)
      .then((response) => {
        Chartform.setActivityLogs(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRecord = async () => {
    try {
      let response = await getChartDetails(id);
      if (response.success) {
        setChartData(response.data);
        Chartform.setMilestone({
          value: response.data.MilestoneId,
          label: response.data.Milestone,
        });
        Chartform.setAssignee({
          value: response.data.assignee_id,
          label: `${response.data.assignee_first_name} ${response.data.assignee_last_name}`,
          image: response.data.assignee_image
        });
        Chartform.setEpic({
          value: response.data.epic_id,
          label: response.data.epic_name,
        });
        Chartform.setSprint({
          value: response.data.sprint_id,
          label: response.data.sprint_name,
        });
        let storeData = window.localStorage.getItem("timerData") ?? "{}";
        storeData = JSON.parse(storeData);
        if (response?.data?.timer) {
          storeData[id] = {
            startTime: new Date(response?.data?.timer).getTime(),
          };
        } else {
          storeData[id] = {};
        }
        window.localStorage.setItem("timerData", JSON.stringify(storeData));
        const chartResponse = response.data;
        Chartform.setInputval({
          start_date: chartResponse?.StartDate,
          task_no: chartResponse?.TaskNo,
          description: chartResponse?.Description,
          end_date: chartResponse?.EndDate,
          name: chartResponse?.TaskName,
          estimation: chartResponse?.estimation
        });
      } else {
        window.toastr.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <EnabledContext.Provider value={enabled}>
        <div className="row">
          <div className="col-xl-7 col-lg-12 col-md-12">
            <div className="row">
              <div className="col-xl-9 col-12">
                {/* <NewChart data={chartData} /> */}
              </div>
              {/* <Timer enabled={enabled} clientData={chartData?.Status} onEnable={setEnabled} existingTimer={chartData?.timer} onReRenderTimer={setReRenderTimer} /> */}
            </div>
            <div className="row gy-5 g-xl-10">
              <ChartForm enabled={true} clientData={chartData} data={Chartform} onSubmit={showLogin} reRenderChart={reRenderChart} setReRenderChart={setReRenderChart} getChartDetails={getChartDetails} reRenderTimer={reRenderTimer} onReRenderTimer={setReRenderTimer} />
            </div>
          </div>
          <div className="col-xl-5 col-lg-12 col-md-12">
            <div className="row">
             <NewChart data={chartData} />
              {/* <ChartUsers data={chartData} /> */}
              <ChartComments data={chartData} enabled={enabled && (auth.role === role?.Coder || auth.role === role?.Member || auth.role === role?.Manager || auth.role === role?.TeamLead || auth.role === role?.Admin )} />
              {/* <TimeTracker enabled={enabled} /> */}
              {/* <ActivityLogs data={Chartform} enabled={enabled} /> */}
              <LogHours enabled={enabled} taskDetails={{task_id: id, taskNo: chartData?.TaskNo ?? "", assignee_name: `${chartData.assignee_first_name} ${chartData.assignee_last_name}` ?? "", assignee_id: chartData?.assignee_id}} />
            </div>
          </div>
        </div>
      </EnabledContext.Provider>
    </>
  );
}
export default ChartDetails;
