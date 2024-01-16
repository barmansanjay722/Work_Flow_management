import { useEffect, useState } from "react";
import { getLogHours, deleteLogHours } from "../../services/chartService";
import { getUserDetail } from "../../services/userService";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import LogHoursModal from "./LogHoursModal";
import moment from "moment";

const LogHours = ({ enabled, taskDetails }) => {
  const navigateStateGlobal = useLocation();
  const { id } = useParams();
  const [modalValues, setModalValues] = useState(taskDetails);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [logHours, setLogHours] = useState([]);
  const [showModalBox, setShowModalBox] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchLogHours(id);
    fetchLoggedInUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, navigateStateGlobal, success]);

  const fetchLogHours = (id) => {
    getLogHours(id)
      .then((response) => {
        if (response.success === true) {
          setLogHours(response?.data);
        } else {
          window.toastr.error(response.message);
        }
      })
      .catch((error) => {
        window.toastr.error(error);
      });
  };

  const fetchLoggedInUserDetails = () => {
    getUserDetail()
      .then((response) => {
        if (response.success === true) {
          setLoggedInUser({ id: response?.data?.id, name: `${response?.data?.first_name} ${response?.data?.last_name}` });
        } else {
          window.toastr.error(response.message);
        }
      })
      .catch((error) => {
        window.toastr.error(error);
      });
  };

  const handleModalClose = () => {
    Swal.fire({
      text: "Are you sure you would like to cancel?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, return",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-active-light",
      },
    })
      .then((result) => {
        if (result.value) {
          setShowModalBox(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleShowDeleteLog(log_id) {
    Swal.fire({
      text: "Are you sure you would like to delete this Log?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-active-light",
      },
    }).then(async function (result) {
      if (result?.value === true) {
        deleteLogHours(id, log_id).then(response=> {
          if(response.success){
            window.toastr.success('Log Hours deleted successfully');
            setSuccess(!success);
          } else {
            window.toastr.error(response.message);
          }
        })
      }
    });
  }

  const showTable = () => {
    return logHours?.map((row) => (
      <tr key={row?.id}>
        <td className="ps-2">
          <strong className="text-gray-900">{row?.assignee_name ?? ""}</strong>
        </td>
        <td>{row?.date ?? ""}</td>
        <td>{row?.hours ?? ""}</td>
        <td>
          <button className="btn btn-sm btn-icon btn-light-primary" onClick={(e) => {
            e.preventDefault();
            setModalValues({ id: row?.id, assignee_name: row?.assignee_name, assignee_id: row?.assignee_id, date: row?.date, hours: row?.hours, description: row?.description, task_id: row?.task_id, task_no: row?.task_no, modal_type: parseInt(row?.assignee_id) === parseInt(loggedInUser.id) ? "update" : "view" });
            setShowModalBox(true);
          }}>
            <i className={`${parseInt(row?.assignee_id) === parseInt(loggedInUser.id) ? 'fas fa-pen' : 'far fa-eye'}`} />
          </button>
          { row?.assignee_id === loggedInUser.id ? <button className="btn btn-sm btn-icon btn-light-primary delete-row mobile-delete-row ms-1" onClick={() => handleShowDeleteLog(row?.id)}>
            <i className="fa fa-trash" title="Delete Log Hours"></i>
          </button> : null}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="col-12 mt-6 p-0">
        <div className="card card-flush h-lg-100">
          <div className="card-header py-4 minimize">
            <p className="card-title align-items-start flex-column">
              <span className="fw-bold h4">Log Hours</span>
              <span className="text-muted mt-1 fw-semibold fs-6">Hours logged for this task</span>
            </p>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div className="card-body py-2 collapse">
            <div className="table-responsive">
              <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_table_todo_list">
                <thead>
                  <tr className="text-start text-dark fw-bold fs-7 text-uppercase gs-0">
                    <th className="min-w-80px ps-2">Assignee</th>
                    <th className="min-w-80px">Date</th>
                    <th className="min-w-80px">Log Hours</th>
                    <th className="min-w-80px">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">{logHours.length !== 0 && showTable()}</tbody>
              </table>{" "}
            </div>
            <div className="row p-2 ">
              <div className="form-group">
                <button
                  type="button"
                  data-repeater-create=""
                  className="btn btn-sm btn-primary fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalValues({ id: "", assignee_name: loggedInUser.name, assignee_id: loggedInUser.id, date: moment().format("DD-MM-YYYY"), hours: "01:00", description: "", task_id: taskDetails?.task_id, task_no: taskDetails?.taskNo, modal_type: "add" });
                    setShowModalBox(true);
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Log Hours
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalBox && <LogHoursModal handleModalClose={handleModalClose} setShowModalBox={setShowModalBox} setSuccess={setSuccess} success={success} showModalBox={showModalBox} taskDetails={taskDetails} modalValues={modalValues} />}
    </>
  );
};

export default LogHours;
