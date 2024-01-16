import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AuthContext from "../Auth/Middleware/AuthContext";
import { getUserDetail, updateNotificationAsRead } from "../../services/userService";
import { socket } from "../../utils/socket";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(authContext.loginUserId !== null){
      getUserDetail(authContext?.token ?? "").then((responseUserDetails) => {
        if (responseUserDetails.success) {
          setNotifications(responseUserDetails?.data?.notifications);
        } else {
          if(responseUserDetails.message !== 'Unauthorized') {
            window.toastr.error(responseUserDetails.message);
          }
        }
      }).catch((error) => {
        window.toastr.error(error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authContext.loginUserId) {
      socket.connect();
      socket.on("connect", () => {
        socket.emit("mapUser", { sid: socket.id, user_id: parseInt(authContext.loginUserId) });
      });
    }
    socket.on("notification", (data) => {
      getUserDetail(authContext?.token ?? "").then((responseUserDetails) => {
        if (responseUserDetails.success) {
          window.toastr.info(data?.notification);
          setNotifications(responseUserDetails?.data?.notifications);
        }
      }).catch((error)=>{
        window.toastr.error(error);
      });
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotificationClick = (notificationId, taskId) => {
    updateNotificationAsRead({
      notification_id: notificationId,
    }).then((response) => {
      if (response.success === true) {
        getUserDetail(authContext?.token ?? "").then((responseUserDetails) => {
          if (responseUserDetails.success) {
            setNotifications(responseUserDetails?.data?.notifications);
            navigate(`/process-chart/${taskId}`);
          } else {
            window.toastr.error(responseUserDetails.message);
          }
        }).catch((error)=>{
          window.toastr.error(error);
        });
      }
    }).catch((error)=>{
      window.toastr.error(error);
    });
  };

  return (
    <div className="d-flex align-items-center ms-2 ms-lg-3">
      <Link onClick={ e => e.preventDefault()} className="btn btn-icon h-35px w-md-40px h-md-40px" data-kt-menu-trigger="{default:'click', sm: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
        <span className="svg-icon svg-icon-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 480 544" fill="currentColor">
            <style>{}</style>
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
          </svg>
        </span>
      </Link>
      <div className="menu menu-sub menu-sub-dropdown menu-column w-350px" data-kt-menu="true">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              Notifications
              <span className="badge badge-light-success fs-7 fw-500 ms-3">{notifications.length} pending</span>
            </h3>
          </div>
          <div className="card-body p-0">
            <div className="mh-350px scroll-y py-3">
              {notifications.length !== 0 ? (
                notifications?.map((row) => {
                  return (
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        handleNotificationClick(row.id, row.task_id);
                      }}
                      key={row.id}
                      className={`d-flex align-items-center py-3 px-9`}
                    >
                      <div className="symbol symbol-40px symbol-circle me-5">
                        <span className="symbol-label bg-light-warning">
                          <span className={`svg-icon svg-icon-1 ${row.is_read ? "svg-icon-light-secondary" : "svg-icon-warning"}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="currentColor"></path>
                              <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="currentColor"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                      <div className="mb-1 pe-3 flex-grow-1">
                        <div className={`fs-6 fw-semibold ${row.is_read ? "text-gray-600" : "text-dark"}`}>{row.notification}</div>
                        <OverlayTrigger key={"right"} placement={"top"} overlay={<Tooltip id="tooltip-right">{moment(row.createdAt).format("DD-MM-YYYY HH:mm a")}</Tooltip>}>
                          <div className={`${row.is_read ? "text-gray-500" : "text-dark"} fw-semibold fs-7`}>{moment(row.createdAt).fromNow()}</div>
                        </OverlayTrigger>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="ms-4">No notifications available...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
