import { useForm, useFieldArray ,Controller} from "react-hook-form";
import {getProjectMembers} from "../../../services/managerWorkListService";
import { yupResolver } from "@hookform/resolvers/yup";
import { allocateChart } from "../../../services/managerWorkListService";
import { fetchAvailableAllocation } from "../../../services/managerWorkListService";
import { useEffect, useState } from "react";
import Select from "react-select";
import "../ManagerWorklistDetails.css";
import * as yup from "yup";
import React from "react";
import CountUp from 'react-countup';

let isValidSchema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      taskId: yup.array().min(1,"Required"),
      userId:yup.object().shape({label:yup.string().required("Required"),value:yup.string().required("Required"),}) 
    })
  ),
});

function AllocateTasks({ masterData, worklistId, setParentDetails, onQuery,changeInWorklist, setChangeInWorklist,dependencyForFetchWorklistProgressRerender,setDependencyForFetchWorklistProgressRerender}) {
  const [volAvailable, setVolAvailable] = useState();
  const [resultSet, setResultSet] = useState();
  const [membersFromGetProjectMembersApi, setMembersFromGetProjectMembersApi] = useState();

  const fetchApiFromGetProjectMembersApi = async (worklistId) => {
    const response = await getProjectMembers(worklistId);
     if(response){
       setMembersFromGetProjectMembersApi(response)
     }
 }

  useEffect(() => {
    getAvailableAllocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultSet]);

  const getAvailableAllocation = async () => {
    const res = await fetchAvailableAllocation(worklistId);
    setVolAvailable(res);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      list: [{ taskId:"", userId: "" }],
    },
    mode: "onChange",
    resolver: yupResolver(isValidSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });
  
  const onSave = async (data) => {
    data = {list: data.list.map((item) =>  { return {...item, userId: item?.userId?.value} }) };
    setDependencyForFetchWorklistProgressRerender(!dependencyForFetchWorklistProgressRerender)
    const res = await allocateChart(data, worklistId);
    setResultSet(res);
    onQuery(res);
    if(res.success === true) {
      setChangeInWorklist(!changeInWorklist)
      reset({
        list: [{ taskId:"", userId: "" }],
      });
    }
    setParentDetails(data);
  };

  const handleReset =()=>{
    reset({
      list: [{ taskId:"", userId: "" }]
    })
  }

  const  renderUserId = () => {
    return membersFromGetProjectMembersApi?.data?.map((data) => {
      return {
        label: `${data?.first_name} ${data?.last_name}`,
        value: data?.id,
      }
    })
  }
  
  const  renderTaskId = () => {
    return volAvailable?.tasks?.map((data) => {
      return {
        label: `${data.name}`,
        value: data.id,
      }
    })
  }

  useEffect(() => {
    fetchApiFromGetProjectMembersApi(worklistId)
    getAvailableAllocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyForFetchWorklistProgressRerender]);

  useEffect(() => {
    fetchApiFromGetProjectMembersApi(worklistId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="col-xl-5">
        <div className="card card-flush mb-6 mb-xl-9 card1">
          <div className="card-header py-4">
            <p className="card-title align-items-start flex-column">
              <span className="fw-bold h4">Allocate Tasks</span>
              <span className="text-gray-400 mt-1 fw-semibold fs-6">Select Task &amp; user to allocate</span>
            </p>
          </div>
          <div className="card-body pt-0 pb-5">
            <div className="notice d-flex bg-light-danger rounded border-danger border border-dashed mb-10 p-4 pb-2">
              <span className="svg-icon svg-icon-2tx svg-icon-danger me-4" style={{margin: "auto 0px"}}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor" /> <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor" /> </svg>
              </span>
              <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                <div className="mb-3 mb-md-0 fw-semibold">
                  <h4 className="text-gray-900 fw-bold mb-0">Tasks available for allocation</h4>
                </div>
                <div className=" text-center  rounded me-3">
                  <span className="fs-2hx fw-bold text-danger counted" data-kt-countup="true" data-kt-countup-value={volAvailable?.remaining_count} data-kt-initialized={1}>
                  <CountUp start={0} end={volAvailable?.remaining_count}></CountUp>
                  </span>
                  <span className="fs-4 fw-semibold text-gray-700 d-block">Remaining</span>
                </div>
              </div>
            </div>
            {volAvailable?.remaining_count !== 0 && (
              <form className="form" onSubmit={handleSubmit(onSave)}>
                <div className="form-group">
                  {fields.map((field, index) => (
                    <div data-repeater-list="kt_ecommerce_add_product_options" className="" key={field.id}>
                      <div className="form-group row">
                        <div className="col-lg-6 col-md-6 col-12 mb-3">
                          <Controller name={`list.${index}.taskId`} control={control} render={({ field }) => ( <Select {...field} options={renderTaskId()} menuPlacement="auto" isMulti={true} placeholder="Select task(s)" />
                            )}
                          />
                          {errors?.list?.[index]?.taskId && <span className="error-color">{"Required"}</span>} 
                        </div>
                        <div className="col-lg-5 col-md-5 col-12 mb-3">
                          <div className="">
                          </div>
                            <Controller name={`list.${index}.userId`} control={control} render={({ field }) => ( <Select {...field} options={renderUserId()} menuPlacement="auto" />
                              )}
                            />
                            {errors?.list?.[index]?.userId && <span className="error-color">{"Required"}</span>} 
                        </div>
                        {fields.length !== 1 && (
                          <button onClick={() => remove(index)} className="btn btn-sm btn-icon btn-light-danger delete-row mobile-delete-row">
                            <span className="svg-icon svg-icon-1"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect opacity="0.5" x="7.05025" y="15.5356" width={12} height={2} rx={1} transform="rotate(-45 7.05025 15.5356)" fill="currentColor" /> <rect x="8.46447" y="7.05029" width={12} height={2} rx={1} transform="rotate(45 8.46447 7.05029)" fill="currentColor" /> </svg></span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-stack mt-10 pt-5 bs-red-error " id="overlapping_id"></div>
                <div className="d-flex flex-stack mt-10 pt-5 border-top">
                  <button type="button" className="btn btn-sm btn-light" onClick={() => append({ taskId:"", userId: "" })}>
                    <span className="svg-icon svg-icon-2"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect opacity="0.5" x={11} y={18} width={12} height={2} rx={1} transform="rotate(-90 11 18)" fill="currentColor" /> <rect x={6} y={11} width={12} height={2} rx={1} fill="currentColor" /> </svg> </span>
                    Add another
                  </button>
                  <div className="text-left">
                    <button type="reset" id="kt_modal_new_card_cancel" className="btn btn-sm btn-light ms-3" onClick={handleReset}>
                      Clear
                    </button>
                    <button type="submit"  className="btn btn-sm btn-primary">
                      <span className="indicator-label">Save</span>
                      <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AllocateTasks;