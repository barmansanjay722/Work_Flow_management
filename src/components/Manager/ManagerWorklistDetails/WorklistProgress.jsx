import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
function WorklistProgress({ worklistDetail}) {

  const [series,setSeries] = useState([])

  useEffect(() => {
    if (worklistDetail !== null) {
      setSeries([worklistDetail?.notStartedChartsCount,worklistDetail?.inProgressChartsCount, worklistDetail?.completedChartsCount])
    }
  }, [worklistDetail]);

  const labels = ["Not Started", "In Progress", "Closed"];
  
  return (
    <>
      <div className="col-xl-3">
        <div className="card card-flush mb-5 mb-xl-10">
          <div className="card-header pt-5">
            <div className="card-title d-flex flex-column">
              <div className="d-flex align-items-center">
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{worklistDetail?.progressPercentage} %</span>
              </div>
              <span className="text-gray-400 pt-1 fw-semibold fs-6">Project progress</span>
            </div>
            <div className="card-toolbar d-block">
            <OverlayTrigger
              key={"right"}
              placement={"top"}
              overlay={
                <Tooltip id="tooltip-right">
                  Tasks completed / Total tasks * 100
                </Tooltip>
              }
            >
              <i className="fas fa-exclamation-circle ms-2 fs-2" />
            </OverlayTrigger>
            </div>
          </div>
          <div className="card-body pt-6 pb-6 d-flex align-items-center chart-progress">
            <div className="d-flex flex-center me-5 pt-2">
              <div id="donutchart" style={{ width: 80, height: 80 }}>
                <div style={{ position: "relative" }}>
                  <div dir="ltr" style={{ position: "relative", width: 120, height: 120 }}>
                    {(worklistDetail?.notStartedChartsCount !== 0 || worklistDetail?.inProgressChartsCount !== 0 || worklistDetail?.completedChartsCount !== 0) && <div aria-label="A chart." style={{ position: "absolute", left: -30, top: -10, width: "100%", height: "100%", }} >
                      <Chart
                        options={{
                          labels,
                          legend: {
                            show: false,
                          },
                          dataLabels: {
                            enabled: false,
                          },
                          colors:['#f1416c','#ffc60b','#50cd89']
                        }}
                        series={series}
                        type="donut"
                        width="140"
                        
                      />
                      <div aria-label="A tabular representation of the data in the chart." style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden", }} ></div>
                    </div>}
                  </div>
                  <div aria-hidden="true" style={{ display: "none", position: "absolute", top: 130, left: 130, whiteSpace: "nowrap", fontFamily: "Arial", fontSize: 8, fontWeight: "bold", }} >
                  </div>
                  <div />
                </div>
              </div>
            </div>
            <div className="d-flex flex-column content-justify-center w-100 ms-3">
              <div className="d-flex fs-6 fw-semibold align-items-center">
                <div className="bullet w-8px h-6px rounded-2 bg-danger me-3" />
                <div className="text-gray-500 flex-grow-1 me-4">Not Started</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">{worklistDetail?.notStartedChartsCount}</div>
              </div>
              <div className="d-flex fs-6 fw-semibold align-items-center my-3">
                <div className="bullet w-8px h-6px rounded-2 bg-primary me-3" />
                <div className="text-gray-500 flex-grow-1 me-4">In Progress</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">{worklistDetail?.inProgressChartsCount}</div>
              </div>
              <div className="d-flex fs-6 fw-semibold align-items-center">
                <div className="bullet w-8px h-6px rounded-2 me-3" style={{ backgroundColor: "#50cd89" }} />
                <div className="text-gray-500 flex-grow-1 me-4">Closed</div>
                <div className="fw-bolder text-gray-700 text-xxl-end">{worklistDetail?.completedChartsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WorklistProgress;
