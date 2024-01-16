import { useContext, useRef, useState } from "react";
import EditUserDetailsModal from "./EditUserDetailsModal";
import Swal from "sweetalert2";
import { deactivateUser, activateUser } from "../../services/userService";
import moment from "moment/moment";
import AuthContext from "../Auth/Middleware/AuthContext";
import { deletePreviousImage, getS3Object, updateUserImage } from "../../utils/custom";
import localStorageStore from "../../utils/localStorageStore";
import role from "../../utils/role";

const CoderDetails = ({ coderData, handleProfileData, handleDeactiviateUser, handleActivateUser }) => {
  const [showModalBox, setShowModalBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const profileDetailPictureRef = useRef(null)
  const authContext = useContext(AuthContext);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      window.toastr.error('File size exceeds the maximum limit of 2MB.');
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      window.toastr.error('Only JPEG, PNG, and WEBP images are allowed.');
      return;
    }

    handleUpload(file);
  };

  const handleUpload = (file) => {
    if (!file) {
      window.toastr.error('Please select a file to upload.');
      return;
    }

    setLoading(true);

    const s3 = getS3Object();

    const params = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Key: `user-images/PP-${coderData?.first_name?.trim()}-${coderData?.last_name?.trim()}-${coderData?.id}-${moment().unix()}.${file.name.substr(file.name.lastIndexOf('.') + 1)}`,
      Body: file,
      ACL: 'public-read'
    };

    s3.upload(params, (err, data) => {
      setLoading(false);
      if (err) {
        window.toastr.error('Failed to upload image.' + err);
      } else {
        const imageUrl = data.Location; // S3 URL of the uploaded image
        const previousImageUrl = coderData?.image_url;
        if(imageUrl) {
          updateUserImage(imageUrl).then((response) => {
            if (response.success) {
              if (parseInt(coderData?.id) === parseInt(authContext.loginUserId)) {
                localStorage.setItem('userImageUrl', imageUrl);
                authContext.setImageUrl(imageUrl);
                profileDetailPictureRef.current.style.backgroundImage = `url(${imageUrl})`;
        
                if(previousImageUrl) {
                  deletePreviousImage(previousImageUrl);
                }
              }
              window.toastr.success(response.message);
            } else {
              window.toastr.error(response.message);
            }
          });
        }
      }
    });
  };

  const handleCloseModal = () => {
    setShowModalBox(false);
  };

  const handleShow = () => {
    const element = document.getElementById("kt_user_view_details_collapse");
    const hasClass = element.classList.contains("show");
    if (hasClass) {
      element.classList.remove("show");
    } else {
      element.classList.add("show");
    }
  };

  async function handleShowDecline(id) {
    Swal.fire({
      text: "Are you sure you would like to deactivate this user?",
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
        const response = await deactivateUser(id);
        if (response?.success === true) {
          window.toastr.success(response?.message);
          handleDeactiviateUser(response);
        }
      }
    });
  }
  async function handleShowActivate(id, type) {
    Swal.fire({
      text: "Are you sure you would like to activate this user?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-active-light",
      },
    }).then(async function (result) {
      if (result?.value === true) {
        const response = await activateUser(id, type);
        if (response?.success === true) {
          window.toastr.success(response?.message);
          handleActivateUser(response);
        }
      }
    });
  }
  const UserId = coderData?.id;
  const decryptRole = localStorageStore.getRole();
  return (
    <>
      <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
        <div className="card mb-5 mb-xl-8 chart_card">
          <div className="card-body">
            <div className="d-flex flex-center flex-column py-5">
              <div className="image-input image-input-outline image-input-placeholder" data-kt-image-input="true">
                { loading && <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div> }
                <div ref={profileDetailPictureRef} className="image-input-wrapper w-125px h-125px" style={{backgroundImage: coderData?.image_url ? `url(${coderData?.image_url})`:"url(../assets/media/avatars/blank.png)", borderRadius: "100%"}}>
                </div>
                {(parseInt(coderData?.id) === parseInt(authContext.loginUserId)) && <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" aria-label="Change profile" data-bs-original-title="Change profile" data-kt-initialized="1">
                    <i className="bi bi-pencil-fill fs-7"></i>
                    <input type="file" name="avatar" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleFileChange} />
                    <input type="hidden" name="avatar_remove" />
                </label>}
                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" aria-label="Cancel avatar" data-bs-original-title="Cancel avatar" data-kt-initialized="1">
                    <i className="bi bi-x fs-2"></i>
                </span>
              </div>
              <span className="fs-3 text-gray-800 text-hover-primary fw-bold ">
                {coderData?.first_name} {coderData?.last_name}
              </span>
              <div className="fw-bold mb-4 text-muted">Employee ID: {coderData?.employee_id}</div>
              {coderData?.Designation?.name && <div className="mb-4">
                <div className="badge badge-lg badge-light-info d-inline">{coderData?.Designation?.name}</div>
              </div>}
              <div className="d-flex flex-wrap flex-center mt-4">
              <div className="border border-gray-300 border-dashed rounded py-3 px-6 mb-3">
                <div className="fs-4 fw-bold">
                  <span className="w-75px">{coderData?.present} days</span>
                </div>
                <div className="fw-semibold text-gray-400">Present</div>
              </div>
              <div className="border border-gray-300 border-dashed rounded py-3 px-6 mx-4 mb-3">
                <div className="fs-4 fw-bold">
                  <span className="w-50px">{coderData?.absent} days</span>
                </div>
                <div className="fw-semibold text-gray-400">Absent</div>
              </div>
            </div>
            </div>
            <div className="d-flex flex-stack fs-4 py-3">
              <div className="fw-bold rotate collapsible text-gray-800" data-bs-toggle="collapse" href="#kt_user_view_details" role="button" aria-expanded="false" aria-controls="kt_user_view_details">
                Details
                <span className="ms-2 rotate-180">
                  <span className="svg-icon svg-icon-3">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleShow}>
                      <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </div>
              {(decryptRole === role.Manager || decryptRole === role.Admin) && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light-primary"
                    onClick={(e) => {
                      setShowModalBox(true);
                    }}
                  >
                    Edit
                  </button>)}
            </div>
            <div className="separator" />
            <div id="kt_user_view_details_collapse" className="collapse show">
              <div className="pb-5 fs-6">
                <div className="row">
                  <div className="col-lg-12 col-md-4">
                    <div className="mt-5 text-gray-700">Name</div>
                    <div className="text-gray-800">
                      {coderData?.first_name} {coderData?.last_name}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-4">
                    <div className="mt-5 text-gray-700">Email</div>
                    <div className="text-gray-800">{coderData?.email}</div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Date of birth</div>
                    <div className="text-gray-800">{coderData?.date_of_birth !== "" ? moment(coderData?.date_of_birth).format("MM/DD/YYYY") : ""}</div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Date of joining</div>
                    <div className="text-gray-800">{coderData?.joining_date !== "" ? moment(coderData?.joining_date).format("MM/DD/YYYY") : ""}</div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Designation</div>
                    <div className="text-gray-800">{coderData?.Designation?.name}</div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Speciality</div>
                    <div className="text-gray-800">
                      {coderData?.Specialties?.map((item) => (
                        <span key={item.id} className="badge badge-light mx-1 text-gray-800">
                          {item.name}

                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Client</div>
                    <div className="text-gray-800">
                      {coderData?.Clients?.map((item) => (
                        <span key={item.id} className="badge badge-light mx-1 text-gray-800">
                          {item.name}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="mt-5 text-gray-700">Role</div>
                    <div className="text-gray-800">{coderData?.Role}</div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mt-5 text-gray-700">Location</div>
                    <div className="text-gray-800">
                      {coderData?.Locations?.map((item) => (
                        <span key={item.id} className="badge badge-light mx-1 text-gray-800">
                          {item.name}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-12 mt-6" style={{ textAlign: "center" }}>
                  {
                     UserId !== undefined ? (parseInt(localStorage.getItem("RoleId")) !== UserId ? (
                      coderData?.is_active === true ? (
                        <button type="button" className="btn btn-danger btn-sm fw-semibold" onClick={() => handleShowDecline(coderData?.id)}>
                          Deactivate User
                        </button>
                      ) : (
                        <button type="button" className="btn btn-success btn-sm fw-semibold" onClick={() => handleShowActivate(coderData?.id, "profile-activation")}>
                          Activate User
                        </button>
                      )) : null) : null
                   } 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditUserDetailsModal showModalBox={showModalBox} handleCloseModal={handleCloseModal} userAllDetails={coderData} handleProfileData={handleProfileData} />
        </div>
      </div>
    </>
  );
};
export default CoderDetails;

