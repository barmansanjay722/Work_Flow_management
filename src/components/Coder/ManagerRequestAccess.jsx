import { useContext } from "react";
import { requestAccess } from "../../services/userService";
import AuthContext from "../Auth/Middleware/AuthContext";

const ManagerRequestAccess = ({requestBody, handleLogoutRedirect}) => {
  const authContext = useContext(AuthContext);
  const handleRequestAccessClick = () => {
      requestAccess(requestBody).then((response) => {
        if(response.success){
          window.toastr.success(response.message);
          authContext.setAlreadyRequestedAccess(true);
        } else {
          window.toastr.error(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="card h-md-100" dir="ltr">
        <div className="card-body d-flex flex-column flex-center">
          <div className="mb-2 text-center">
            <p className="mt-5 fw-bold fs-3 mb-1">You do not have access to this system.</p>
            <p className="mt-1 fs-6">Please click on Request Access button below</p>
            <div className="py-10 text-center">
              <img src="../assets/media/svg/illustrations/easy/6.svg" className="theme-light-show w-200px" alt="" />
              <img src="../assets/media/svg/illustrations/easy/6.svg" className="theme-dark-show w-200px" alt="" />
            </div>
          </div>
          <div className="text-center mb-1">
            <button disabled={authContext.alreadyRequestedAccess} className="btn btn-lg btn-primary me-2 not-attending" data-bs-dismiss="modal" onClick={()=> handleRequestAccessClick()}>
              Request Access
            </button>
            <button className="btn btn-lg btn-secondary color-400" href="/" onClick={() => handleLogoutRedirect()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerRequestAccess;