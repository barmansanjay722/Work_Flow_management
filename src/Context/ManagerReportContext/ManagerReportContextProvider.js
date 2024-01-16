import React from "react";
import { useState } from "react";
import ManagerReportContext from "./ManagerReportContext";
import localStorageStore from "../../utils/localStorageStore";
export default function ManagerReportContextProvider({ children }) {
  const [filtersData, setFiltersData] = useState({});
  const [originalFiltersData, setOriginalFiltersData] = useState([]);
  const [reportsData, setReportsData] =  useState([])
  const [templatesList, setTemplatesList] = useState([])
  const [templateConfig, setTemplateConfig] = useState([])
  const [fields, setFields] = useState([])
  const [filterFields, setFilterFields] = useState({})
  const [nextPage, setNextPage] = useState(true)
  const defaultFields = ["date", "unique_task_no", "name", "hours",  "description", "assignee_name", "milestone_name", "start_date", "end_date", "worklist_no", "project_name"]
  const defaultFilters = [ "date", "unique_task_no", "name", "assignee_name", "milestone_name", "start_date", "end_date", "project_name"]
  const [activeTemplate, setActiveTemplate] = useState(localStorageStore.getDefaultTemplate())
  const [onlyFiltersField, setOnlyFiltersField] = useState({})
  const [filtersOptions, setFilterOptions] = useState({})
  return (
    <ManagerReportContext.Provider
      value={{
        setFiltersData,
        filtersData,
        reportsData,
        setReportsData,
        setTemplatesList,
        templatesList,
        setTemplateConfig,
        templateConfig,
        setFilterFields,
        filterFields,
        setFields,
        fields,
        setActiveTemplate,
        activeTemplate,
        originalFiltersData,
        setOriginalFiltersData,
        setOnlyFiltersField,
        onlyFiltersField,
        setFilterOptions,
        filtersOptions,
        setNextPage,
        nextPage,
        defaultFields,
        defaultFilters
      }}
    >
      {children}
    </ManagerReportContext.Provider>
  );
}

