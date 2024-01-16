/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chartcontext from "../../Context/Chartcontext";
import validate from "./ChartFormValidationRules";
import { getMasterData } from "../../services/chartService";
import { saveChartInfo } from "../../services/chartService";
import { getChartDetails } from "../../services/chartService";
import role from "../../utils/role";
import ChartInfo from "./ChartInfo";
import AuthContext from "../Auth/Middleware/AuthContext";
import { useConfirmTabClose } from "../../hooks/useConfirmTabClose.js";
import CommentContext from "../../Context/CommentContext/CommentContext";

const ChartForm = ({ enabled, clientData, setReRenderChart, reRenderChart }) => {
  const data = useContext(Chartcontext);
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [taskType , setTaskType] = useState();
  const [isTouched, setIsTouched] = useState(false);
  const [masterData, setMasterData] = useState({});
  useConfirmTabClose(isTouched);

  const { defaultHold, milestone, setDefaultHold, assignee } = useContext(Chartcontext);

  const { errorsForChat, setErrorsForChat, errorsFromAuditorToChart } = useContext(CommentContext);

  useEffect(() => {
    setIsTouched(true);
  }, [milestone, defaultHold]);

  const handleDateTimeChange = (dates, dateStr, instance) => {
    setIsTouched(true);
    data.setInputval(() => {
      return {
        ...data.inpval,
        [instance.input.name]: instance.input.value,
      };
    });
  };

  useEffect(() => {
    fetchMasterData();
    setDefaultHold(data?.HoldReasons);
  }, []);

  const fetchMasterData = () => {
    getMasterData()
      .then((data) => {
        setMasterData(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitChart = async (e) => {
    e.preventDefault();
    getChartDetails(id);
    let obj = data.inpval;

    obj = {
      ...obj,
      milestone_id: milestone?.value,
      assignee_id: assignee?.value,
      HoldReasons: defaultHold?.map((item) => item?.value),
      task_type: taskType?.value,
      epic_id: data?.epic?.value,
      sprint_id: data?.sprint?.value
    };
    let boolValid = false;
    boolValid = await validateSchema(obj, clientData);
    if (boolValid) {
      setErrorsForChat({});
      saveChartInfo(id, obj, errorsForChat, clientData)
        .then((res) => {
          if (res === true) {
            setReRenderChart(!reRenderChart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validateSchema = async (obj, clientData) => {
    const response = await validate(obj, clientData);
    if (Object.keys(response).length === 0) {
      return true;
    } else {
      setErrorsForChat(response);
      return false;
    }
  };

  const getdata = (e) => {
    setIsTouched(true);
    const { value, name } = e.target;

    data.setInputval(() => {
      return {
        ...data.inpval,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (event) => {
    setIsTouched(true);
    const selectedId = parseInt(event.target.value);
    const { name } = event.target;
    data.setInputval(() => {
      return {
        ...data.inpval,
        [name]: selectedId,
      };
    });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 8) {
      setIsTouched(true);
      const { value, name } = e.target;

      data.setInputval(() => {
        return {
          ...data.inpval,
          [name]: value,
        };
      });
    }
  };

  return (
    <>
      <div className="col-xl-12">
        <div className="flex-lg-row-fluid">
          <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-1 mb-1 ms-10">
            <li className="nav-item"></li>
          </ul>
          <div className="tab-content chart-details-tabs" id="myTabContent">
            <div className="tab-pane fade show active" id="kt_user_view_basic_tab" role="tabpanel">
              <ChartInfo setIsTouched={setIsTouched} masterData={masterData} mainData={data} errorsForChat={errorsForChat} getdata={getdata} handleKeypress={handleKeypress} enabled={enabled && (auth.role === role?.Coder || auth.role === role?.Member || auth.role === role?.Manager || auth.role === role?.TeamLead || auth.role === role?.Admin )} data={Object.assign(clientData, data)} handleDateTimeChange={handleDateTimeChange} handleSelectChange={handleSelectChange} errorsFromAuditorToChart={errorsFromAuditorToChart} taskType={taskType} setTaskType={setTaskType}/>
              {/* <AuditInformation enabled={enabled && (auth.role === role.Auditor || auth.role === role.Manager || auth.role === role?.TeamLead)} masterData={data.masterData} clientData={clientData} handleManagerSubmit={handleManagerSubmit} isMangerSubmit={isMangerSubmit} data={Object.assign(clientData, data)} setIsTouched={setIsTouched} /> */}
              {/* {true && auth.role === role.Manager && (
                <div className="d-flex justify-content-start ms-5 mb-6">
                  <button
                    onClick={(e) => {
                      submitChart(e);
                      handleManagerSubmit(true);
                    }}
                    type="submit"
                    id="manager_submit"
                    className="btn fw-bold btn-primary me-2"
                  >
                    Save
                  </button>
                </div>
              )} */}
              <div className="d-flex justify-content-start ms-5 mb-6">
                <button onClick={(e) => { submitChart(e); }} type="submit" id="manager_submit" className="btn fw-bold btn-primary me-2" >
                  Save
                </button>
                {/* <button type="reset" className="btn btn-light fw-bold btn-active-light-primary" data-kt-search-element="preferences-dismiss">
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChartForm;
