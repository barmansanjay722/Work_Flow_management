import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "./ManagerUsers.css";
import { getUserAccess, fetchMasterOnRole } from "../../../services/managerService";
import moment from "moment/moment";
  
const AddUserModal = ({ masterData, showModalBox, handleGrantModal, idValue, handleAddUser, handleActiveUser, handleActiveCoder, userDetails }) => {
  
  const [desigList, setDesigList] = useState([]);

  const handleRole = async (event) => {
    if (event.target.value !== "") {
      let response = await fetchMasterOnRole(event.target.value);
      setDesigList(response.designations);
    }
    setValue("RoleId", event.target.value);
    if (errors.RoleId) {
      setValue("RoleId", event.target.value, { shouldValidate: true });
    }
  };
  const options = {
    maxDate: new Date(),
    dateFormat: "m/d/Y",
  };

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
    email: "",
    first_name: "",
    last_name: "",
    },
  });

  useEffect(() => {
    setValue("email", userDetails?.email ?? '');
    setValue("first_name", userDetails?.first_name ?? '');
    setValue("last_name", userDetails?.last_name ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails,showModalBox]);

  const registerOptions = {
    first_name: { required: "Required", pattern: { value: /^\S[A-Za-zÀ-ȕ0-9 ]/, message: "Invalid input" } },
    last_name: { required: "Required", pattern: { value: /^\S[A-Za-zÀ-ȕ0-9 ]/, message: "Invalid input" } },
    employee_id: { required: "Required", pattern: { value: /^\S[A-Za-zÀ-ȕ0-9 ]/, message: "Invalid input" } },
    RoleId: { required: "Required" },
    Specialties: { required: "Required" },
    DesignationId: { required: "Required" },
  };

  const handleRegistration = async (data) => {
    let object = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      employee_id: data?.employee_id,
      email: data?.email,
      RoleId: data?.RoleId,
      date_of_birth: moment(data?.date_of_birth).format("YYYY-MM-DD"),
      joining_date: moment(data?.joining_date).format("YYYY-MM-DD"),
      Specialties: data?.Specialties?.map((item) => item.value),
      Locations: data?.Locations?.map((item) => item.value),
      Clients: data?.Clients?.map((item) => item.value),
      DesignationId: data?.DesignationId,
     
    };

    let response = await getUserAccess(idValue, "grant", object);

    if (response?.success === true) {
      window.toastr.success(response?.message);
      handleAddUser(response);
      handleResetGrantModal();
      handleActiveUser(response);
      handleActiveCoder(response);
    } else {
      handleGrantModal();
      window.toastr.error(response?.error?.map((item) => item?.message));
    }
  };
  
  const handleResetGrantModal = () => {
    reset({
      first_name: null,
      last_name: null,
      employee_id: null,
      RoleId: null,
      date_of_birth: null,
      joining_date: null,
      Specialties: null,
      Locations: null,
      Clients: null,
      DesignationId: null,
      
    });
    handleGrantModal();
  };

  return (
    <Modal show={showModalBox}>
      <Modal.Header>
        <h2 className="fw-bold">Add User</h2>
        <button
          className="btn btn-icon btn-sm btn-active-icon-primary"
          onClick={(e) => {
            handleResetGrantModal();
            handleGrantModal();
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      </Modal.Header>
      <div className="modal-body scroll-y my-5">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="row mb-4">
            <div className="col-6">
              <label className="required form-label">First name</label>
              <input className="form-control" type="text" name="first_name" placeholder="" minLength={1} maxLength={256} {...register("first_name", registerOptions.first_name)} />
              <small className="text-danger">{errors?.first_name && errors.first_name.message}</small>
            </div>
            <div className="col-6">
              <label className="required form-label">Last name</label>
              <input className="form-control" type="text" name="last_name" placeholder="" minLength={1} maxLength={256} {...register("last_name", registerOptions.last_name)} />
              <small className="text-danger">{errors?.last_name && errors.last_name.message}</small>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-2">
              <label className="required form-label">ID </label>
              <input className="form-control" type="text" name="employee_id" placeholder="" minLength={1} maxLength={6} {...register("employee_id", registerOptions.employee_id)} />
              <small className="text-danger">{errors?.employee_id && errors.employee_id.message}</small>
            </div>
            <div className="col-4">
              <label className="form-label">Date of birth</label>
              <Controller name="date_of_birth" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr className="form-control" placeholder="" options={options} onChange={(dates, currentdateString) => onChange(currentdateString)} name="date_of_birth" />} rules={{ required: "Required" }} />
            </div>
            <div className="col-6">
              <label className="required form-label">Email</label>
              <input className="form-control" type="text" name="email" placeholder="" {...register("email", registerOptions.email)} disabled />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label className="required form-label">Role </label>
              <select
                className="form-select mb-2"
                data-control="select2"
                data-hide-search="true"
                name="RoleId"
                {...register("RoleId", registerOptions.RoleId)}
                onChange={(registerOptions) => {
                  handleRole(registerOptions);
                }}
              >
                <option value="">---</option>
                {masterData?.roles?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small className="text-danger">{errors?.RoleId && errors.RoleId.message}</small>
            </div>
             <div className="col-6">
              <label className="required form-label fs-6 fw-semibold">Designation</label>
              <select className="form-select mb-2" data-control="select2" data-hide-search="true" name="DesignationId" {...register("DesignationId", registerOptions.DesignationId)}>
                <option value="">---</option>
                {desigList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small className="text-danger">{errors?.DesignationId && errors.DesignationId.message}</small>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label className="form-label fs-6 fw-semibold">Client</label>
              <Controller
                name="Clients"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={renderClients()}
                  />
                )}
              />
              <small className="text-danger">{errors?.Clients && errors.Clients.message}</small>
            </div>
             <div className="col-6">
              <div className="mb-4">
                <label className="form-label fs-6 fw-semibold">Locations</label>
                <Controller
                  name="Locations"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={renderLocations()}
                    />
                  )}
                />
                <small className="text-danger">{errors?.Locations && errors.Locations.message}</small>
              </div>
            </div>
          </div>
          <div className="row mb-4">   
            <div className="col-6">
              <label className="required form-label">Speciality </label>
              <Controller
                name="Specialties"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={renderSpecialties()}
                  />
                )}
              />
              <small className="text-danger">{errors?.Specialties && errors.Specialties.message}</small>
            </div>
            <div className="col-6">
              <label className="fs-6 fw-semibold mb-2">
                <span>Date of joining</span>
              </label>
              <Controller name="joining_date" control={control} defaultValue="" render={({ field: { onChange, ...fieldProps } }) => <Flatpickr options={options} className="form-control" placeholder="" onChange={(dates, currentdateString) => onChange(currentdateString)} name="joining_date" />} rules={{ required: "Required" }} />
            </div>
          </div>
          <div className="text-center pt-8">
            <button type="button" className="btn btn-light me-3" onClick={handleResetGrantModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <span className="indicator-label">Save</span>
              <span className="indicator-progress">
                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddUserModal;