import { Modal } from "react-bootstrap";
import {setAddNewClient} from "../../services/managerService"
import { useState } from "react";
function ConfigurationAddNewClientModal({showModalBox,setShowModalBox,handleConfigurationModal,setSuccess, success, handleModalclose}) {
  const [valueForAddClient ,setValueForAddClient] = useState([])

 const handleValueForAddClient = (e) => {
  setValueForAddClient((valueForAddClient)=>({...valueForAddClient, [e.target.name] : e.target.value}))
 }

const handleSaveNewClient = (e) => {
  e.preventDefault();
  setAddNewClient(valueForAddClient).then((res) => {
              if(res?.success === true){
                 setSuccess(!success)
                 setShowModalBox(false);
              }        
  });
}

  return (
    <Modal show={showModalBox} centered>
        <Modal.Body className="modal-body scroll-y mb-5">
      <div id="location">
        <div className="applicant-fileds">
          <div className="form-group">
            <div
              data-repeater-list="kt_ecommerce_add_product_options"
              className="d-flex flex-column gap-3"
            >
              <div
                data-repeater-item=""
                className="form-group d-flex flex-wrap align-items-center gap-2"
              >
                <label className="form-label mb-0">Add Client</label>
                <input
                  type="text"
                  className="form-control mw-100 w-40"
                  value={valueForAddClient?.client_name}
                  onChange={handleValueForAddClient}
                  name="client_name"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 mt-10">
        <button type="reset" className="btn btn-light me-3"

                                        data-kt-users-modal-action="" onClick={handleModalclose}>Cancel</button>
        <button
          className="btn btn-primary me-4"
          type="button"
          onClick={handleSaveNewClient}
        >
          <span>Save</span>
        </button>
      </div>
        </Modal.Body>
    </Modal>
  )
}
export default ConfigurationAddNewClientModal