import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
	
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<div className="page d-flex flex-row flex-column-fluid">
					<Sidebar />
					<div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
						<Header />
						<div className="content d-flex flex-column flex-column-fluid fs-6" id="kt_content">
							<div className="container-xxl" id="kt_content_container">
								<Outlet />
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</div>
		</>
	);
};
export default Layout;
