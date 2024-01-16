import { useEffect } from "react";

const CoderAttendancePop = (props) => {
  useEffect(() => {
  }, [props.profileData])
  
  return (
    <>
      <div className="card h-md-100" dir="ltr">
        <div className="card-body d-flex flex-column flex-center">
          <div className="mb-2 text-center">
            <h1 className="fw-semibold text-gray-800 ">Welcome</h1>
            <h1>
              <span className="fw-bolder text-primary">
                {props?.profileData?.first_name} {props.profileData?.last_name}
              </span>
            </h1>
            <p className="mt-5 fw-bold fs-3">Please mark your attendance</p>
            <div className="py-10 text-center">
              <img src="../assets/media/svg/illustrations/easy/3.svg" className="theme-light-show w-200px" alt="" />
              <img src="../assets/media/svg/illustrations/easy/3-dark.svg" className="theme-dark-show w-200px" alt="" />
            </div>
          </div>
          <div className="text-center mb-1">
            <button className="btn btn-lg btn-primary me-2 not-attending" onClick={() => props.markIsAttending(true)} data-bs-dismiss="modal">
              <i className="fa-solid fa-check" href=""></i>Attending
            </button>
            <button className="btn btn-lg btn-light not-attending" onClick={() => props.markIsAttending(false)}>
              <i className="fa-solid fa-xmark"></i> Not Attending
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoderAttendancePop;
