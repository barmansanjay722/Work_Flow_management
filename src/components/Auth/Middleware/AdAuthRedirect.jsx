import React, { useContext, useEffect } from 'react'
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { getUserDetail } from '../../../services/userService';
import ManagerRequestAccess from '../../Coder/ManagerRequestAccess';
import { Modal } from 'react-bootstrap';
import { loginRequest } from '../../../authConfig';
import { clearStorage } from '../../../utils/storageUtils';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import localStorageStore from '../../../utils/localStorageStore';
import role from '../../../utils/role';

const AdAuthRedirect = () => {
    const authContext = useContext(AuthContext);
    // let params = useParams();
    // console.log('PARAMS--------', Object.fromEntries(new URLSearchParams(window.location.hash.substr(1))));
    const navigate = useNavigate();
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    let isFirstLoad = true;
    let userFirstName = '';
    let userLastName = '';

    if(activeAccount) {
        const userName = activeAccount?.name;
        userFirstName = userName?.substring(0,userName?.indexOf(" ", 0));
        userLastName = userName?.substring(userName?.indexOf(" ", 0)+1, userName?.length);
    }

    const handleLoginRedirect = () => {
        /**
         * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
         * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
         * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
         */
        try{
    
          instance.loginRedirect(loginRequest)
          .catch((error) => alert(error));
        }catch (err) {
          alert(err)
        }
    };

    const handleLogoutRedirect = () => {
        let account = instance.getActiveAccount();
        clearStorage(account);
    
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
      };

    const getAPIToken = () => {
        fetch(`${process.env.REACT_APP_API_HOST}/login`, {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" },
            mode: "cors",
        })
        .then((res) => res.json())
        .then((response) => {
            if(response.success) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("tokenReplaced", '1');
                localStorage.setItem("attending", response.attending);
                
                authContext.loginAuth(true);
                authContext.setToken(response.token);
                getUserDetail(response.token).then((responseUserDetails) => {
                    if(responseUserDetails.success) {
                        localStorageStore.setRole(responseUserDetails?.data?.Role);
                        localStorage.setItem("RoleId", responseUserDetails?.data?.id)
                        localStorage.setItem("loginUserId", responseUserDetails?.data?.id)
                        authContext.setRole(responseUserDetails?.data?.Role);
                        authContext.setLoginUserId(responseUserDetails?.data?.id);
                        authContext.setdata(responseUserDetails?.data);

                        if(responseUserDetails.data.image_url) {
                            localStorage.setItem("userImageUrl", responseUserDetails.data.image_url);
                            authContext.setImageUrl(responseUserDetails.data.image_url);
                        } else {
                            localStorage.removeItem("userImageUrl");
                            authContext.setImageUrl(null);
                        }
                    } else {
                        window.toastr.error(responseUserDetails.message)
                    }
                });

                if(authContext.role === role.Manager || authContext.role === role.TeamLead) {
                    navigate("/manager-worklist");
                } else {
                    navigate("/");
                }
            } else {
                if(response.message === 'Token could not be verified') {
                    window.toastr.error(response.message);
                    setTimeout(() => handleLoginRedirect(), 2500);
                } else if(response.message === 'User already requested access') {
                    authContext.setRequestAccess(true);
                    authContext.setAlreadyRequestedAccess(true);
                    if(window.toastr.getContainer().length === 0) {
                        isFirstLoad && window.toastr.info(response.message);
                    }
                    setTimeout(() => getAPIToken(), 5000);
                } else if(response.message === 'User does not exist') {
                    authContext.setRequestAccess(true);
                }
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
        if(activeAccount && instance && !localStorage.getItem('AzureTokenGranted')){
            const accessTokenRequestAPI = {
                scopes: [process.env.REACT_APP_MS_AD_DEFAULT_API_URI],
                account: activeAccount,
            };
            instance.acquireTokenSilent(accessTokenRequestAPI).then(function (accessTokenResponse) {
                // Acquire token silent success
                let accessToken = accessTokenResponse.accessToken;
                authContext.setToken(accessToken);
                localStorage.setItem('token', accessToken);
                localStorage.setItem('AzureTokenGranted', '1');
                // eslint-disable-next-line react-hooks/exhaustive-deps
                isFirstLoad = false;
                
                getAPIToken();
            }).catch(function (error) {
                //Acquire token silent failure, and send an interactive request
                if (error instanceof InteractionRequiredAuthError) {
                instance.acquireTokenPopup(accessTokenRequestAPI)
                    .then(function (accessTokenResponse) {
                    // Acquire token interactive success
                    let apiAccessToken = accessTokenResponse.accessToken;
                    authContext.setToken(apiAccessToken);
                    localStorage.setItem('token', apiAccessToken);
                    })
                    .catch(function (error) {
                    // Acquire token interactive failure
                    console.log(error);
                    });
                }
            });
        } else if(!activeAccount) {
            setTimeout(() => {
                if(document.querySelector('.spinner-border')){
                    navigate('/login')
                    window.toastr.info('Could not verify session, try login again!')
                }
            }, 10000)
        }
    }, [activeAccount, instance])

    return (
        <>
            {/* <div>{JSON.stringify(activeAccount)}</div> */}
            { !authContext.requestAccess && 
            <div className="p-10">
                <div className="spinner-border text-primary d-flex justify-content-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div>Authentication in progress, please wait...</div>
            </div> }
            <Modal style={{ marginTop: "4rem" }} show={authContext.requestAccess}>
                <ManagerRequestAccess requestBody={
                    { email: activeAccount?.username, azure_id: activeAccount?.localAccountId, first_name: userFirstName, last_name: userLastName}
                } handleLogoutRedirect={handleLogoutRedirect} />
            </Modal>
        </>
    );
}

export default AdAuthRedirect
