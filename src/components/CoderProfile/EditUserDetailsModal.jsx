import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import moment from "moment/moment";
import { UpdateUserProfile, fetchMasterOnRole } from "../../services/managerService";
import Swal from "sweetalert2";
import localStorageStore from "../../utils/localStorageStore";


const EditUserDetailsModal = ({ showModalBox, handleCloseModal, userAllDetails, handleProfileData }) => {
  const [desigList, setDesigList] = useState([]);
  const [masterData, setMasterData] = useState();

  useEffect(() => {
    if(!Array.isArray(userAllDetails) && userAllDetails?.RoleId){
      fetchChartData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAllDetails]);

  const fetchChartData = async () => {
    fetchMasterOnRole(userAllDetails?.RoleId)
      .then((response) => {
        setMasterData(response);
        setDesigList(response?.designations);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const options = {
    maxDate: new Date(),
    dateFormat: "m/d/Y",
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      dateOfJoining: "",
      designation: "",
      role: "",
      speciality: [],
      location: [],
      Client: [],
    },
  });

  useEffect(() => {
    setValue("name", userAllDetails?.first_name + " " + userAllDetails?.last_name);
    setValue("role", { value: userAllDetails?.RoleId, label: userAllDetails?.Role });
    setValue("designation", { value: userAllDetails?.Designation?.id, label: userAllDetails?.Designation?.name });
    setValue("dateOfBirth", moment(userAllDetails?.date_of_birth).format("MM/DD/YYYY"));
    setValue("dateOfJoining", moment(userAllDetails?.joining_date).format("MM/DD/YYYY"));
    setValue(
      "speciality",
      userAllDetails?.Specialties?.map((item) => ({
        value: item?.id,
        label: item?.name,
      }))
    );
    setValue(
      "location",
      userAllDetails?.Locations?.map((item) => ({
        value: item?.id,
        label: item?.name,
      }))
    );
    setValue(
      "Client",
      userAllDetails?.Clients?.map((item) => ({
        value: item?.id,
        label: item?.name,
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAllDetails]);

  const renderLocations = () => {
    return masterData?.locations?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderSpecialties = () => {
    return masterData?.specialties?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderClients = () => {
    return masterData?.clients?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderDesignation = () => {
    return desigList?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderRole = () => {
    return masterData?.roles?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  async function handleRegistration(data) {
    const value = data?.designation?.label;
    localStorageStore.setRole(value);
    let obj = {
      first_name: data?.name?.substring(0, data?.name?.indexOf(" ")),
      last_name: data?.name?.length !== 0 ? data?.name?.substring(data?.name?.indexOf(" ") + 1) : "",
      date_of_birth: moment(data?.dateOfBirth).format("YYYY-MM-DD"),
      joining_date: moment(data?.dateOfJoining).format("YYYY-MM-DD"),
      RoleId: data?.role?.value,
      DesignationId: data?.designation?.value,
      Locations: data?.location?.map((item) => item.value),
      Clients: data?.Client?.map((item) => item.value),
      Specialties: data?.speciality?.map((item) => item.value),
    };

    const response = await UpdateUserProfile(userAllDetails?.id, obj);
    if (response?.success === true) {
      handleCloseModal();
      window.toastr.success(response?.message);
      handleProfileData(response);
    }
    if (response?.success === false) {
      window.toastr.error(response?.error?.map((item) => item?.message));
    }
  }

  const handleResetCancel = () => {
    reset({
      first_name: null,
      last_name: null,
      RoleId: null,
      date_of_birth: null,
      joining_date: null,
      Specialties: null,
      Locations: null,
      Clients: null,
      DesignationId: null,
    });
    handleProfileData("false");
    handleCloseModal();
  };

  const handleButton = () => {
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
    }).then(function (result) {
      if (result.value) {
        handleProfileData("false");
        handleCloseModal();
      } else if (result) {
        Swal.fire({
          text: "Your form has not been cancelled!",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    });
  };

  const handleRole = async (event) => {
    let response = await fetchMasterOnRole(event.value);
    setDesigList(response.designations);
    setValue("designation", null);
  };

  return (
    <>
      <Modal show={showModalBox}>
        <Modal.Header>
          <h2 className="fw-bold">Edit User Details</h2>
          <div className="btn btn-icon btn-sm btn-active-icon-primary" onClick={handleButton}>
            <i className="fas fa-times"></i>
          </div>
        </Modal.Header>
        <div className="modal-body py-10 px-lg-17">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="row">
              <div className="fv-row mb-7 col-lg-6">
                <label className="required form-label fs-6 fw-semibold mb-2">Name</label>
                <input type="text" className="form-control" placeholder="" name="name" {...register("name", { required: "Required" })} />
                <small className="text-danger">{errors?.name && errors.name.message}</small>
              </div>
              <div className="fv-row mb-7 col-lg-6">
                <label className="required form-label fs-6 fw-semibold mb-2">
                  <span>Speciality</span>
                </label>
                <Controller name="speciality" control={control} rules={{ required: "Required" }} render={({ field }) => <Select {...field} isMulti options={renderSpecialties()} />} />
                <small className="text-danger">{errors?.speciality && errors.speciality.message}</small>
              </div>
            </div>
            <div className="row">
              <div className="fv-row mb-7 col-lg-6">
                <label className="required form-label fs-6 fw-semibold mb-2">Role</label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={renderRole()}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        handleRole(selectedOption);
                      }}
                    />
                  )}
                />
                <small className="text-danger">{errors?.role && errors.role.message}</small>
              </div>
              <div className="fv-row mb-7 col-lg-6">
                <label className="required form-label fs-6 fw-semibold mb-2">Designation</label>
                <Controller name="designation" control={control} rules={{ required: "Required" }} render={({ field }) => <Select {...field} options={renderDesignation()} />} />
                <small className="text-danger">{errors?.designation && errors.designation.message}</small>
              </div>
            </div>
            <div className="row">
              <div className="fv-row mb-7 col-lg-6">
                <label className="form-label fs-6 fw-semibold mb-2">Client</label>
                <Controller name="Client" control={control} render={({ field }) => <Select {...field} isMulti options={renderClients()} />} />
                <small className="text-danger">{errors?.Client && errors.Client.message}</small>
              </div>
              <div className="fv-row mb-7 col-lg-6">
                <label className="form-label fs-6 fw-semibold mb-2">
                  <span>Location</span>
                </label>
                <Controller name="location" control={control} render={({ field }) => <Select {...field} isMulti options={renderLocations()} />} />
                <small className="text-danger">{errors?.location && errors.location.message}</small>
              </div>
            </div>
            <div className="row">
              <div className="fv-row mb-7 col-lg-6">
                <label className="form-label fs-6 fw-semibold mb-2">
                  <span>Date of birth</span>
                </label>
                <Controller name="dateOfBirth" control={control} render={({ field }) => <Flatpickr id="dateOfBirth" className="form-control" placeholder="" options={options} value={field.value} onChange={(date) => field.onChange(date[0])} />} rules={{ required: "Required" }} />
              </div>
             <div className="fv-row mb-7 col-lg-6">
                <label className="form-label fs-6 fw-semibold mb-2">Date of joining</label>
                <Controller name="dateOfJoining" control={control} render={({ field }) => <Flatpickr id="dateOfJoining" className="form-control" placeholder="" options={options} value={field.value} onChange={(date) => field.onChange(date[0])} />} rules={{ required: "Required" }} />
              </div>    
            </div>
            <div className="flex-right justify-content-start">
              <button type="submit" className="btn btn-primary me-3">
                <span className="indicator-label">Submit</span>
                <span className="indicator-progress">
                  Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
              <button type="reset" className="btn btn-light me-3" onClick={handleResetCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditUserDetailsModal;
