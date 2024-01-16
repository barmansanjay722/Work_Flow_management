import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthContext from "../Middleware/AuthContext";
import { getUserDetail } from "../../../services/userService";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";
import localStorageStore from "../../../utils/localStorageStore";
import Role from "../../../utils/role";

export default function Index() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { instance } = useMsal();
  const location = useLocation();

  const handleLoginRedirect = () => {
    /**
     * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
     * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
     * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
     */
    try{
      instance.loginRedirect(loginRequest).catch((error) => alert(error));
    } catch (err) {
      window.toastr.error(err)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    
    const jsonResponse = await response.json();
    localStorage.setItem("token", jsonResponse.token);
    localStorage.setItem("attending", jsonResponse.attending);

    if (jsonResponse.success === true) {
      authContext.loginAuth(true);
      authContext.setToken(jsonResponse.token);
      var profileResponse = await getUserDetail(jsonResponse.token);
      const profileJsonResponse = profileResponse.data;
      if (profileResponse.success === true) {
        localStorageStore.setRole(profileJsonResponse.Role);
        localStorage.setItem("RoleId", profileJsonResponse.id)
        authContext.setLoginUserId(profileJsonResponse.id);
        authContext.setRole(profileJsonResponse.Role);

        if(profileJsonResponse.image_url) {
          localStorage.setItem("userImageUrl", profileJsonResponse.image_url);
          authContext.setImageUrl(profileJsonResponse.image_url);
        } else {
          localStorage.removeItem("userImageUrl");
          authContext.setImageUrl(null);
        }
        
        if(localStorageStore.getRole() === Role.Manager || localStorageStore.getRole() === Role.TeamLead){
          navigate("/manager-worklist")
        } else{
          navigate("/");
        }
      }
    } else {
      window.toastr.error(jsonResponse.message);
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/");
    } else {
      if(localStorage.getItem('tokenReplaced')) { localStorage.removeItem('tokenReplaced') } 
      if(localStorage.getItem('AzureTokenGranted')) { localStorage.removeItem('AzureTokenGranted') } 
    }
    document.body.classList.add("auth-bg");
    
    setTimeout(()=>{document.querySelector('.alert')?.classList.add('d-none')}, 3000)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div className="d-flex flex-column flex-lg-row flex-column-fluid login-page">
        <div className="d-flex flex-column flex-lg-row-auto w-xl-600px bg-dark position-xl-relative">
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px">
            <div className="d-flex flex-row-fluid flex-column flex-center text-center">
              <Link to="/" className="py-9 mb-10">
                <img alt="Logo" src="./assets/media/logos/logo-white.png" className="h-70px" />
              </Link>
              <h1 className="fw-bold fs-2qx pb-2 pb-md-4 text-white">Welcome to Mind IT Workflow Management Tool</h1>
              <p className="text-white fw-semibold fs-2 mb-0">Efficient managing for better delivery</p>
            </div>
            <div className="d-flex flex-row-auto flex-center">
              <img src="./assets/media/illustrations/signin.png" alt="" className="h-200px h-lg-400px mb-10 signin-img" />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-500px w-md-400px p-10 p-lg-15 mx-auto">
              <div className={`alert alert-danger d-flex p-2 mb-10 ${location?.state?.error_msg ? "":"d-none"}`} bis_skin_checked="1">
                  <i className="ki-duotone ki-shield-tick fs-2hx text-danger me-4"><span className="path1"></span><span className="path2"></span></i>                    <div className="d-flex flex-column" bis_skin_checked="1">
                    <strong className="text-danger">{location?.state?.error_msg}</strong>
                </div>
              </div>
              <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate" id="kt_sign_in_form" onSubmit={handleSubmit}>
                <div className="text-center mb-10">
                  <h1 className="text-dark mb-3">Sign In to Workflow Management</h1>
                </div>
                <div className="d-none fv-row mb-10 fv-plugins-icon-container">
                  <label className="form-label fs-6 fw-bold text-dark">Email</label>
                  <input className="form-control form-control-lg form-control-solid" value={credentials.email} onChange={onChange} type="text" name="email" autoComplete="off" />
                </div>
                <div className="d-none fv-row mb-10 fv-plugins-icon-container">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label fw-bold text-dark fs-6 mb-0">Password</label>
                    <Link to="/login" className="link-primary fs-6" onClick={() => { window.toastr.info('Please contact Azure Administrator!')}}>
                      Forgot Password ?
                    </Link>
                  </div>
                  <input className="form-control form-control-lg form-control-solid" value={credentials.password} onChange={onChange} type="password" name="password" autoComplete="off" />
                </div>
                <div className="d-none text-center">
                  <button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
                    <span className="indicator-label">Sign In</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
              <div className="text-center">
                  <p className="d-none">-- OR --</p>
                  <button className="btn btn-secondary btn-lg" onClick={() => {handleLoginRedirect()}}>
                    <img src="./assets/media/logos/ms-pictogram.svg" className="x-icon" alt="Microsoft SSO" />
                    <span>&nbsp;&nbsp;Sign in with Microsoft</span>
                  </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
          </div>
        </div>
      </div>
    </>
  );
}
