import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn/Index";
import ChartDetails from "./components/ChartDetails/ChartDetails";
import UserHome from "./components/Coder/Index";
import Layout from "./components/Layout/Layout";
import CoderProfile from "./components/CoderProfile/CoderProfile";
import AuthProvider from "./components/Auth/Middleware/AuthProvider";
import PR from "./components/Auth/Middleware/ProtectedRoute";
import ChartContextProvider from "./Context/ChartContextProvider";
import ConfigurationContextProvider from "./Context/ConfigrationContext/ConfigurationContextProvider";
import AuditorHome from "./components/Auditor/index";
import WorkList from "./components/Manager/ManagerWorkLists/Index";
import ManagerReports from "./components/Manager/ManagerReports/Index";
import WorklistDetails from "./components/Manager/ManagerWorklistDetails/Index";
import Configuration from './components/Configuration/index';
import CommentContextProvider from "./Context/CommentContext/CommentContextProvider";
import ManagerReportContextProvider from "./Context/ManagerReportContext/ManagerReportContextProvider"
import UserList from "./components/Manager/ManagerUsers/Index";
import Index from "./components/Dashboard/Index";
import DashboardContextProvider from "./Context/DashboardContext/DashboardContextProvider";
import ManagerUsersProfile from "./components/Manager/ManagerUsersProfile";
import AdAuthRedirect from './components/Auth/Middleware/AdAuthRedirect';
import { MsalProvider } from "@azure/msal-react";
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
function App({ instance }) {

  return (
    <>
      <MsalProvider instance={instance}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/redirect" element={ <AdAuthRedirect /> } />
            <Route element={<Layout />}>
              {/* PR - Protected Routes */}
              <Route exact path="/" element={ <PR> <UserHome /> </PR> } />
              <Route exact path="/process-chart/:id" element={ <PR> <ChartContextProvider> <CommentContextProvider> <ChartDetails /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/profile" element={ <PR> <CoderProfile /> </PR> } />
              <Route exact path="/auditor-home" element={ <PR> <ChartContextProvider> <CommentContextProvider> <AuditorHome /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/manager-worklist" element={ <PR> <ChartContextProvider> <CommentContextProvider> <ConfigurationContextProvider> <WorkList /> </ConfigurationContextProvider> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/member-worklist" element={ <PR> <ChartContextProvider> <CommentContextProvider> <WorkList /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/manager-worklist-details" element={ <PR> <ChartContextProvider> <CommentContextProvider> <WorklistDetails /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/member-worklist-details" element={ <PR> <ChartContextProvider> <CommentContextProvider> <ConfigurationContextProvider> <WorklistDetails /> </ConfigurationContextProvider> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/manager-reports" element={ <PR> <ManagerReportContextProvider> <CommentContextProvider> <ManagerReports /> </CommentContextProvider> </ManagerReportContextProvider> </PR> } />
              <Route exact path="/configuration" element={<PR ><ConfigurationContextProvider><Configuration/></ConfigurationContextProvider></PR> }/>
              <Route exact path="/manager-userlist" element={ <PR> <ChartContextProvider> <CommentContextProvider> <UserList /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/manager-users-profile" element={ <PR> <ChartContextProvider> <CommentContextProvider> <ManagerUsersProfile /> </CommentContextProvider> </ChartContextProvider> </PR> } />
              <Route exact path="/dashboard" element={ <PR> <DashboardContextProvider> <CommentContextProvider> <Index /> </CommentContextProvider> </DashboardContextProvider> </PR> } />
              <Route exact path="/kanban-board" element= { <PR> <KanbanBoard /> </PR> } />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      </MsalProvider>
    </>
  );
}

export default App;
