import React from "react";
const Modals = () => {
	return (
		<>
			<div className="modal fade" data-bs-backdrop="false" id="kt_modal_add_user" tabIndex="-1" aria-hidden="true" style={{ backgroundColor: "rgba(0, 0, 0, 0.40)" }}>
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content">
						<div className="modal-header" id="kt_modal_add_user_header">
							<h2 className="fw-bold">Add User</h2>
							<div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
								<span className="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
									</svg>
								</span>
							</div>
						</div>
						<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
							<form id="kt_modal_add_user_form" className="form" action="#">
								<div className="text-center pt-15">
									<button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
										Discard
									</button>
									<button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
										<span className="indicator-label">Submit</span>
										<span className="indicator-progress">
											Please wait...
											<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="kt_modal_bidding" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content rounded">
						<div className="modal-header pb-0 border-0 justify-content-end">
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-kt-modal-action-type="close">
								<span className="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
									</svg>
								</span>
							</div>
						</div>
						<div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
							<form id="kt_modal_bidding_form" className="form" action="#">
								<div className="mb-13 text-center">
									<h1 className="mb-3">Place your bids</h1>
									<div className="text-muted fw-semibold fs-5">
										If you need more info, please check
										<a href="/" className="fw-bold link-primary">
											Bidding Guidelines
										</a>
										.
									</div>
								</div>
								<div className="d-flex flex-column mb-8 fv-row">
									<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
										<span className="">Bid Amount</span>
										<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the bid amount to place in."></i>
									</label>
									<div className="d-flex flex-stack gap-5 mb-3">
										<button type="button" className="btn btn-light-primary w-100" data-kt-modal-bidding="option">
											10
										</button>
										<button type="button" className="btn btn-light-primary w-100" data-kt-modal-bidding="option">
											50
										</button>
										<button type="button" className="btn btn-light-primary w-100" data-kt-modal-bidding="option">
											100
										</button>
									</div>
									<input type="text" className="form-control form-control-solid" placeholder="Enter Bid Amount" name="bid_amount" />
								</div>
								<div className="fv-row mb-8">
									<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
										<span className="">Currency Type</span>
										<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Select the currency type."></i>
									</label>
									<select className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select a Currency Type" name="currency_type" onChange={(e) => {}}>
										<option value=""></option>
										<option value="dollar">Dollar</option>
										<option value="crypto">Crypto</option>
									</select>
								</div>
								<div className="fv-row mb-8">
									<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
										<span>Currency</span>
									</label>
									<div className="" data-kt-modal-bidding-type="dollar">
										<select name="currency_dollar" aria-label="Select a Currency" data-placeholder="Select a currency.." className="form-select form-select-solid form-select-lg" onChange={(e) => {}}>
											<option data-kt-bidding-modal-option-icon="flags/united-states.svg" value="USD">
												USD&nbsp;-&nbsp;USA dollar
											</option>
											<option data-kt-bidding-modal-option-icon="flags/united-kingdom.svg" value="GBP">
												GBP&nbsp;-&nbsp;British pound
											</option>
											<option data-kt-bidding-modal-option-icon="flags/australia.svg" value="AUD">
												AUD&nbsp;-&nbsp;Australian dollar
											</option>
											<option data-kt-bidding-modal-option-icon="flags/japan.svg" value="JPY">
												JPY&nbsp;-&nbsp;Japanese yen
											</option>
											<option data-kt-bidding-modal-option-icon="flags/sweden.svg" value="SEK">
												SEK&nbsp;-&nbsp;Swedish krona
											</option>
											<option data-kt-bidding-modal-option-icon="flags/canada.svg" value="CAD">
												CAD&nbsp;-&nbsp;Canadian dollar
											</option>
											<option data-kt-bidding-modal-option-icon="flags/switzerland.svg" value="CHF">
												CHF&nbsp;-&nbsp;Swiss franc
											</option>
										</select>
									</div>
									<div className="d-none" data-kt-modal-bidding-type="crypto">
										<select name="currency_crypto" aria-label="Select a Coin" data-placeholder="Select a currency.." className="form-select form-select-solid form-select-lg" onChange={(e) => {}}>
											<option data-kt-bidding-modal-option-icon="svg/coins/bitcoin.svg" value="1">
												Bitcoin
											</option>
											<option data-kt-bidding-modal-option-icon="svg/coins/binance.svg" value="2">
												Binance
											</option>
											<option data-kt-bidding-modal-option-icon="svg/coins/chainlink.svg" value="3">
												Chainlink
											</option>
											<option data-kt-bidding-modal-option-icon="svg/coins/coin.svg" value="4">
												Coin
											</option>
											<option data-kt-bidding-modal-option-icon="svg/coins/ethereum.svg" value="5">
												Ethereum
											</option>
											<option data-kt-bidding-modal-option-icon="svg/coins/filecoin.svg" value="6">
												Filecoin
											</option>
										</select>
									</div>
								</div>
								<div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6">
									<span className="svg-icon svg-icon-2tx svg-icon-primary me-4">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.3" d="M3.20001 5.91897L16.9 3.01895C17.4 2.91895 18 3.219 18.1 3.819L19.2 9.01895L3.20001 5.91897Z" fill="currentColor" />
											<path opacity="0.3" d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21C21.6 10.9189 22 11.3189 22 11.9189V15.9189C22 16.5189 21.6 16.9189 21 16.9189H16C14.3 16.9189 13 15.6189 13 13.9189ZM16 12.4189C15.2 12.4189 14.5 13.1189 14.5 13.9189C14.5 14.7189 15.2 15.4189 16 15.4189C16.8 15.4189 17.5 14.7189 17.5 13.9189C17.5 13.1189 16.8 12.4189 16 12.4189Z" fill="currentColor" />
											<path d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21V7.91895C21 6.81895 20.1 5.91895 19 5.91895H3C2.4 5.91895 2 6.31895 2 6.91895V20.9189C2 21.5189 2.4 21.9189 3 21.9189H19C20.1 21.9189 21 21.0189 21 19.9189V16.9189H16C14.3 16.9189 13 15.6189 13 13.9189Z" fill="currentColor" />
										</svg>
									</span>
									<div className="d-flex flex-stack flex-grow-1">
										<div className="fw-semibold">
											<h4 className="text-gray-900 fw-bold">Top up funds</h4>
											<div className="fs-6 text-gray-700">
												Not enough funds in your wallet?
												<a href="../dist/utilities/modals/wizards/top-up-wallet.html" className="text-bolder">
													Top up wallet
												</a>
												.
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<button type="reset" className="btn btn-light me-3" data-kt-modal-action-type="cancel">
										Cancel
									</button>
									<button type="submit" className="btn btn-primary" data-kt-modal-action-type="submit">
										<span className="indicator-label">Submit</span>
										<span className="indicator-progress">
											Please wait...
											<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="kt_modal_view_users" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog mw-650px">
					<div className="modal-content">
						<div className="modal-header pb-0 border-0 justify-content-end">
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
								<span className="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
									</svg>
								</span>
							</div>
						</div>
						<div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
							<div className="text-center mb-13">
								<h1 className="mb-3">Browse Users</h1>
								<div className="text-muted fw-semibold fs-5">
									If you need more info, please check out our
									<a href="/" className="link-primary fw-bold">
										Users Directory
									</a>
									.
								</div>
							</div>
							<div className="mb-15">
								<div className="mh-375px scroll-y me-n7 pe-7">
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-6.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Emma Smith
													<span className="badge badge-light fs-8 fw-semibold ms-2">Art Director</span>
												</a>
												<div className="fw-semibold text-muted">smith@kpmg.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$23,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">M</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Melody Macy
													<span className="badge badge-light fs-8 fw-semibold ms-2">Marketing Analytic</span>
												</a>
												<div className="fw-semibold text-muted">melody@altbox.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$50,500</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-1.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Max Smith
													<span className="badge badge-light fs-8 fw-semibold ms-2">Software Enginer</span>
												</a>
												<div className="fw-semibold text-muted">max@kt.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$75,900</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-5.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Sean Bean
													<span className="badge badge-light fs-8 fw-semibold ms-2">Web Developer</span>
												</a>
												<div className="fw-semibold text-muted">sean@dellito.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$10,500</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-25.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Brian Cox
													<span className="badge badge-light fs-8 fw-semibold ms-2">UI/UX Designer</span>
												</a>
												<div className="fw-semibold text-muted">brian@exchange.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$20,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-warning text-warning fw-semibold">C</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Mikaela Collins
													<span className="badge badge-light fs-8 fw-semibold ms-2">Head Of Marketing</span>
												</a>
												<div className="fw-semibold text-muted">mik@pex.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$9,300</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-9.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Francis Mitcham
													<span className="badge badge-light fs-8 fw-semibold ms-2">Software Arcitect</span>
												</a>
												<div className="fw-semibold text-muted">f.mit@kpmg.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$15,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">O</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Olivia Wild
													<span className="badge badge-light fs-8 fw-semibold ms-2">System Admin</span>
												</a>
												<div className="fw-semibold text-muted">olivia@corpmail.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$23,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-primary text-primary fw-semibold">N</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Neil Owen
													<span className="badge badge-light fs-8 fw-semibold ms-2">Account Manager</span>
												</a>
												<div className="fw-semibold text-muted">owen.neil@gmail.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$45,800</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-23.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Dan Wilson
													<span className="badge badge-light fs-8 fw-semibold ms-2">Web Desinger</span>
												</a>
												<div className="fw-semibold text-muted">dam@consilting.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$90,500</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">E</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Emma Bold
													<span className="badge badge-light fs-8 fw-semibold ms-2">Corporate Finance</span>
												</a>
												<div className="fw-semibold text-muted">emma@intenso.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$5,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-12.jpg" />
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Ana Crown
													<span className="badge badge-light fs-8 fw-semibold ms-2">Customer Relationship</span>
												</a>
												<div className="fw-semibold text-muted">ana.cf@limtel.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$70,000</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
									<div className="d-flex flex-stack py-5">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-info text-info fw-semibold">A</span>
											</div>
											<div className="ms-6">
												<a href="/" className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary">
													Robert Doe
													<span className="badge badge-light fs-8 fw-semibold ms-2">Marketing Executive</span>
												</a>
												<div className="fw-semibold text-muted">robert@benko.com</div>
											</div>
										</div>
										<div className="d-flex">
											<div className="text-end">
												<div className="fs-5 fw-bold text-dark">$45,500</div>
												<div className="fs-7 text-muted">Sales</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex justify-content-between">
								<div className="fw-semibold">
									<label className="fs-6">Adding Users by Team Members</label>
									<div className="fs-7 text-muted">If you need more info, please check budget planning</div>
								</div>
								<label className="form-check form-switch form-check-custom form-check-solid">
									<input className="form-check-input" type="checkbox" checked={true} onChange={(e) => {}} />
									<span className="form-check-label fw-semibold text-muted">Allowed</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="kt_modal_users_search" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered mw-650px">
					<div className="modal-content">
						<div className="modal-header pb-0 border-0 justify-content-end">
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
								<span className="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
									</svg>
								</span>
							</div>
						</div>
						<div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
							<div className="text-center mb-13">
								<h1 className="mb-3">Search Users</h1>
								<div className="text-muted fw-semibold fs-5">Invite Collaborators To Your Project</div>
							</div>
							<div id="kt_modal_users_search_handler" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="inline">
								<form data-kt-search-element="form" className="w-100 position-relative mb-5" autoComplete="off">
									<input type="hidden" />
									<span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
											<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
										</svg>
									</span>
									<input type="text" className="form-control form-control-lg form-control-solid px-15" name="search" placeholder="Search by username, full name or email..." data-kt-search-element="input" />
									<span className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5" data-kt-search-element="spinner">
										<span className="spinner-border h-15px w-15px align-middle text-muted"></span>
									</span>
									<span className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none" data-kt-search-element="clear">
										<span className="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
												<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
											</svg>
										</span>
									</span>
								</form>
								<div className="py-5">
									<div data-kt-search-element="suggestions">
										<h3 className="fw-semibold mb-5">Recently searched:</h3>
										<div className="mh-375px scroll-y me-n7 pe-7">
											<a href="/" className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
												<div className="symbol symbol-35px symbol-circle me-5">
													<img alt="Pic" src="assets/media/avatars/300-6.jpg" />
												</div>
												<div className="fw-semibold">
													<span className="fs-6 text-gray-800 me-2">Emma Smith</span>
													<span className="badge badge-light">Art Director</span>
												</div>
											</a>
											<a href="/" className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
												<div className="symbol symbol-35px symbol-circle me-5">
													<span className="symbol-label bg-light-danger text-danger fw-semibold">M</span>
												</div>
												<div className="fw-semibold">
													<span className="fs-6 text-gray-800 me-2">Melody Macy</span>
													<span className="badge badge-light">Marketing Analytic</span>
												</div>
											</a>
											<a href="/" className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
												<div className="symbol symbol-35px symbol-circle me-5">
													<img alt="Pic" src="assets/media/avatars/300-1.jpg" />
												</div>
												<div className="fw-semibold">
													<span className="fs-6 text-gray-800 me-2">Max Smith</span>
													<span className="badge badge-light">Software Enginer</span>
												</div>
											</a>
											<a href="/" className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
												<div className="symbol symbol-35px symbol-circle me-5">
													<img alt="Pic" src="assets/media/avatars/300-5.jpg" />
												</div>
												<div className="fw-semibold">
													<span className="fs-6 text-gray-800 me-2">Sean Bean</span>
													<span className="badge badge-light">Web Developer</span>
												</div>
											</a>
											<a href="/" className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
												<div className="symbol symbol-35px symbol-circle me-5">
													<img alt="Pic" src="assets/media/avatars/300-25.jpg" />
												</div>
												<div className="fw-semibold">
													<span className="fs-6 text-gray-800 me-2">Brian Cox</span>
													<span className="badge badge-light">UI/UX Designer</span>
												</div>
											</a>
										</div>
									</div>
									<div data-kt-search-element="results" className="d-none">
										<div className="mh-375px scroll-y me-n7 pe-7">
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="0">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='0']" value="0" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-6.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Emma Smith
														</a>
														<div className="fw-semibold text-muted">smith@kpmg.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="1">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='1']" value="1" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-danger text-danger fw-semibold">M</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Melody Macy
														</a>
														<div className="fw-semibold text-muted">melody@altbox.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="2">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='2']" value="2" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-1.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Max Smith
														</a>
														<div className="fw-semibold text-muted">max@kt.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="3">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='3']" value="3" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-5.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Sean Bean
														</a>
														<div className="fw-semibold text-muted">sean@dellito.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="4">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='4']" value="4" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-25.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Brian Cox
														</a>
														<div className="fw-semibold text-muted">brian@exchange.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="5">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='5']" value="5" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-warning text-warning fw-semibold">C</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Mikaela Collins
														</a>
														<div className="fw-semibold text-muted">mik@pex.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="6">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='6']" value="6" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-9.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Francis Mitcham
														</a>
														<div className="fw-semibold text-muted">f.mit@kpmg.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="7">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='7']" value="7" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-danger text-danger fw-semibold">O</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Olivia Wild
														</a>
														<div className="fw-semibold text-muted">olivia@corpmail.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="8">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='8']" value="8" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-primary text-primary fw-semibold">N</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Neil Owen
														</a>
														<div className="fw-semibold text-muted">owen.neil@gmail.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="9">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='9']" value="9" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-23.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Dan Wilson
														</a>
														<div className="fw-semibold text-muted">dam@consilting.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="10">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='10']" value="10" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-danger text-danger fw-semibold">E</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Emma Bold
														</a>
														<div className="fw-semibold text-muted">emma@intenso.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="11">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='11']" value="11" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-12.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Ana Crown
														</a>
														<div className="fw-semibold text-muted">ana.cf@limtel.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="12">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='12']" value="12" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-info text-info fw-semibold">A</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Robert Doe
														</a>
														<div className="fw-semibold text-muted">robert@benko.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="13">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='13']" value="13" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-13.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															John Miller
														</a>
														<div className="fw-semibold text-muted">miller@mapple.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="14">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='14']" value="14" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<span className="symbol-label bg-light-success text-success fw-semibold">L</span>
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Lucy Kunic
														</a>
														<div className="fw-semibold text-muted">lucy.m@fentech.com</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="15">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='15']" value="15" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-21.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Ethan Wilder
														</a>
														<div className="fw-semibold text-muted">ethan@loop.com.au</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
											<div className="border-bottom border-gray-300 border-bottom-dashed"></div>
											<div className="rounded d-flex flex-stack bg-active-lighten p-4" data-user-id="16">
												<div className="d-flex align-items-center">
													<label className="form-check form-check-custom form-check-solid me-5">
														<input className="form-check-input" type="checkbox" name="users" data-kt-check="true" data-kt-check-target="[data-user-id='16']" value="16" />
													</label>
													<div className="symbol symbol-35px symbol-circle">
														<img alt="Pic" src="assets/media/avatars/300-21.jpg" />
													</div>
													<div className="ms-5">
														<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
															Ethan Wilder
														</a>
														<div className="fw-semibold text-muted">ethan@loop.com.au</div>
													</div>
												</div>
												<div className="ms-2 w-100px">
													<select className="form-select form-select-solid form-select-sm" data-control="select2" data-hide-search="true" onChange={(e) => {}}>
														<option value="1">Guest</option>
														<option value="2">Owner</option>
														<option value="3">Can Edit</option>
													</select>
												</div>
											</div>
										</div>
										<div className="d-flex flex-center mt-15">
											<button type="reset" id="kt_modal_users_search_reset" data-bs-dismiss="modal" className="btn btn-active-light me-3">
												Cancel
											</button>
											<button type="submit" id="kt_modal_users_search_submit" className="btn btn-primary">
												Add Selected Users
											</button>
										</div>
									</div>
									<div data-kt-search-element="empty" className="text-center d-none">
										<div className="fw-semibold py-10">
											<div className="text-gray-600 fs-3 mb-2">No users found</div>
											<div className="text-muted fs-6">Try to search by username, full name or email...</div>
										</div>
										<div className="text-center px-5">
											<img src="assets/media/illustrations/dozzy-1/1.png" alt="" className="w-100 h-200px h-sm-325px" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="kt_modal_invite_friends" tabIndex="-1" aria-hidden="true">
				<div className="modal-dialog mw-650px">
					<div className="modal-content">
						<div className="modal-header pb-0 border-0 justify-content-end">
							<div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
								<span className="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
										<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
									</svg>
								</span>
							</div>
						</div>
						<div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
							<div className="text-center mb-13">
								<h1 className="mb-3">Invite a Friend</h1>
								<div className="text-muted fw-semibold fs-5">
									If you need more info, please check out
									<a href="/" className="link-primary fw-bold">
										FAQ Page
									</a>
									.
								</div>
							</div>
							<div className="btn btn-light-primary fw-bold w-100 mb-8">
								<img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg" className="h-20px me-3" />
								Invite Gmail Contacts
							</div>
							<div className="separator d-flex flex-center mb-8">
								<span className="text-uppercase bg-body fs-7 fw-semibold text-muted px-3">or</span>
							</div>
							<textarea className="form-control form-control-solid mb-8" rows="3" placeholder="Type or paste emails here"></textarea>
							<div className="mb-10">
								<div className="fs-6 fw-semibold mb-2">Your Invitations</div>
								<div className="mh-300px scroll-y me-n7 pe-7">
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-6.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Emma Smith
												</a>
												<div className="fw-semibold text-muted">smith@kpmg.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">M</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Melody Macy
												</a>
												<div className="fw-semibold text-muted">melody@altbox.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-1.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Max Smith
												</a>
												<div className="fw-semibold text-muted">max@kt.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-5.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Sean Bean
												</a>
												<div className="fw-semibold text-muted">sean@dellito.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-25.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Brian Cox
												</a>
												<div className="fw-semibold text-muted">brian@exchange.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-warning text-warning fw-semibold">C</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Mikaela Collins
												</a>
												<div className="fw-semibold text-muted">mik@pex.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-9.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Francis Mitcham
												</a>
												<div className="fw-semibold text-muted">f.mit@kpmg.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">O</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Olivia Wild
												</a>
												<div className="fw-semibold text-muted">olivia@corpmail.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-primary text-primary fw-semibold">N</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Neil Owen
												</a>
												<div className="fw-semibold text-muted">owen.neil@gmail.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-23.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Dan Wilson
												</a>
												<div className="fw-semibold text-muted">dam@consilting.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-danger text-danger fw-semibold">E</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Emma Bold
												</a>
												<div className="fw-semibold text-muted">emma@intenso.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-12.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Ana Crown
												</a>
												<div className="fw-semibold text-muted">ana.cf@limtel.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-info text-info fw-semibold">A</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Robert Doe
												</a>
												<div className="fw-semibold text-muted">robert@benko.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-13.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													John Miller
												</a>
												<div className="fw-semibold text-muted">miller@mapple.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<span className="symbol-label bg-light-success text-success fw-semibold">L</span>
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Lucy Kunic
												</a>
												<div className="fw-semibold text-muted">lucy.m@fentech.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-21.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Ethan Wilder
												</a>
												<div className="fw-semibold text-muted">ethan@loop.com.au</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
									<div className="d-flex flex-stack py-4">
										<div className="d-flex align-items-center">
											<div className="symbol symbol-35px symbol-circle">
												<img alt="Pic" src="assets/media/avatars/300-25.jpg" />
											</div>
											<div className="ms-5">
												<a href="/" className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
													Brian Cox
												</a>
												<div className="fw-semibold text-muted">brian@exchange.com</div>
											</div>
										</div>
										<div className="ms-2 w-100px">
											<select className="form-select form-select-solid form-select-sm" data-control="select2" data-dropdown-parent="#kt_modal_invite_friends" data-hide-search="true" onChange={(e) => {}}>
												<option value="1">Guest</option>
												<option value="2">Owner</option>
												<option value="3">Can Edit</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex flex-stack">
								<div className="me-5 fw-semibold">
									<label className="fs-6">Adding Users by Team Members</label>
									<div className="fs-7 text-muted">If you need more info, please check budget planning</div>
								</div>
								<label className="form-check form-switch form-check-custom form-check-solid">
									<input className="form-check-input" type="checkbox" value="1" checked={true} onChange={(e) => {}} />
									<span className="form-check-label fw-semibold text-muted">Allowed</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Modals;
