import { Container, Modal } from "react-bootstrap";
import { addNewEpic, updateEpic, fetchEpicAssociatedTasks, fetchAllNonAssociatedTasks } from "../../../../services/managerWorkListService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DualListBox from "react-dual-listbox";

function EpicDetailsModal({ showModalBox, setShowModalBox, setSuccess, success, modalValues, setShowMainModalBox }) {
  const [name, setName] = useState(modalValues.name ?? "");
  const [description, setDescription] = useState(modalValues.description ?? "");
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const { modal_type } = modalValues;

  useEffect(() => {
    if(modal_type === 'add')
    fetchAllNonAssociatedTasks(modalValues?.worklist_id).then((response) => {
      if (response?.success) {
        setOptions(response?.data?.all_tasks);
      } else {
        window.toastr.error(response?.message);
      }
    });
    if(modal_type === 'update')
    fetchEpicAssociatedTasks(modalValues?.id, modalValues?.worklist_id).then((response) => {
      if (response?.success) {
        setSelected(response?.data?.associated_tasks);
        setOptions(response?.data?.all_tasks);
      } else {
        window.toastr.error(response?.message);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEpicDetailsSave = (e) => {
    e.preventDefault();
    if (modal_type === "add") {
      addNewEpic({ name: name, description: description, worklist_id: modalValues.worklist_id, associate_tasks: selected })
      .then((res) => {
        if (res?.success === true) {
          window.toastr.success(res?.message);
          setSuccess(!success);
          setShowModalBox(false);
          setShowMainModalBox(true);
        } else {
          window.toastr.error(res);
        }
      })
      .catch(err=>{
        window.toastr.error(err);
      });
    }
    if (modal_type === "update") {
      updateEpic(modalValues.id, { name: name, description: description, associate_tasks: selected }).then((res) => {
        if (res?.success === true) {
          window.toastr.success(res?.message);
          setSuccess(!success);
          setShowModalBox(false);
          setShowMainModalBox(true);
        } else {
          window.toastr.error(res?.error ?? res?.message ?? res);
        }
      });
    }
  };

  const handleModalCloseWithAlert = () => {
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
          setShowMainModalBox(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    e.preventDefault(); 
    setName(e.target.value);
  }

  return (
    <Container>
      <Modal show={showModalBox} size="lg" centered>
        <div>
          <div>
            <Modal.Header className="modal-header py-4">
              <h2 className="fw-semibold">{modal_type === "add" ? "Add New" : modal_type === "update" ? "Update" : "View"} Epic for this Project</h2>
            </Modal.Header>
            <Modal.Body className="modal-body scroll-y mb-5">
              <div id="location">
                <div className="applicant-fileds">
                  <div className="form-group">
                    <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                      <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-2">
                        <div className="card-body p-2">
                          <div className="card-body d-flex flex-column pb-0">
                            <div className="d-flex flex-column gap-5 gap-md-7">
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Epic Name</label>
                                  <input className="form-control" name="name" value={name} autoComplete="off" onChange={handleNameChange} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Epic Description</label>
                                  <textarea autoComplete="off" className="form-control" name="description" value={description} onChange={(e) => { setDescription(e.target.value); }} disabled={modalValues.modal_type === "view" ? true : false} placeholder="Type your description here..." />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <label className="form-label">Associate Tasks with this Epic</label>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-12">
                                  <DualListBox options={options} selected={selected} onChange={(value) => setSelected(value)} canFilter />
                                  <p className="fw-3 mt-3">Note: Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-8 mt-6">
                <button
                  type="reset"
                  className="btn btn-light me-3 btn-active-light-primary"
                  onClick={
                    modalValues.modal_type === "view"
                      ? () => {
                          setShowModalBox(false);
                          setShowMainModalBox(true);
                        }
                      : handleModalCloseWithAlert
                  }
                >
                  {modalValues.modal_type === "view" ? "Close" : "Cancel"}
                </button>
                <button className="btn btn-primary me-4" type="button" onClick={modalValues.modal_type === "view" ? null : handleEpicDetailsSave} disabled={modalValues.modal_type === "view" ? true : false}>
                  <span>Save</span>
                </button>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default EpicDetailsModal;
