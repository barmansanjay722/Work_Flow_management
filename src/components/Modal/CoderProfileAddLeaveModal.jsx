const CoderProfileAddLeaveModal=()=>{
  return (
    <>
    	<div
	  className="modal fade"
	  id="kt_modal_add_schedule"
	  tabIndex={-1}
	  aria-hidden="true"
	>
	  <div className="modal-dialog modal-dialog-centered mw-650px">
		<div className="modal-content">
		  <div className="modal-header">
			<h2 className="fw-bold">Request a Leave</h2>
			<div
			  className="btn btn-icon btn-sm btn-active-icon-primary"
			  data-kt-users-modal-action="close"
			>
			  <span className="svg-icon svg-icon-1">
				<svg
				  width={24}
				  height={24}
				  viewBox="0 0 24 24"
				  fill="none"
				  xmlns="http://www.w3.org/2000/svg"
				>
				  <rect
					opacity="0.5"
					x={6}
					y="17.3137"
					width={16}
					height={2}
					rx={1}
					transform="rotate(-45 6 17.3137)"
					fill="currentColor"
				  />
				  <rect
					x="7.41422"
					y={6}
					width={16}
					height={2}
					rx={1}
					transform="rotate(45 7.41422 6)"
					fill="currentColor"
				  />
				</svg>
			  </span>
			</div>
		  </div>
		  <div className="modal-body py-5 px-lg-5">
			<form
			  id="kt_modal_add_schedule_form"
			  className="form mx-5 mx-xl-7 my-7"
			  action="#"
			>
			  <div className="row">
				<div className="fv-row mb-7 col-lg-7">
				  <label className="fs-6 fw-semibold mb-2">
					<span>Date</span>
				  </label>
				  <input
					className="form-control"
					placeholder="Pick date rage"
					id="kt_daterangepicker_1"
				  />
				</div>
			  </div>
			  <div className="row">
				<div className="fv-row mb-7 col-lg-12">
				  <label className="fs-6 fw-semibold mb-2">Reason</label>
				  <textarea
					name=""
					id=""
					className="form-control"
					rows={4}
					defaultValue={""}
				  />
				</div>
			  </div>
			</form>
		  </div>
		  <div className="modal-footer flex-left justify-content-start">
			<button
			  type="submit"
			  className="btn btn-primary"
			  data-kt-users-modal-action="submit"
			>
			  <span className="indicator-label">Apply</span>
			  <span className="indicator-progress">
				Please wait...{" "}
				<span className="spinner-border spinner-border-sm align-middle ms-2" />
			  </span>
			</button>
			<button
			  type="reset"
			  className="btn btn-light me-3"
			  data-kt-users-modal-action="cancel"
			>
			  Cancel
			</button>
		  </div>
		</div>
	  </div>
	</div>
    </>
  )
}
export default CoderProfileAddLeaveModal