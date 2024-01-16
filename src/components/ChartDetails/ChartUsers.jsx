import React from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../Auth/Middleware/AuthContext";
// import role from "../../utils/role";
import { imageIdGenerate } from "../../utils/custom";
import role from "../../utils/role";

function ChartUsers(props) {
  // const auth = useContext(AuthContext);
  const { data } = props;
  
  return (
    <>
      <div className="col-12">
        <div className="card card-flush">
          <div className="card-header py-4 minimize">
            <p className="card-title align-items-start flex-column">
              <span className="fw-bold h4">Users</span>
            </p>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body pt-0">
           {data.hasOwnProperty("Coder") ? data?.coders?.map((item, index) => (<div className="d-flex flex-stack py-2" key={index}>
              <div className="d-flex align-items-center"> 
                <div className="symbol symbol-45px symbol-circle">
                {item?.role !== role.TeamLead ? <img alt="Pic" src={item?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.id ?? "4")}.jpg`} /> :
                <img style={{marginLeft:"0.9rem"}} alt="Pic" src={item?.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.id ?? "4")}.jpg`} />}
                  <p className="mt-1"><span className="badge bg-light text-muted">{item?.role}</span></p>
                </div>
                <div className="ms-5">
                  <Link to="" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
                   {item?.name}
                  </Link>
                  <div className="fw-semibold text-muted">
                    {item?.role_sequence}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end ms-2">
               <p className="mb-0 fs-3">{item?.date ?? ""}</p>
                <span className="text-muted fs-7 mb-1">Date of Coding</span>
              </div>
            </div>)) : ""}
           {data.hasOwnProperty("Coder") && (<div className="separator separator-dashed my-3" style={{ backgroundColor: "white" }}/>)} 
            {data.hasOwnProperty("Auditor") ? data?.auditors?.map((item, index) => (<div className="d-flex flex-stack py-2" key={index}>
              <div className="d-flex align-items-center" >
                <div className="symbol symbol-45px symbol-circle">
                {item?.role !== role.TeamLead ? <img alt="Pic" src={item.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.id ?? "1")}.jpg`} /> :
                  <img style={{marginLeft:"0.9rem"}} alt="Pic" src={item.image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.id ?? "1")}.jpg`} />}
                  <p className="mt-1"><span className="badge bg-light text-muted">{item?.role}</span></p>
                </div>
                <div className="ms-5">
                  <Link to="" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
                  {item?.name}
                  </Link>
                  <div className="fw-semibold text-muted">
                    {item?.role_sequence}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end ms-2">
               <p className="mb-0 fs-3">{item?.date ?? ""}</p>
                <span className="text-muted fs-7 mb-1">Date of Auditing</span>
              </div>
            </div>)) : ""}
          </div>
        </div>
      </div>
    </>
  );
}
export default ChartUsers;