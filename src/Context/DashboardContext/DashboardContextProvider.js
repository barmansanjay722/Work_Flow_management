import { useState } from "react";
import DashboardContext from "./DashboardContext";
export default function DashboardContextProvider({children}){
    const [productivityGraphData, setProductivityGraph] = useState([])
    const [allocatedStatsData, setAllocatedStatsData] = useState({})
    const [unallocatedGraph, setUnallocatedGraph] = useState({})
    const [filterOptions, setFilterOptions] = useState({})
    const [userStats, setUserStats] = useState({})
    return(
        <DashboardContext.Provider
        value={{
            productivityGraphData,
            setProductivityGraph,
            setAllocatedStatsData,
            allocatedStatsData,
            setUnallocatedGraph,
            unallocatedGraph,
            setFilterOptions,
            filterOptions,
            setUserStats,
            userStats
        }}>
            {children}
        </DashboardContext.Provider>
    )
}