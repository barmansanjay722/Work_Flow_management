import React from "react";

export default function ManagerReportPagination({ handleNextPrev, nextPage }) {
  
  return (
    <div className="card d-flex justify-content-between w-100" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
      <nav aria-label="Page navigation example">
        <ul className="pagination pb-7">
          { nextPage.currentPage - 1 ?
              <>
              <li className="page-item">
                <button className={nextPage.currentPage - 1 ? "page-link" : "page-link disabled"} onClick={() => {
                  handleNextPrev('prev')
                }}>Prev</button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={() => { handleNextPrev('prev') }}>
                  {nextPage.currentPage - 1}
                </button>
              </li>
              </> : null
          }{ }
          <li className="page-item">
            <button className="btn btn-primary btn-sm" href="#">
              {nextPage.currentPage}
            </button>
          </li>
          {nextPage.nextPage ? 
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => { handleNextPrev("next") }}>
                  {nextPage.currentPage + 1}
                </button>
              </li>
              <li className="page-item">
                <button disabled={!nextPage.nextPage} className={nextPage.nextPage ? "page-link" : "page-link disabled"} onClick={() => { handleNextPrev("next") }}>
                  Next
                </button>
              </li>
            </> : null}
        </ul>
      </nav>
    </div>
  );
}
