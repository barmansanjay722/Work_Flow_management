import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useLocation,useNavigate } from "react-router-dom";
import Select from "react-select";

const UserBodyAddFilter = ({ masterData, setFilterPagination, handleFilterList, filterList }) => {

  const navigateStateGlobal = useLocation();
  const navigate = useNavigate();
  const [showModalBox, setShowModalBox] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [globalUserSearch, setGlobalUserSearch] = useState({})
  const [role, setRole] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [client, setClient] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [resetForm, setResetForm] = useState(false)

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

  const renderStatus = [
    { value: 'Attending', label: 'Attending' },
    { value: 'Not-attending', label: 'Not-attending' },
  ]

  const renderClients = () => {
    return masterData?.clients?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderRoles = () => {
    return masterData?.roles?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const renderDesignations = () => {
    return masterData?.designations?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  };

  const dateObj = new Date(dateOfBirth);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '/');
  const datejoiningObj = new Date(dateOfJoining);
  const formattedDateofJoining = datejoiningObj.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '/');

  const handleSubmitFilter = (type, globalTriggering = false) => {
    let obj = {};
    if (type !== "reset") {
      obj = {
        DesignationId: designation?.length !== 0 ? designation?.map((item) => item.value) : "",
        name: userName[0] !== "" ? userName[0] : "",
        status: status !== "" ? status?.value : "",
        employee_id: userId !== "" ? userId : "",
        date_of_birth: formattedDate !== "Invalid Date" ? formattedDate : "",
        joining_date: formattedDateofJoining !== "Invalid Date" ? formattedDateofJoining : "",
        RoleId: role?.length !== 0 ? role?.map((item) => item.value) : "",
        clients: client?.length !== 0 ? client?.map((item) => item.value) : "",
        locations: location?.length !== 0 ? location?.map((item) => item.value) : "",
        specialties: speciality?.length !== 0 ? speciality?.map((item) => item.value) : "",
      };
      if(globalTriggering) {
        if(globalUserSearch.hasOwnProperty('userName') && obj.name === '' && !resetForm) { obj.name = globalUserSearch.userName[0] }
        if(globalUserSearch.hasOwnProperty('dateOfBirth') && obj.date_of_birth === '' && !resetForm) { obj.date_of_birth = globalUserSearch.dateOfBirth }
        if(globalUserSearch.hasOwnProperty('dateOfJoining') && obj.joining_date === '' && !resetForm) { obj.joining_date = globalUserSearch.dateOfJoining }
      }
    } else {
      setDesignation(null);
      setUserName("");
      setDateOfBirth([]);
      setClient(null);
      setDateOfJoining([]);
      setLocation(null);
      setRole(null);
      setSpeciality(null);
      setStatus(null);
      setUserId("");
      setResetForm(true)
    }
    handleFilterList(obj);
    setShowModalBox(false);
    setFilterPagination(true);
  };

  useEffect(() => {
    if(!resetForm) {
      setGlobalUserSearch({
        userName: navigateStateGlobal?.state?.submitData?.name ?? "",
        dateOfBirth: navigateStateGlobal?.state?.submitData?.date_of_birth && (navigateStateGlobal?.state?.submitData?.date_of_birth?.split(" - ")?.splice(1, 1)[0] ?? ""),
        dateOfJoining: navigateStateGlobal?.state?.submitData?.joining_date && (navigateStateGlobal?.state?.submitData?.joining_date?.split(" - ")?.splice(1, 1)[0] ?? "")
      });
      setUserName(navigateStateGlobal?.state?.submitData?.name ?? "");
      setDateOfBirth(navigateStateGlobal?.state?.submitData?.date_of_birth && (navigateStateGlobal?.state?.submitData?.date_of_birth?.split(" - ")?.splice(1, 1)[0] ?? ""));
      setDateOfJoining(navigateStateGlobal?.state?.submitData?.joining_date && (navigateStateGlobal?.state?.submitData?.joining_date?.split(" - ")?.splice(1, 1)[0] ?? ""));
    } else {
      setResetForm(false)
      setGlobalUserSearch({});
      navigate("/manager-userlist", { state: { } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigateStateGlobal])

  useEffect(() => {
    handleSubmitFilter("submit", true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalUserSearch])

  return (
    <>
      <button id="filter-option" type="button" className="btn btn-light-primary me-3" data-kt-menu-placement="bottom-end" onClick={(e) => setShowModalBox(true)}>
        <i className="fas fa-filter"></i>
        Filter
      </button>
      <Modal show={showModalBox} centered>
        <div className="w-500px w-md-500px">
          <div className="px-0 py-0">
            <Modal.Header className="fs-5 text-dark fw-bold py-4">
              Filter Options
              <Modal.Title className="btn btn-icon btn-sm btn-active-icon-primary" onClick={(e) => setShowModalBox(false)}>
                <span className="svg-icon svg-icon-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" /> <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" /> </svg>
                </span>
              </Modal.Title>
            </Modal.Header>
          </div>
          <div className="separator border-gray-200"></div>
          <Modal.Body className="px-7 py-5">
            <div data-kt-user-table-filter="form">
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">ID</label>
                    <input className="form-control" name="userId" placeholder="" onChange={(e) => setUserId(e.target.value)} value={userId} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Name</label>
                    <input className="form-control" name="userName" placeholder="" onChange={(e) => setUserName(e.target.value)} value={userName} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Date of birth</label>
                    <Flatpickr className="form-control" options={{ dateFormat: "m/d/Y" }} value={dateOfBirth} name="dateOfBirth" onChange={(e) => setDateOfBirth(e)} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Date of joining</label>
                    <Flatpickr className="form-control" options={{ dateFormat: "m/d/Y" }} value={dateOfJoining} name="dateOfJoining" onChange={(e) => setDateOfJoining(e)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Role</label>
                    <Select className="form-group" options={renderRoles()} isMulti={true} name="role" onChange={setRole} value={role} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Speciality</label>
                    <Select className="form-group" options={renderSpecialties()} isMulti={true} name="speciality" onChange={setSpeciality} value={speciality} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Client</label>
                    <Select className="form-group" options={renderClients()} isMulti={true} name="client" onChange={setClient} value={client} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Designation</label>
                    <Select className="form-group" options={renderDesignations()} isMulti={true} name="designation" onChange={setDesignation} value={designation} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Locations</label>
                    <Select className="form-group" options={renderLocations()} isMulti={true} name="location" onChange={setLocation} value={location} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label className="form-label fs-6 fw-semibold">Status </label>
                    <Select className="form-group" options={renderStatus} name="status" onChange={setStatus} value={status} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="reset" onClick={(e) => handleSubmitFilter("reset")} className="btn btn-light btn-active-light-primary fw-semibold me-2 px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="reset">
                  Reset
                </button>
                <button type="submit" onClick={(e) => handleSubmitFilter("submit")} className="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                  Apply
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};
export default UserBodyAddFilter;
