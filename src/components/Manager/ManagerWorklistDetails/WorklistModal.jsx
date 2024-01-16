import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import {  reAllocateChart, fetchAvailableReAllocation} from "../../../services/managerWorkListService";
import Select from "react-select";
import { useEffect, useState } from "react";

function WorklistModal({ setChangeInWorklist,changeInWorklist,worklistId,handleActivityModal, showModalBox , masterData, handleParentWorklist, rangeWorklist, worklist}) 
{
  const [rangeAvail, setRangeAvail] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegistration = async (data) => {
    data = {...data, assign_to:data?.assign_to?.value, task_reassign : data?.task_reassign?.value}
    const response = await reAllocateChart(data,worklistId,worklist);
    if(response?.success === true) {
      setChangeInWorklist(!changeInWorklist)
      handleActivityModal();
      reset({
        from: "",
        to: "",
        assign_to: "",
  
      });
      handleParentWorklist();
    }
  };

  useEffect(() => {
    fetchRecord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRecord = async () => {
    const res = await fetchAvailableReAllocation(worklistId)
    setRangeAvail(res);
  }

  const  renderUserId = () => {
      return masterData?.users_all?.map((data) => {
        return {
          label: `${data.name}`,
          value: data.id,
        }
      })
  };

  const id = rangeAvail?.id?.map((response) => response)[0];
const name = rangeAvail?.name?.map((response) => response)[0];

const renderTaskId = () => {
  if (id && name && id.length === name.length) {
    return id.map((value, index) => ({
      label: name[index],
      value: value,
    }));
  }
  return []; // Handle the case where id or name is undefined or their lengths don't match.
};

  return (
    <>
      <Modal show={showModalBox} className="modal">
        <div>
          <Modal.Header className="modal-content">
            <Modal.Title className="modal-header pb-2">
              <h2>Reallocate Volume</h2>
              <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={() => handleActivityModal()} style={{ marginLeft: "15rem" }}>
                <span className="svg-icon svg-icon-1">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="currentColor" />
                    <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </Modal.Title>
            <Modal.Body className="modal-body scroll-y  mb-4">
              <div className="notice d-flex bg-light-danger rounded border-danger border border-dashed mb-9 p-4 py-0">
                <span className="svg-icon svg-icon-2tx svg-icon-danger me-4 pt-5">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor" />
                    <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor" />
                  </svg>
                </span>
                <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                  <div className="mb-3 mb-md-0 fw-semibold">
                    <h4 className="text-gray-800 fw-bold mb-0">Volume available for reallocation</h4>
                    <div className="d-flex  content-justify-center flex-row-fluid">
                      <div className="d-flex fw-semibold align-items-center">
                        {rangeAvail?.s_no_ranges?.map((option) => (
                          <>
                            <div className="bg-default me-3">
                              <i className="fa fa-check" />
                            </div>
                            <div className="text-gray-700 flex-grow-1 me-10">{option}</div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" text-center  rounded me-3 pb-2">
                    <span className="fs-2hx fw-bold text-danger" data-kt-countup="true" data-kt-countup-value={5}>
                      {rangeAvail?.remaining_count}
                    </span>
                    <p className="fs-6 fw-semibold text-gray-700 d-block p-0 m-0">Remaining</p>
                  </div>
                </div>
              </div>
              <form id="kt_modal_new_card_form" className="form" onSubmit={handleSubmit(handleRegistration)}>
              <div className="row">
                  <div className="col-md-12 mt-5 fv-row">
                    <label className="required fs-6 fw-semibold form-label mb-2">Task(s) to re-assign</label>
                    <Controller
                                   name={"task_reassign"}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={ renderTaskId()}
                                    />
                                  )}
                              />
                    <small className="text-danger">{errors?.assign_to && errors.assign_to.message}</small>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-5 fv-row">
                    <label className="required fs-6 fw-semibold form-label mb-2">Assign to</label>
                    <Controller
                                   name={"assign_to"}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={renderUserId()}
                                    />
                                  )}
                              />
                    <small className="text-danger">{errors?.assign_to && errors.assign_to.message}</small>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-5">
                    <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed  p-6">
                      <span className="svg-icon svg-icon-2tx svg-icon-warning me-4">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="currentColor" />
                          <rect x={11} y={14} width={7} height={2} rx={1} transform="rotate(-90 11 14)" fill="currentColor" />
                          <rect x={11} y={17} width={2} height={2} rx={1} transform="rotate(-90 11 17)" fill="currentColor" />
                        </svg>
                      </span>
                      <div className="d-flex flex-stack flex-grow-1 ">
                        <div className=" fw-semibold">
                          <h4 className="text-gray-800 fw-bold">Incomplete allocation!</h4>
                          <div className="fs-6 text-gray-700 ">
                            You are not doing full allocation, unselected charts will remain with <span className="fw-bold">original assignee</span>.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left pt-5 mt-5">
                  <button className="btn btn-sm btn-primary">
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  </button>
                  <button
                    type="reset"
                    id="kt_modal_new_card_cancel"
                    className="btn btn-sm btn-light ms-3"
                    onClick={(e) => {
                      handleActivityModal();
                      reset(
                        { from: "", to: "", assign_to: "" },
                        {
                          keepErrors: false,
                        }
                      );
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Header>
        </div>
      </Modal>
    </>
  );
}
export default WorklistModal;
