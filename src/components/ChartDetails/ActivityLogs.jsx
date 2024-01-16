import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getActivityLogData } from "../../services/chartService";

function ActivityLogs({ data, enabled }) {
  const navigateStateGlobal = useLocation();
  const { id } = useParams();
  const [activityLogData, setActivityLogData] = useState();
  
  const fetchActivityLogs = async () => {
    getActivityLogData(id)
      .then((response) => {
        setActivityLogData(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchActivityLogs(id);
    // eslint-disable-next-line
  }, [enabled, navigateStateGlobal]);
  

  return (
    <>
      <div className="col-12 mt-6">
        <div className="card card-flush h-lg-100">
          <div className="card-header py-4 minimize">
            <p className="card-title align-items-start flex-column">
              <span className="fw-bold h4">Activity Logs</span>
              <span className="text-muted mt-1 fw-semibold fs-6">History of activity on this Task</span>
            </p>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div className="card-body collapse">
            <div className="m-0">
              <div className="timeline" style={{ maxHeight: "400px", overflow: "auto" }}>
                <div className="timeline-item">
                  <div className="timeline-line w-20px" />
                  <div className="timeline-icon symbol symbol-circle symbol-20px"></div>
                </div>
                {activityLogData?.data?.map((item, index) => (
                  <div key={index}>
                    <div className="timeline-item">
                      <div className="timeline-line w-20px" />
                      <div className="timeline-icon symbol symbol-circle symbol-20px">
                        <div className="symbol-label bg-light">
                          <i className="fa-solid fa-circle-dot fs-9" />
                        </div>
                      </div>
                      <div className="timeline-content">
                        <div className="pe-3 mb-0">
                          <div className="fs-5 fw-semibold mb-0">{item.activity}</div>
                          <div className="overflow-auto pb-0">
                            <div className="d-flex flex-stack align-items-center mt-0 fs-6">
                              <div className="d-flex align-items-center">
                                <div className="text-muted me-2 fs-7">
                                  {item.timestamp} EST by <span className="text-primary">{item.by_user}</span>
                                </div>
                              </div>
                              <div className="badge bg-light-info text-info right-end">{item.timer}</div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-1 fs-6">
                            <div className=" me-2 fs-7">
                              {item.Changed.length === 0 ? "" : <>Changed:</>}

                              {item.Changed.map((item, index) => (
                                <div key={index}>
                                  <ul className="fs-6">
                                    <li>{item}</li>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivityLogs;
