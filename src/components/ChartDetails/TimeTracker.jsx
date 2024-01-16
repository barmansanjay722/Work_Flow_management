import { useEffect, useState } from "react";
import { getTotalTime} from "../../services/chartService";
import { useParams,useLocation } from "react-router-dom";

const TimeTracker = ({enabled}) => {
  const navigateStateGlobal = useLocation();
  const { id } = useParams();
  const [totalTime, setTotalTime] = useState();

  useEffect(() => {
    fetchTotalTime(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled,navigateStateGlobal]);

  const fetchTotalTime = (id) => {
    getTotalTime(id)
      .then((data) => {
        setTotalTime(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <div className="col-12 mt-6">
        <div className="card card-flush h-lg-100">
          <div className="card-header py-4 minimize">
            <p className="card-title align-items-start flex-column">
              <span className="fw-bold h4">Time Tracker</span>
              <span className="text-muted mt-1 fw-semibold fs-6">Overall processing time by user</span>
            </p>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div className="card-body py-2 collapse">
            <div className="row p-0 ">
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center  rounded py-4 my-3">
                  <span className="fs-1 fw-bold text-gray-900 counted mb-0 d-block" data-kt-countup="true" data-kt-countup-value={36899} data-kt-initialized={1}>
                    {totalTime?.total_time_taken}
                  </span>
                  <p className="w-100 m-0 pb-0">mm:ss</p>
                  <span className="fs-4 fw-semibold text-success d-block">Total</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center rounded py-4 my-3">
                  <span className="fs-1 fw-bold text-gray-900 counted mb-0 d-block" data-kt-countup="true" data-kt-countup-value={72} data-kt-initialized={1}>
                    {totalTime?.coder_total_time}
                  </span>
                  <span>mm:ss</span>
                  <span className="fs-4 fw-semibold text-primary d-block">Coder</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border border-dashed border-gray-300 text-center rounded py-4 my-3">
                  <span  className="fs-1 fw-bold text-gray-900 counted mb-0 d-block" data-kt-countup="true" data-kt-countup-value={291} data-kt-initialized={1}>
                    {totalTime?.auditor_total_time}
                  </span>
                  <span>mm:ss</span>
                  <span className="fs-4 fw-semibold text-info d-block">Auditor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TimeTracker;

