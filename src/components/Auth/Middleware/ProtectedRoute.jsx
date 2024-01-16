import { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";

const ProtectedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  // const location = useLocation();

  if(window.location.hash) {
    localStorage.setItem('ad-callback-data', JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)))));
  }

  useEffect(() => {
    if(activeAccount) {
      authContext.loginAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]); //, [authContext]);

  // return <>{authContext.checkUserToken() && authContext.authenticated ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />}</>;
  return <>
    {activeAccount ? <AuthenticatedTemplate> {children} </AuthenticatedTemplate> : <p>&nbsp;</p>}
  </>;
};
export default ProtectedRoute;