import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Auth/Middleware/AuthContext";
import localStorageStore from "../../utils/localStorageStore";
import Role from "../../utils/role"
import { useMsal } from "@azure/msal-react";
import { clearStorage } from "../../utils/storageUtils";

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  // const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("attending");
    localStorage.removeItem("template")
    authContext.loginAuth(false);
    // navigate("/login");
    handleLogoutRedirect()
  };

  const handleLogoutRedirect = () => {
    let account = instance.getActiveAccount();
    clearStorage(account);

    instance.logoutRedirect({
        account: instance.getActiveAccount(),
    });
  };

  const decryptRole = localStorageStore.getRole();

  return (
    <>
      <div>
      <div id="sidenav-overlay"></div>
      <div className="sidebar p-2 py-md-3 sidebar-mini">
        <div className="container-fluid">
          <div className="title-text d-flex align-items-center mb-4 mt-1">
            <h4 className="sidebar-title mb-0 flex-grow-1">
              <span className="sm-txt logo-collapsed">
                <img src="../assets/media/logos/logo-sm.png" alt="" width="40px" />
              </span>
              <span>
                <img src="../assets/media/logos/logo.png" alt="" width="130px" className="ms-1 theme-light-show" />
                <img src="../assets/media/logos/logo-white.png" alt="" width="130px" className="ms-1 theme-dark-show" />
              </span>
            </h4>
          </div>
          <div className="main-menu flex-grow-1">
            <ul className="menu-list">
            {/* { (localStorageStore.getRole() === Role.Manager || localStorageStore.getRole() === Role.TeamLead) ?  <li>
								<Link className="m-link" to="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                            <path className="fill-secondary" d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z">
                            </path>
                            <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z">
                            </path></svg>
									<span className="ms-2">Dashboard</span>
									<span className="highlight">Dashboard</span>
								</Link>
							</li> : null} */}
              { (decryptRole === Role.Manager || decryptRole === Role.Member || decryptRole === Role.TeamLead || decryptRole === Role.Admin) ?  <li>
								<Link className="m-link" to={(decryptRole === Role.Manager || decryptRole === Role.TeamLead || decryptRole === Role.Admin) ? "/manager-worklist" : decryptRole === Role.Member ? "/member-worklist" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                            <path className="fill-secondary"
                                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z">
                            </path>
                            <path
                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z">
                            </path>
                            <path
                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z">
                            </path>
                        </svg>
									<span className="ms-2">Projects</span>
									<span className="highlight">Projects</span>
								</Link>
							</li> : null }
              <li>
                <Link className="m-link" to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 11C1 10.7348 1.10536 10.4804 1.29289 10.2929C1.48043 10.1054 1.73478 10 2 10H4C4.26522 10 4.51957 10.1054 4.70711 10.2929C4.89464 10.4804 5 10.7348 5 11V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V11ZM6 7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H9C9.26522 6 9.51957 6.10536 9.70711 6.29289C9.89464 6.48043 10 6.73478 10 7V14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15H7C6.73478 15 6.48043 14.8946 6.29289 14.7071C6.10536 14.5196 6 14.2652 6 14V7Z"></path>
                    <path className="fill-secondary" d="M11.2929 1.29289C11.1054 1.48043 11 1.73478 11 2V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1H12C11.7348 1 11.4804 1.10536 11.2929 1.29289Z"></path>
                  </svg>
                  <span className="ms-2">Tasks</span>
                  <span className="highlight">Tasks</span>
                </Link>
              </li>
              {
                (decryptRole === Role.Manager || decryptRole === Role.TeamLead || decryptRole === Role.Admin) ?  <li>
								<Link className="m-link" to="/manager-userlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                            <path className="fill-secondary" d="M15 14C15 14 16 14 16 13C16 12 15 9 11 9C7 9 6 12 6 13C6 14 7 14 7 14H15ZM7.022 13C7.01461 12.999 7.00727 12.9976 7 12.996C7.001 12.732 7.167 11.966 7.76 11.276C8.312 10.629 9.282 10 11 10C12.717 10 13.687 10.63 14.24 11.276C14.833 11.966 14.998 12.733 15 12.996L14.992 12.998C14.9874 12.9988 14.9827 12.9995 14.978 13H7.022ZM11 7C11.5304 7 12.0391 6.78929 12.4142 6.41421C12.7893 6.03914 13 5.53043 13 5C13 4.46957 12.7893 3.96086 12.4142 3.58579C12.0391 3.21071 11.5304 3 11 3C10.4696 3 9.96086 3.21071 9.58579 3.58579C9.21071 3.96086 9 4.46957 9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7ZM14 5C14 5.39397 13.9224 5.78407 13.7716 6.14805C13.6209 6.51203 13.3999 6.84274 13.1213 7.12132C12.8427 7.3999 12.512 7.62087 12.1481 7.77164C11.7841 7.9224 11.394 8 11 8C10.606 8 10.2159 7.9224 9.85195 7.77164C9.48797 7.62087 9.15725 7.3999 8.87868 7.12132C8.6001 6.84274 8.37913 6.51203 8.22836 6.14805C8.0776 5.78407 8 5.39397 8 5C8 4.20435 8.31607 3.44129 8.87868 2.87868C9.44129 2.31607 10.2044 2 11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5Z">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.216 14C5.06776 13.6878 4.99382 13.3455 5 13C5 11.645 5.68 10.25 6.936 9.28C6.30909 9.08684 5.65595 8.99237 5 9C1 9 0 12 0 13C0 14 1 14 1 14H5.216Z">
                            </path>
                            <path d="M4.5 8C5.16304 8 5.79893 7.73661 6.26777 7.26777C6.73661 6.79893 7 6.16304 7 5.5C7 4.83696 6.73661 4.20107 6.26777 3.73223C5.79893 3.26339 5.16304 3 4.5 3C3.83696 3 3.20107 3.26339 2.73223 3.73223C2.26339 4.20107 2 4.83696 2 5.5C2 6.16304 2.26339 6.79893 2.73223 7.26777C3.20107 7.73661 3.83696 8 4.5 8Z">
                            </path>
                        </svg>
                        <span className="ms-2">Users</span>
                        <span className="highlight">Users</span>
								</Link>
							</li> : null}
              {/* { (decryptRole === Role.Manager || decryptRole === Role.TeamLead || decryptRole === Role.Admin) ?  <li>
								<Link className="m-link" to="/configuration">
								<svg viewBox="0 0 16 16" width="18px" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path className="fill-secondary" d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z">
                            </path>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z">
                            </path>
                        </svg>
									<span className="ms-2">Configurations</span>
									<span className="highlight">Configurations</span>
								</Link>
							</li> : null} */}
              { (decryptRole === Role.Manager || decryptRole === Role.TeamLead || decryptRole === Role.Admin) ?  <li>
								<Link className="m-link" to="/manager-reports">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H1V15H16V16H0V0Z"></path>
                            <path className="fill-secondary"
                                d="M10.1465 3.14645C10.0527 3.24021 10 3.36739 10 3.5C10 3.63261 10.0527 3.75979 10.1465 3.85355C10.2402 3.94732 10.3674 4 10.5 4H13.445L9.96301 8.256L7.35401 5.646C7.30288 5.59492 7.24129 5.55554 7.17347 5.53055C7.10565 5.50557 7.03323 5.49559 6.96118 5.50129C6.88914 5.50699 6.81918 5.52825 6.75614 5.56359C6.6931 5.59893 6.63847 5.64751 6.59601 5.706L2.59601 11.206C2.52384 11.3134 2.4961 11.4446 2.51862 11.572C2.54114 11.6994 2.61217 11.8131 2.71678 11.8892C2.82139 11.9653 2.95144 11.9979 3.0796 11.9802C3.20775 11.9624 3.32403 11.8957 3.40401 11.794L7.06001 6.767L9.64701 9.354C9.69641 9.4033 9.75557 9.44172 9.82071 9.46678C9.88585 9.49184 9.95551 9.50299 10.0252 9.4995C10.0949 9.49602 10.1631 9.47798 10.2254 9.44655C10.2877 9.41511 10.3428 9.37099 10.387 9.317L14 4.9V7.5C14 7.63261 14.0527 7.75979 14.1465 7.85355C14.2402 7.94732 14.3674 8 14.5 8C14.6326 8 14.7598 7.94732 14.8536 7.85355C14.9473 7.75979 15 7.63261 15 7.5V3.5C15 3.36739 14.9473 3.24021 14.8536 3.14645C14.7598 3.05268 14.6326 3 14.5 3H10.5C10.3674 3 10.2402 3.05268 10.1465 3.14645Z">
                            </path>
                        </svg>
									<span className="ms-2">Timesheet</span>
									<span className="highlight">Timesheet</span>
								</Link>
							</li> : null}
              { (decryptRole === Role.Manager || decryptRole === Role.TeamLead || decryptRole === Role.Member || decryptRole === Role.Admin) ?  <li>
								<Link className="m-link" to="/kanban-board">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                            <path className="fill-secondary"
                                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z">
                            </path>
                            <path
                                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z">
                            </path>
                            <path
                                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z">
                            </path>
                        </svg>
									<span className="ms-2">Kanban Board</span>
									<span className="highlight">Kanban Board</span>
								</Link>
							</li> : null}
            </ul>
          </div>
          <ul className="menu-list nav navbar-nav flex-row text-center">
            <li className="nav-item flex-fill p-2">
              <a className="d-inline-block w-100 color-400" href="/" onClick={(event) => handleLogout(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path className="fill-secondary" d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg>
              </a>
            </li>
          </ul>
          
        </div>
      </div>
      </div>
    </>
  );
};
export default Sidebar;
