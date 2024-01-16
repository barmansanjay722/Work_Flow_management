const CoderProfileUpdateModal = () => {
  return (
    <>
      <div className="modal fade" id="kt_modal_update_details" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <form className="form" action="#" id="kt_modal_update_user_form">
              <div className="modal-header" id="kt_modal_update_user_header">
                <h2 className="fw-bold">Edit User Details</h2>
                <div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                  <span className="svg-icon svg-icon-1">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="currentColor" />
                      <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="modal-body py-10 px-lg-17">
                <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_update_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_update_user_header" data-kt-scroll-wrappers="#kt_modal_update_user_scroll" data-kt-scroll-offset="300px">
                  <div id="kt_modal_update_user_user_info" className="collapse show">
                    <div className="mb-7">
                      <label className="fs-6 fw-semibold mb-2"> </label>
                      <div className="mt-1">
                        <style
                          dangerouslySetInnerHTML={{
                            __html: '\n                                                        .image-input-placeholder {\n                                                            background-image: url("../assets/media/svg/avatars/blank.svg");\n                                                        }\n\n                                                        [data-bs-theme="dark"] .image-input-placeholder {\n                                                            background-image: url("../assets/media/svg/avatars/blank-dark.svg");\n                                                        }\n                                                    ',
                          }}
                        />
                        <div className="image-input image-input-outline image-input-placeholder" data-kt-image-input="true">
                          <div
                            className="image-input-wrapper w-125px h-125px"
                            style={{
                              backgroundImage: "url(../assets/media/avatars/300-4.jpg)",
                              borderRadius: "100%",
                            }}
                          ></div>
                          <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change profile">
                            <i className="bi bi-pencil-fill fs-7" />
                            <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                            <input type="hidden" name="avatar_remove" />
                          </label>
                          <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                            <i className="bi bi-x fs-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">Name</label>
                        <input type="text" className="form-control form-control-solid" placeholder="" name="name" />
                      </div>
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">
                          <span>Date of birth</span>
                        </label>
                        <input type="email" className="form-control form-control-solid" name="flatpickr_input" placeholder="02 Sep 1992" id="kt_flatpickr" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">Date of joining</label>
                        <input type="text" className="form-control form-control-solid" name="flatpickr_input" placeholder="03 Mar 2009" id="kt_flatpickr_1" />
                      </div>
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">Designation</label>
                        <input type="text" className="form-control form-control-solid" placeholder="" name="name" defaultValue="Senior Coder" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">Role</label>
                        <input type="text" className="form-control form-control-solid" placeholder="" name="name" defaultValue="Coder" />
                      </div>
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">
                          <span>Speciality</span>
                        </label>
                        <select className="form-select form-control form-control-solid" data-control="select2" data-hide-search="true" data-placeholder="..." id="" name="">
                          <option />
                          <option value="Observation" selected="">
                            Observation
                          </option>
                          <option value="Clinic">Clinic</option>
                          <option value="Emergency Department">Emergency Department</option>
                          <option value="Same Day Centre">Same Day Centre</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">Client</label>
                        <select className="form-select form-control form-control-solid" data-control="select2" data-hide-search="true" data-placeholder="..." id="" name="">
                          <option />
                          <option value="Client 1">Client 1</option>
                          <option value="Client 2" selected="">
                            Client 2
                          </option>
                        </select>
                      </div>
                      <div className="fv-row mb-7 col-lg-6">
                        <label className="fs-6 fw-semibold mb-2">
                          <span>Location</span>
                        </label>
                        <select className="form-select form-control form-control-solid" data-control="select2" data-hide-search="true" data-placeholder="..." id="" name="">
                          <option />
                          <option value="Taylor Regional Hospital" selected="">
                            Taylor Regional Hospital
                          </option>
                          <option value="Eastern Ohio Regional Hospital">Eastern Ohio Regional Hospital</option>
                          <option value="Astria">Astria</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer flex-right justify-content-start">
                <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                  <span className="indicator-label">Submit</span>
                  <span className="indicator-progress">
                    Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                </button>
                <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoderProfileUpdateModal;
