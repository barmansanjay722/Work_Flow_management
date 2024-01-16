/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ManagerReportFilter from "./ManagerReportFilter";
import managerAPI from "../../../apis/manager/managerAPI";
import localStorageStore from "../../../utils/localStorageStore";
import ManagerReportContext from "../../../Context/ManagerReportContext/ManagerReportContext";
const ManagerReports = () => {

  const { filtersData, setTemplateConfig, setFiltersData, setReportsData, setTemplatesList, setOnlyFiltersField, onlyFiltersField, setFilterOptions, filtersOptions,
    templatesList,defaultFields, defaultFilters, setNextPage, nextPage, setFilterFields, setFields, fields, setActiveTemplate, setOriginalFiltersData, originalFiltersData, activeTemplate } = useContext(ManagerReportContext);
  const [pageNo, setPageNo] = useState(1)
  const [reportsIsLoading, setReportsIsLoading] = useState(false)
  const [localOnlyFilter, setLocalOnlyFilter] = useState({})
  const [localFields, setLocalFields] = useState([])
  const [localFiltersData, setLocalFiltersData] = useState({})
  const [filterOptionsLoading, setFilterOptionLoading]= useState(false)
  const [filterClicked, setFilterClicked] = useState(false)

  const onChange = (value, key) => {
    let fieldsData = JSON.parse(JSON.stringify(localFields))
    let item = JSON.parse(JSON.stringify(localFiltersData[key]));
    let changedData = JSON.parse(JSON.stringify(localFiltersData));
    let filterFields = JSON.parse(JSON.stringify(localOnlyFilter))
    if (value === "report") {
      if (item.reportChecked) {
        const index = fieldsData.indexOf(item.key)
        if (index > -1) {
          fieldsData.splice(index, 1)
        }
      } else {
        fieldsData.push(item.key)
      }
      changedData[key] = {
        ...item,
        reportChecked: !item.reportChecked,
      }
    } else {
      changedData[key] = {
        ...item,
        filterChecked: !item.filterChecked,
      }
      if (changedData[key].filterChecked) {
        filterFields[key] = changedData[key]
      } else {
        delete filterFields[key]
      }
    }
    setLocalOnlyFilter(filterFields)
    setLocalFields(fieldsData)
    setLocalFiltersData({ ...changedData });
  };

  const onFilterSave = () => {
    setPageNo(1)
    setOnlyFiltersField(localOnlyFilter)
    setFiltersData(localFiltersData)
    setFields(localFields)
    fetchReports(localFields, false, { local: true })
  }

  useEffect(() => {
    restoreData()
  }, [filtersData])

  const fetchReports = async (fields,  exportFile = false, isLocal, forcePage = false) => {
    if (!exportFile) setReportsIsLoading(true)
    let filterPayload = {}
    let tempFilterField = isLocal ? localOnlyFilter : onlyFiltersField
    for (let a in tempFilterField) {
      if (((a.endsWith('_total') || a.endsWith('_correct')) && tempFilterField[a].value === 0) || tempFilterField[a].value) {
        if (tempFilterField[a].filterType.toLowerCase() === 'select') {
          if(tempFilterField[a].multiselect){
            if (tempFilterField[a].value.length > 0) {
              filterPayload[a] = tempFilterField[a].value.map((item) => item.value)
            }
          }else{
            if(Object.keys(tempFilterField[a].value).length>0){
              filterPayload[a] = tempFilterField[a].value.value
            }
          }
        } else {
          filterPayload[a] = tempFilterField[a].value
        }
      }
    }
    try {
      let res = await managerAPI.getReports({
        export: exportFile,
        fields: fields,
        filters: filterPayload
      }, {
        page: forcePage ? forcePage : pageNo
      }, exportFile)
      if (exportFile) {
        window.location.assign(res.result.url);
      } else {
        setReportsData(res.result)
        setNextPage(res.next_page)
        setReportsIsLoading(false)
      }
    } catch (e) {
      if (!exportFile) setReportsIsLoading(false)
    }
  }

  useEffect(() => {
    if(!filterClicked) {
      fetchReports(fields)
    }
  }, [pageNo])

  useEffect(() => {
    getReportData();
  }, [])

  const getReportData = async () => {
    fetchTemplates();
    let res = await managerAPI.getColumns()
    setOriginalFiltersData(res);
    setFiltersData(res);
    let resCopy  = {}
    let onlyFilters = {}
    if (activeTemplate !== '') {
      fetchTemplateConfig(activeTemplate, res);
    } else {
      if(res && Object.keys(res).length>0){
         resCopy = JSON.parse(JSON.stringify(res))

         for(let a in resCopy){
           if(defaultFilters.includes(a)){

            resCopy[a] = {
              ...resCopy[a],
              filterChecked: true
            }
            onlyFilters[a] = {
              ...resCopy[a],
              filterChecked: true
            }

          }
          if(defaultFields.includes(a)){
            resCopy[a] = {
              ...resCopy[a],
              reportChecked: true
            }
          }
        }
      }
      setFiltersData(resCopy)
      setOnlyFiltersField(onlyFilters)
      setFields(defaultFields)
      fetchReports(defaultFields)
    }
  }

  const fetchFiltersOptions = async () => {
    try{
    setFilterOptionLoading(true)
    let payload = []
    for (let a in onlyFiltersField) {
      payload.push(a)
    }
    let res = await managerAPI.getFilterOptions({
      filters: payload
    })
    if (res && res.success && res.data) {
      setFilterOptions(res.data)
    }
    setFilterOptionLoading(false)
  }catch(e){
    setFilterOptionLoading(false)
  }
  }

  useEffect(() => {
    fetchFiltersOptions()
  }, [onlyFiltersField])
  const onFilterChange = (val, key, name, i) => {
    let dataFilter = onlyFiltersField
    dataFilter[key].value = val
    setFilterFields({ ...dataFilter })
  }

  const onFilterClick = () => {
    setFilterClicked(true);
    setPageNo(1)
    fetchReports(fields, false, false, 1)
  }

  const handleNextPrev = (val) => {
    setFilterClicked(false);
    if(!reportsIsLoading){
    if (pageNo > 0) {
      if (val === 'next') {
        setPageNo(pageNo + 1)
      } else {
        if (pageNo > 1) {
          setPageNo(pageNo - 1)
        }
      }
    }
    }
  }

  const fetchTemplates = async () => {
    let res = await managerAPI.getAllTemplates()
    setTemplatesList(res)
  }

  const restoreData = () => {
    setLocalOnlyFilter(onlyFiltersField)
    setLocalFields(fields)
    setLocalFiltersData(filtersData)
  }

  const fetchTemplateConfig = async (id, filterData = null) => {
    try{
    setReportsIsLoading(true)
    setActiveTemplate(id)
    setPageNo(1)
    localStorageStore.setDefaultTemplate(id);
    let res = await managerAPI.getTemplateConfig(id)
    let filterdDataCopy = (filterData == null ? JSON.parse(JSON.stringify(originalFiltersData)) : JSON.parse(JSON.stringify(filterData)));
    let onlyFilters = {}
    setTemplateConfig(res)
    for (let b in filterdDataCopy) {
      filterdDataCopy[b] = {
        ...filterdDataCopy[b],
        reportChecked: false,
        filterChecked: false,
      }
    }
    if (res && res.length > 0) {
      res.forEach((item) => {
        filterdDataCopy[item.field_name] = {
          ...filterdDataCopy[item.field_name],
          reportChecked: item.report,
          filterChecked: item.filter,
          id: item.id
        }
        if (item.filter) {
          onlyFilters[item.field_name] = {
            ...filterdDataCopy[item.field_name],
            reportChecked: item.report,
            filterChecked: item.filter,
            id: item.id
          }
        }
      })
    }
    let payload = []
    setOnlyFiltersField(onlyFilters)
    setFiltersData(filterdDataCopy)
    for (let a in filterdDataCopy) {
      let item = filterdDataCopy[a];
      if (item.reportChecked) {
        payload.push(item.key)
      }
    }
    setFields(payload)
    fetchReports(payload)
    setReportsIsLoading(false)
  }catch(e){
    setReportsIsLoading(false)
  }
  }
  
  return (
    <>
      <ManagerReportFilter
        templatesList={templatesList}
        onTemplateSelect={fetchTemplateConfig}
        handleNextPrev={handleNextPrev}
        onFilterClick={onFilterClick}
        filterFields={onlyFiltersField}
        onFilterChange={onFilterChange}
        onFilterSave={onFilterSave}
        onChange={onChange}
        onExport={fetchReports}
        filtersData={filtersData}
        nextPage={{ nextPage: nextPage, currentPage: pageNo, setPageNo: setPageNo }}
        reportsIsLoading={reportsIsLoading}
        filtersOptions={filtersOptions}
        localFiltersData={localFiltersData}
        onDiscard={restoreData}
        filterOptionsLoading={filterOptionsLoading}
      />
    </>
  );
};
export default ManagerReports;
