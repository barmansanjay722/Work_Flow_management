import React, { useState, useEffect, useContext } from "react";
// import moment from "moment/moment";
// import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-calendar/dist/Calendar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetail, attendingAPI } from "../../services/userService";
import AuthContext from "../Auth/Middleware/AuthContext";
import { clearStorage } from "../../utils/storageUtils";
import { FileMimeType, getS3BucketName, getS3Object, imageIdGenerate, updateUserImage } from "../../utils/custom";
import { useMsal } from "@azure/msal-react";
import { callMSPhotoApiWithToken } from "../../fetch";
import { protectedResources } from "../../authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
// import { getBasicSearch } from "../../services/chartService";
// import SearchBox from "./SearchBox";
import Notifications from "./Notifications";
import Modal from "react-bootstrap/Modal";
import localStorageStore from "../../utils/localStorageStore";
import CoderAttendancePop from "../Coder/CoderAttendancePop";
import moment from "moment";

const Header = () => {
  const [state, setState] = useState({ name: "" });
  // const [selectBox, setSelectBox] = useState([])
  // const [responseObj, setResponseObj] = useState({})
  // const [advancedSearchStartDate, setAdvancedSearchStartDate] = useState("");
  // const [advancedSearchEndDate, setAdvancedSearchEndDate] = useState("");
  // const [advanceSearchOptions, setAdvanceSearchOptions] = useState([
  //   { label: "Date of Birth", value: "date_of_birth" },
  //   { label: "Joining Date", value: "joining_date" },
  // ]);
  // const [loader, setLoader] = useState(false);
  const profileData = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { instance } = useMsal();
  let id = localStorage.getItem("key");
  let activeAccount;
  // const [advancedSearchKeyword, setAdvancedSearchKeyword] = useState("")
  // const isManagerialRole = decrypRole === "Manager" || decrypRole === "Team Lead";
  // const isAuditorialRole = decrypRole === "Member";
  const [show, setShow] = useState(localStorage.getItem("attending") == null || localStorage.getItem("attending") === "false" ? true : false);
  const [showtable, setShowtable] = useState(localStorage.getItem("attending") === "true" ? true : false);
  const { data } = useContext(AuthContext);
  const tokenReplaced = localStorage.getItem('tokenReplaced');

  if(!tokenReplaced){
    navigate('/redirect')
  }
  
  const handleClose = () => {
    setShow(false);
  };

  const markIsAttending = async (isAttending) => {
    window.localStorage.setItem("attending", isAttending);
    const response = await attendingAPI(isAttending);
    if (response?.success === true) {
      navigate(`${window.location.pathname}`, {state:{}})
      setShowtable(isAttending);
    }
    handleClose();
    navigate(`${window.location.pathname}`, {state: { id: location.key, showtable: isAttending, show}});
  };

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("attending");
    localStorage.removeItem("template");
    profileData.setToken(null);
    authContext.loginAuth(false);
    handleLogoutRedirect();
  };

  const handleLogoutRedirect = () => {
    let account = instance.getActiveAccount();
    clearStorage(account);

    instance.logoutRedirect({
      account: instance.getActiveAccount(),
    });
  };

  let newEndpoint = window.location.pathname;

  if (newEndpoint === `/process-chart/${id}`) {
  }

  const handleLocationChange = () => {
    const newEndpoint = window.location.pathname;
    if (newEndpoint === `/process-chart/${id}`) {
      setState({ name: "Task Details" });
    } else if (newEndpoint === "/") {
      setState({ name: "Tasks" });
    } else if (newEndpoint === "/profile") {
      setState({ name: "Profile" });
    } else if (newEndpoint === "/manager-worklist" || newEndpoint === "/member-worklist") {
      setState({ name: "Projects" });
    } else if (newEndpoint === "/manager-worklist-details" || newEndpoint === "/member-worklist-details") {
      setState({ name: "Project details" });
    } else if (newEndpoint === "/manager-reports") {
      setState({ name: "Timesheet" });
    } else if (newEndpoint === "/configuration") {
      setState({ name: "Configurations" });
    } else if (newEndpoint === "/manager-userlist") {
      setState({ name: "Users List" });
    } else if (newEndpoint === "/manager-users-profile") {
      setState({ name: "Profile" });
    } else if (newEndpoint === "/dashboard") {
      setState({ name: "Dashboard" });
    } else if (newEndpoint === "/kanban-board") {
      setState({ name: "Kanban Board" });
    }else {
      setState({ name: "" });
    }
  };

  // const triggerFirstChildRadioGrpAdvSearch = () => {
  //   const radioButton = document.querySelector('input.form-check-input[type="radio"]:first-child');
  //   if (radioButton) {
  //     radioButton.dispatchEvent(new Event("click", { bubbles: true }));
  //     radioButton.click();
  //   }
  // };
  
  useEffect(() => {
    // Interceptor
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;
      let response = await originalFetch(resource, config);
      if (!response.ok && (response.status === 400 || response.status === 401)) {
        if (response.url.startsWith("https://login.microsoftonline.com/") && response.status === 400) {
          localStorage.removeItem("token");
          navigate("/login", { state: { error_msg: "Session expired!" } });
        } else if (response.statusText === "Unauthorized" && response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { state: { error_msg: "Session expired!" } });
        }
      }

      return response;
    };

    if (activeAccount && instance) {
      if (!authContext.token) {
        const accessTokenRequestAPI = {
          scopes: [process.env.REACT_APP_MS_AD_DEFAULT_API_URI],
          account: activeAccount,
        };
        instance
          .acquireTokenSilent(accessTokenRequestAPI)
          .then(function (accessTokenResponse) {
            // Acquire token silent success
            let apiAccessToken = accessTokenResponse.accessToken;
            authContext.setToken(apiAccessToken);
            localStorage.setItem("token", apiAccessToken);
            fetchUserImage();
          })
          .catch(function (error) {
            //Acquire token silent failure, and send an interactive request
            if (error instanceof InteractionRequiredAuthError) {
              instance
                .acquireTokenPopup(accessTokenRequestAPI)
                .then(function (accessTokenResponse) {
                  // Acquire token interactive success
                  let apiAccessToken = accessTokenResponse.accessToken;
                  authContext.setToken(apiAccessToken);
                  localStorage.setItem("token", apiAccessToken);
                  fetchUserImage();
                })
                .catch(function (error) {
                  // Acquire token interactive failure
                  console.log(error);
                });
            }
          });
      } else {
        fetchUserImage();
      }
    }

    handleLocationChange();
    document.body.classList.remove("auth-bg"); // Removes Auth BG which was added on Sign-in Page
    window.KTThemeMode.init(); // Menu event binding
    window.KTMenu.init();
    window.KTLayoutSearchMenu.init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const fetchUserImage = (apiAccessToken) => {
    getUserDetail(authContext.token ?? "")
      .then((responseUser) => {
        if (responseUser.success) {
          if(responseUser?.data?.image_url) {
            authContext.setImageUrl(responseUser?.data?.image_url);
          } else {
            const accessTokenRequestAPI = {
              scopes: ['User.Read'],
              account: activeAccount,
            };
            instance.acquireTokenSilent(accessTokenRequestAPI).then(function (accessTokenResponse) {
              // Acquire token silent success
              let apiAccessToken = accessTokenResponse?.accessToken;
              if(apiAccessToken) {
                callMSPhotoApiWithToken(
                  apiAccessToken,
                  protectedResources.graphMePhoto.endpoint
                ).then((photoBlob) => {
                  if(photoBlob !== undefined) {
                    const imageName = `user-images/PP-${responseUser?.data?.first_name?.trim()}-${responseUser?.data?.last_name?.trim()}-${responseUser?.data?.id}-${moment().unix()}${FileMimeType[photoBlob?.type]?"."+FileMimeType[photoBlob?.type]:""}`;
                    let uploadedLink = false;
                    const s3 = getS3Object();
                    s3.upload({
                      Bucket: getS3BucketName(),
                      Key: imageName,
                      Body: photoBlob,
                    }, (err, data) => {
                      if (err) {
                        console.error('Error uploading to S3:', err);
                      } else {
                        uploadedLink = data.Location;
                        updateUserImage(uploadedLink).then((response) => {
                          if (response.success) {
                            localStorage.userImageUrl = uploadedLink;
                            authContext.setImageUrl(uploadedLink);
                          }
                        });
                      }
                    });
                  }
                })
                .catch((err) => console.error(err));
              }
            })
            .catch(function (error) {
              //Acquire token silent failure, and send an interactive request
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/redirect") {
      navigate("/login", { state: { path: location.pathname } });
    }
  });

  const decryptRole = localStorageStore.getRole();


  // let timeoutId;
  // const basicSearch = async (event) => {
  //   const keyword = event?.target?.value?.trim();
  //   if (keyword !== "") {
  //     setLoader(true);
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(async () => {
  //       const response = await getBasicSearch({ keyword });
  //       setResponseObj(response?.data);
  //       setLoader(false);
  //     }, 1500);
  //   }
  // };

  // useEffect(() => {
  //   console.log("");
  // }, [responseObj, loader]);

  // const [selectedOptions, setSelectedOptions] = useState([]);


  // const handleClearDate = (event, picker) => {
  //   (picker) ? picker.element.val('') : document.querySelector('#global_date_range_picker_el').value = '';
  //   setAdvancedSearchStartDate('');
  //   setAdvancedSearchEndDate('');
  //   triggerFilterOpen()
  // };

  // const handleCheckboxChange = (event) => {
  //   const checkboxValue = event.target.value;

  //   if (event.target.checked) {
  //     setSelectedOptions(checkboxValue);
  //   }
  //   switch (checkboxValue) {
  //     case "name":
  //       setAdvanceSearchOptions([
  //         { label: "Date of Birth", value: "date_of_birth" },
  //         { label: "Joining Date", value: "joining_date" },
  //       ]);
  //       document.querySelector('.header-search input[name="advance-search-text"]')?.setAttribute("placeholder", "Search for User...");
  //       setSelectBox([]);
  //       setAdvancedSearchKeyword("");
  //       handleClearDate();
  //       break;
  //     case "chart_no":
  //       setAdvanceSearchOptions([
  //         { label: "Received Date", value: "receivedDate" },
  //         { label: "Date of Service", value: "date_of_service" },
  //         { label: "Date of Completion", value: "completion_date" },
  //       ]);
  //       document.querySelector('.header-search input[name="advance-search-text"]')?.setAttribute("placeholder", "Search for Chart number...");
  //       setSelectBox([]);
  //       setAdvancedSearchKeyword("");
  //       handleClearDate();
  //       break;
  //     case "worklistId":
  //       setAdvanceSearchOptions([
  //         { label: "Received Date", value: "receivedDate" },
  //         { label: "Date of Service", value: "date_of_service" },
  //       ]);
  //       document.querySelector('.header-search input[name="advance-search-text"]')?.setAttribute("placeholder", "Search for Worklist number...");
  //       setSelectBox([]);
  //       setAdvancedSearchKeyword("");
  //       handleClearDate();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleAdvancedSearchText = (event) => {
  //   setAdvancedSearchKeyword(event?.target?.value);
  // };

  // let submitData = {
  //   [selectedOptions]: [advancedSearchKeyword],
  //   [selectBox?.value]: advancedSearchStartDate !== "" && advancedSearchStartDate !== null && advancedSearchStartDate !== undefined ? moment(advancedSearchStartDate).format("MM/DD/YYYY") + " - " + moment(advancedSearchEndDate).format("MM/DD/YYYY") : "",
  // };

  // const handleChart = (item) => {
  //   navigate(`/process-chart/${item}`, { state: { chart_id: item } });
  // };

  // const handleUsers = (item) => {
  //   navigate("/manager-users-profile", { state: { user_id: item } });
  // };

  // const handleWorklist = (item) => {
  //     navigate((isManagerialRole ? "/manager-worklist-details" : ( isAuditorialRole ? "/member-worklist-details" : "")), {state: {worklist_id: item}} );
  // };

  // const handleGlobalFilterDateTypeChange = (event) => {
  //   setSelectBox(event);
  //   triggerFilterOpen();
  // };

  // const advanceSearch = async (event) => {
  //   if (selectedOptions === "chart_no") {
  //     navigate("/", { state: { submitData } });
  //   } else if (selectedOptions === "name") {
  //     navigate(isManagerialRole ? "/manager-userlist" : "", { state: { submitData } });
  //   } else {
  //     navigate(isManagerialRole || isAuditorialRole ? "/manager-worklist" : "", { state: { submitData } });
  //   }
  // };

  // const triggerFilterOpen = () => {
  //   setTimeout(() => {
  //     document.querySelector("div.searchbox").dispatchEvent(
  //       new MouseEvent("click", {
  //         view: window,
  //         bubbles: true,
  //         cancelable: true,
  //         buttons: 1,
  //       })
  //     );
  //   }, 100);
  // };

  // const handleAdvanceSearchCancel = () => {
  //   setAdvancedSearchKeyword("");
  //   setSelectBox([]);
  //   setAdvancedSearchStartDate("");
  //   setAdvancedSearchEndDate("");
  //   triggerFirstChildRadioGrpAdvSearch();
  //   triggerFilterOpen();

  //   let navigateRequired = false;
    
  //   if (advancedSearchKeyword !== "") {
  //     navigateRequired = true;
  //   }
    
  //   if (advancedSearchStartDate !== "" || advancedSearchEndDate !== "") {
  //     navigateRequired = true;
  //   }
    
  //   if (selectedOptions === "chart_no" && navigateRequired && window.location.pathname === "/") {
  //     navigate("/", { state: { } });

  //   } else if (selectedOptions === "name" && navigateRequired && window.location.pathname === "/manager-userlist") {
  //     navigate(isManagerialRole ? "/manager-userlist" : "", { state: { } });
      
  //   } else {
  //     if (selectedOptions === "worklistId" && navigateRequired && window.location.pathname === "/manager-worklist") {
  //       navigate(isManagerialRole || isAuditorialRole ? "/manager-worklist" : "", { state: { } });
  //     }
  //   }
  // };

  return (
    <>
      <div id="kt_header" className="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
        <div className="container-fluid d-flex align-items-stretch justify-content-between" id="kt_header_container">
          <div className="page-title d-flex flex-column left align-items-start justify-content-center flex-wrap me-2 mb-5 mb-lg-0" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}">
            <button type="button" className="btn btn-link d-xl-block sidebar-mini-btn p-0 text-primary me-5" fdprocessedid="45m7ml">
              <span className="hamburger-icon active">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </span>
            </button>
            <div className="flex-column">
              <h1 className="text-dark fw-bold mt-1 mb-1 fs-2">{state?.name}</h1>
              <ul className="breadcrumb fw-semibold fs-base mb-1">
                <li className="breadcrumb-item text-muted"> {state?.name}</li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center flex-shrink-0 user-details">
            {/* <SearchBox setAdvancedSearchStartDate={setAdvancedSearchStartDate} triggerFirstChildRadioGrpAdvSearch={triggerFirstChildRadioGrpAdvSearch} advancedSearchKeyword={advancedSearchKeyword} setAdvancedSearchEndDate={setAdvancedSearchEndDate} triggerFilterOpen={triggerFilterOpen} basicSearch={basicSearch} loader={loader} responseObj={responseObj} handleChart={handleChart} handleUsers={handleUsers} handleWorklist={handleWorklist} handleCheckboxChange={handleCheckboxChange} handleAdvancedSearchText={handleAdvancedSearchText} handleGlobalFilterDateTypeChange={handleGlobalFilterDateTypeChange} selectBox={selectBox} advanceSearchOptions={advanceSearchOptions} DateRangePicker={DateRangePicker} handleAdvanceSearchCancel={handleAdvanceSearchCancel} handleClearDate={handleClearDate} advanceSearch={advanceSearch} /> */}
            <Notifications />
            <div className="d-flex align-items-center ms-2 ms-lg-3">
              <Link onClick={ e => e.preventDefault()} className="btn btn-icon btn-active-light-primaryw-35px h-35px w-md-40px h-md-40px" data-kt-menu-trigger="{default:'click', sm: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                <span className="svg-icon theme-light-show svg-icon-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> {" "} <path d="M11.9905 5.62598C10.7293 5.62574 9.49646 5.9995 8.44775 6.69997C7.39903 7.40045 6.58159 8.39619 6.09881 9.56126C5.61603 10.7263 5.48958 12.0084 5.73547 13.2453C5.98135 14.4823 6.58852 15.6185 7.48019 16.5104C8.37186 17.4022 9.50798 18.0096 10.7449 18.2557C11.9818 18.5019 13.2639 18.3757 14.429 17.8931C15.5942 17.4106 16.5901 16.5933 17.2908 15.5448C17.9915 14.4962 18.3655 13.2634 18.3655 12.0023C18.3637 10.3119 17.6916 8.69129 16.4964 7.49593C15.3013 6.30056 13.6808 5.62806 11.9905 5.62598Z" fill="currentColor" /> <path d="M22.1258 10.8771H20.627C20.3286 10.8771 20.0424 10.9956 19.8314 11.2066C19.6204 11.4176 19.5018 11.7038 19.5018 12.0023C19.5018 12.3007 19.6204 12.5869 19.8314 12.7979C20.0424 13.0089 20.3286 13.1274 20.627 13.1274H22.1258C22.4242 13.1274 22.7104 13.0089 22.9214 12.7979C23.1324 12.5869 23.2509 12.3007 23.2509 12.0023C23.2509 11.7038 23.1324 11.4176 22.9214 11.2066C22.7104 10.9956 22.4242 10.8771 22.1258 10.8771Z" fill="currentColor" />{" "} <path d="M11.9905 19.4995C11.6923 19.5 11.4064 19.6187 11.1956 19.8296C10.9848 20.0405 10.8663 20.3265 10.866 20.6247V22.1249C10.866 22.4231 10.9845 22.7091 11.1953 22.9199C11.4062 23.1308 11.6922 23.2492 11.9904 23.2492C12.2886 23.2492 12.5746 23.1308 12.7854 22.9199C12.9963 22.7091 13.1147 22.4231 13.1147 22.1249V20.6247C13.1145 20.3265 12.996 20.0406 12.7853 19.8296C12.5745 19.6187 12.2887 19.5 11.9905 19.4995Z" fill="currentColor" /> <path d="M4.49743 12.0023C4.49718 11.704 4.37865 11.4181 4.16785 11.2072C3.95705 10.9962 3.67119 10.8775 3.37298 10.8771H1.87445C1.57603 10.8771 1.28984 10.9956 1.07883 11.2066C0.867812 11.4176 0.749266 11.7038 0.749266 12.0023C0.749266 12.3007 0.867812 12.5869 1.07883 12.7979C1.28984 13.0089 1.57603 13.1274 1.87445 13.1274H3.37299C3.6712 13.127 3.95706 13.0083 4.16785 12.7973C4.37865 12.5864 4.49718 12.3005 4.49743 12.0023Z" fill="currentColor" />{" "} <path d="M11.9905 4.50058C12.2887 4.50012 12.5745 4.38141 12.7853 4.17048C12.9961 3.95954 13.1147 3.67361 13.1149 3.3754V1.87521C13.1149 1.57701 12.9965 1.29103 12.7856 1.08017C12.5748 0.869313 12.2888 0.750854 11.9906 0.750854C11.6924 0.750854 11.4064 0.869313 11.1955 1.08017C10.9847 1.29103 10.8662 1.57701 10.8662 1.87521V3.3754C10.8664 3.67359 10.9849 3.95952 11.1957 4.17046C11.4065 4.3814 11.6923 4.50012 11.9905 4.50058Z" fill="currentColor" />{" "} <path d="M18.8857 6.6972L19.9465 5.63642C20.0512 5.53209 20.1343 5.40813 20.1911 5.27163C20.2479 5.13513 20.2772 4.98877 20.2774 4.84093C20.2775 4.69309 20.2485 4.54667 20.192 4.41006C20.1355 4.27344 20.0526 4.14932 19.948 4.04478C19.8435 3.94024 19.7194 3.85734 19.5828 3.80083C19.4462 3.74432 19.2997 3.71531 19.1519 3.71545C19.0041 3.7156 18.8577 3.7449 18.7212 3.80167C18.5847 3.85845 18.4607 3.94159 18.3564 4.04633L17.2956 5.10714C17.1909 5.21147 17.1077 5.33543 17.0509 5.47194C16.9942 5.60844 16.9649 5.7548 16.9647 5.90264C16.9646 6.05048 16.9936 6.19689 17.0501 6.33351C17.1066 6.47012 17.1895 6.59425 17.294 6.69878C17.3986 6.80332 17.5227 6.88621 17.6593 6.94272C17.7959 6.99923 17.9424 7.02824 18.0902 7.02809C18.238 7.02795 18.3844 6.99865 18.5209 6.94187C18.6574 6.88509 18.7814 6.80195 18.8857 6.6972Z" fill="currentColor" />{" "} <path d="M18.8855 17.3073C18.7812 17.2026 18.6572 17.1195 18.5207 17.0627C18.3843 17.006 18.2379 16.9767 18.0901 16.9766C17.9423 16.9764 17.7959 17.0055 17.6593 17.062C17.5227 17.1185 17.3986 17.2014 17.2941 17.3059C17.1895 17.4104 17.1067 17.5345 17.0501 17.6711C16.9936 17.8077 16.9646 17.9541 16.9648 18.1019C16.9649 18.2497 16.9942 18.3961 17.0509 18.5326C17.1077 18.6691 17.1908 18.793 17.2955 18.8974L18.3563 19.9582C18.4606 20.0629 18.5846 20.146 18.721 20.2027C18.8575 20.2595 19.0039 20.2887 19.1517 20.2889C19.2995 20.289 19.4459 20.26 19.5825 20.2035C19.7191 20.147 19.8432 20.0641 19.9477 19.9595C20.0523 19.855 20.1351 19.7309 20.1916 19.5943C20.2482 19.4577 20.2772 19.3113 20.277 19.1635C20.2769 19.0157 20.2476 18.8694 20.1909 18.7329C20.1341 18.5964 20.051 18.4724 19.9463 18.3681L18.8855 17.3073Z" fill="currentColor" />{" "} <path d="M5.09528 17.3072L4.0345 18.368C3.92972 18.4723 3.84655 18.5963 3.78974 18.7328C3.73294 18.8693 3.70362 19.0156 3.70346 19.1635C3.7033 19.3114 3.7323 19.4578 3.78881 19.5944C3.84532 19.7311 3.92822 19.8552 4.03277 19.9598C4.13732 20.0643 4.26147 20.1472 4.3981 20.2037C4.53473 20.2602 4.68117 20.2892 4.82902 20.2891C4.97688 20.2889 5.12325 20.2596 5.25976 20.2028C5.39627 20.146 5.52024 20.0628 5.62456 19.958L6.68536 18.8973C6.79007 18.7929 6.87318 18.6689 6.92993 18.5325C6.98667 18.396 7.01595 18.2496 7.01608 18.1018C7.01621 17.954 6.98719 17.8076 6.93068 17.671C6.87417 17.5344 6.79129 17.4103 6.68676 17.3058C6.58224 17.2012 6.45813 17.1183 6.32153 17.0618C6.18494 17.0053 6.03855 16.9763 5.89073 16.9764C5.74291 16.9766 5.59657 17.0058 5.46007 17.0626C5.32358 17.1193 5.19962 17.2024 5.09528 17.3072Z" fill="currentColor" />{" "} <path d="M5.09541 6.69715C5.19979 6.8017 5.32374 6.88466 5.4602 6.94128C5.59665 6.9979 5.74292 7.02708 5.89065 7.02714C6.03839 7.0272 6.18469 6.99815 6.32119 6.94164C6.45769 6.88514 6.58171 6.80228 6.68618 6.69782C6.79064 6.59336 6.87349 6.46933 6.93 6.33283C6.9865 6.19633 7.01556 6.05003 7.01549 5.9023C7.01543 5.75457 6.98625 5.60829 6.92963 5.47184C6.87301 5.33539 6.79005 5.21143 6.6855 5.10706L5.6247 4.04626C5.5204 3.94137 5.39643 3.8581 5.25989 3.80121C5.12335 3.74432 4.97692 3.71493 4.82901 3.71472C4.68109 3.71452 4.53458 3.7435 4.39789 3.80001C4.26119 3.85652 4.13699 3.93945 4.03239 4.04404C3.9278 4.14864 3.84487 4.27284 3.78836 4.40954C3.73185 4.54624 3.70287 4.69274 3.70308 4.84066C3.70329 4.98858 3.73268 5.135 3.78957 5.27154C3.84646 5.40808 3.92974 5.53205 4.03462 5.63635L5.09541 6.69715Z" fill="currentColor" />{" "} </svg>
                </span>
                <span className="svg-icon theme-dark-show svg-icon-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> {" "} <path d="M19.0647 5.43757C19.3421 5.43757 19.567 5.21271 19.567 4.93534C19.567 4.65796 19.3421 4.43311 19.0647 4.43311C18.7874 4.43311 18.5625 4.65796 18.5625 4.93534C18.5625 5.21271 18.7874 5.43757 19.0647 5.43757Z" fill="currentColor" /> <path d="M20.0692 9.48884C20.3466 9.48884 20.5714 9.26398 20.5714 8.98661C20.5714 8.70923 20.3466 8.48438 20.0692 8.48438C19.7918 8.48438 19.567 8.70923 19.567 8.98661C19.567 9.26398 19.7918 9.48884 20.0692 9.48884Z" fill="currentColor" />{" "} <path d="M12.0335 20.5714C15.6943 20.5714 18.9426 18.2053 20.1168 14.7338C20.1884 14.5225 20.1114 14.289 19.9284 14.161C19.746 14.034 19.5003 14.0418 19.3257 14.1821C18.2432 15.0546 16.9371 15.5156 15.5491 15.5156C12.2257 15.5156 9.48884 12.8122 9.48884 9.48886C9.48884 7.41079 10.5773 5.47137 12.3449 4.35752C12.5342 4.23832 12.6 4.00733 12.5377 3.79251C12.4759 3.57768 12.2571 3.42859 12.0335 3.42859C7.32556 3.42859 3.42857 7.29209 3.42857 12C3.42857 16.7079 7.32556 20.5714 12.0335 20.5714Z" fill="currentColor" />{" "} <path d="M13.0379 7.47998C13.8688 7.47998 14.5446 8.15585 14.5446 8.98668C14.5446 9.26428 14.7693 9.48891 15.0469 9.48891C15.3245 9.48891 15.5491 9.26428 15.5491 8.98668C15.5491 8.15585 16.225 7.47998 17.0558 7.47998C17.3334 7.47998 17.558 7.25535 17.558 6.97775C17.558 6.70015 17.3334 6.47552 17.0558 6.47552C16.225 6.47552 15.5491 5.76616 15.5491 4.93534C15.5491 4.65774 15.3245 4.43311 15.0469 4.43311C14.7693 4.43311 14.5446 4.65774 14.5446 4.93534C14.5446 5.76616 13.8688 6.47552 13.0379 6.47552C12.7603 6.47552 12.5357 6.70015 12.5357 6.97775C12.5357 7.25535 12.7603 7.47998 13.0379 7.47998Z" fill="currentColor" />{" "} </svg>
                </span>
              </Link>
              <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu">
                <div className="menu-item px-3 my-0">
                  <Link href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light">
                    <span className="menu-icon" data-kt-element="icon">
                      <span className="svg-icon svg-icon-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> {" "} <path d="M11.9905 5.62598C10.7293 5.62574 9.49646 5.9995 8.44775 6.69997C7.39903 7.40045 6.58159 8.39619 6.09881 9.56126C5.61603 10.7263 5.48958 12.0084 5.73547 13.2453C5.98135 14.4823 6.58852 15.6185 7.48019 16.5104C8.37186 17.4022 9.50798 18.0096 10.7449 18.2557C11.9818 18.5019 13.2639 18.3757 14.429 17.8931C15.5942 17.4106 16.5901 16.5933 17.2908 15.5448C17.9915 14.4962 18.3655 13.2634 18.3655 12.0023C18.3637 10.3119 17.6916 8.69129 16.4964 7.49593C15.3013 6.30056 13.6808 5.62806 11.9905 5.62598Z" fill="currentColor" />{" "} <path d="M22.1258 10.8771H20.627C20.3286 10.8771 20.0424 10.9956 19.8314 11.2066C19.6204 11.4176 19.5018 11.7038 19.5018 12.0023C19.5018 12.3007 19.6204 12.5869 19.8314 12.7979C20.0424 13.0089 20.3286 13.1274 20.627 13.1274H22.1258C22.4242 13.1274 22.7104 13.0089 22.9214 12.7979C23.1324 12.5869 23.2509 12.3007 23.2509 12.0023C23.2509 11.7038 23.1324 11.4176 22.9214 11.2066C22.7104 10.9956 22.4242 10.8771 22.1258 10.8771Z" fill="currentColor" /> <path d="M11.9905 19.4995C11.6923 19.5 11.4064 19.6187 11.1956 19.8296C10.9848 20.0405 10.8663 20.3265 10.866 20.6247V22.1249C10.866 22.4231 10.9845 22.7091 11.1953 22.9199C11.4062 23.1308 11.6922 23.2492 11.9904 23.2492C12.2886 23.2492 12.5746 23.1308 12.7854 22.9199C12.9963 22.7091 13.1147 22.4231 13.1147 22.1249V20.6247C13.1145 20.3265 12.996 20.0406 12.7853 19.8296C12.5745 19.6187 12.2887 19.5 11.9905 19.4995Z" fill="currentColor" />{" "} <path d="M4.49743 12.0023C4.49718 11.704 4.37865 11.4181 4.16785 11.2072C3.95705 10.9962 3.67119 10.8775 3.37298 10.8771H1.87445C1.57603 10.8771 1.28984 10.9956 1.07883 11.2066C0.867812 11.4176 0.749266 11.7038 0.749266 12.0023C0.749266 12.3007 0.867812 12.5869 1.07883 12.7979C1.28984 13.0089 1.57603 13.1274 1.87445 13.1274H3.37299C3.6712 13.127 3.95706 13.0083 4.16785 12.7973C4.37865 12.5864 4.49718 12.3005 4.49743 12.0023Z" fill="currentColor" /> <path d="M11.9905 4.50058C12.2887 4.50012 12.5745 4.38141 12.7853 4.17048C12.9961 3.95954 13.1147 3.67361 13.1149 3.3754V1.87521C13.1149 1.57701 12.9965 1.29103 12.7856 1.08017C12.5748 0.869313 12.2888 0.750854 11.9906 0.750854C11.6924 0.750854 11.4064 0.869313 11.1955 1.08017C10.9847 1.29103 10.8662 1.57701 10.8662 1.87521V3.3754C10.8664 3.67359 10.9849 3.95952 11.1957 4.17046C11.4065 4.3814 11.6923 4.50012 11.9905 4.50058Z" fill="currentColor" />{" "} <path d="M18.8857 6.6972L19.9465 5.63642C20.0512 5.53209 20.1343 5.40813 20.1911 5.27163C20.2479 5.13513 20.2772 4.98877 20.2774 4.84093C20.2775 4.69309 20.2485 4.54667 20.192 4.41006C20.1355 4.27344 20.0526 4.14932 19.948 4.04478C19.8435 3.94024 19.7194 3.85734 19.5828 3.80083C19.4462 3.74432 19.2997 3.71531 19.1519 3.71545C19.0041 3.7156 18.8577 3.7449 18.7212 3.80167C18.5847 3.85845 18.4607 3.94159 18.3564 4.04633L17.2956 5.10714C17.1909 5.21147 17.1077 5.33543 17.0509 5.47194C16.9942 5.60844 16.9649 5.7548 16.9647 5.90264C16.9646 6.05048 16.9936 6.19689 17.0501 6.33351C17.1066 6.47012 17.1895 6.59425 17.294 6.69878C17.3986 6.80332 17.5227 6.88621 17.6593 6.94272C17.7959 6.99923 17.9424 7.02824 18.0902 7.02809C18.238 7.02795 18.3844 6.99865 18.5209 6.94187C18.6574 6.88509 18.7814 6.80195 18.8857 6.6972Z" fill="currentColor" />{" "} <path d="M18.8855 17.3073C18.7812 17.2026 18.6572 17.1195 18.5207 17.0627C18.3843 17.006 18.2379 16.9767 18.0901 16.9766C17.9423 16.9764 17.7959 17.0055 17.6593 17.062C17.5227 17.1185 17.3986 17.2014 17.2941 17.3059C17.1895 17.4104 17.1067 17.5345 17.0501 17.6711C16.9936 17.8077 16.9646 17.9541 16.9648 18.1019C16.9649 18.2497 16.9942 18.3961 17.0509 18.5326C17.1077 18.6691 17.1908 18.793 17.2955 18.8974L18.3563 19.9582C18.4606 20.0629 18.5846 20.146 18.721 20.2027C18.8575 20.2595 19.0039 20.2887 19.1517 20.2889C19.2995 20.289 19.4459 20.26 19.5825 20.2035C19.7191 20.147 19.8432 20.0641 19.9477 19.9595C20.0523 19.855 20.1351 19.7309 20.1916 19.5943C20.2482 19.4577 20.2772 19.3113 20.277 19.1635C20.2769 19.0157 20.2476 18.8694 20.1909 18.7329C20.1341 18.5964 20.051 18.4724 19.9463 18.3681L18.8855 17.3073Z" fill="currentColor" />{" "} <path d="M5.09528 17.3072L4.0345 18.368C3.92972 18.4723 3.84655 18.5963 3.78974 18.7328C3.73294 18.8693 3.70362 19.0156 3.70346 19.1635C3.7033 19.3114 3.7323 19.4578 3.78881 19.5944C3.84532 19.7311 3.92822 19.8552 4.03277 19.9598C4.13732 20.0643 4.26147 20.1472 4.3981 20.2037C4.53473 20.2602 4.68117 20.2892 4.82902 20.2891C4.97688 20.2889 5.12325 20.2596 5.25976 20.2028C5.39627 20.146 5.52024 20.0628 5.62456 19.958L6.68536 18.8973C6.79007 18.7929 6.87318 18.6689 6.92993 18.5325C6.98667 18.396 7.01595 18.2496 7.01608 18.1018C7.01621 17.954 6.98719 17.8076 6.93068 17.671C6.87417 17.5344 6.79129 17.4103 6.68676 17.3058C6.58224 17.2012 6.45813 17.1183 6.32153 17.0618C6.18494 17.0053 6.03855 16.9763 5.89073 16.9764C5.74291 16.9766 5.59657 17.0058 5.46007 17.0626C5.32358 17.1193 5.19962 17.2024 5.09528 17.3072Z" fill="currentColor" />{" "} <path d="M5.09541 6.69715C5.19979 6.8017 5.32374 6.88466 5.4602 6.94128C5.59665 6.9979 5.74292 7.02708 5.89065 7.02714C6.03839 7.0272 6.18469 6.99815 6.32119 6.94164C6.45769 6.88514 6.58171 6.80228 6.68618 6.69782C6.79064 6.59336 6.87349 6.46933 6.93 6.33283C6.9865 6.19633 7.01556 6.05003 7.01549 5.9023C7.01543 5.75457 6.98625 5.60829 6.92963 5.47184C6.87301 5.33539 6.79005 5.21143 6.6855 5.10706L5.6247 4.04626C5.5204 3.94137 5.39643 3.8581 5.25989 3.80121C5.12335 3.74432 4.97692 3.71493 4.82901 3.71472C4.68109 3.71452 4.53458 3.7435 4.39789 3.80001C4.26119 3.85652 4.13699 3.93945 4.03239 4.04404C3.9278 4.14864 3.84487 4.27284 3.78836 4.40954C3.73185 4.54624 3.70287 4.69274 3.70308 4.84066C3.70329 4.98858 3.73268 5.135 3.78957 5.27154C3.84646 5.40808 3.92974 5.53205 4.03462 5.63635L5.09541 6.69715Z" fill="currentColor" />{" "} </svg>
                      </span>
                    </span>
                    <span className="menu-title">Light</span>
                  </Link>
                </div>
                <div className="menu-item px-3 my-0">
                  <Link href="#" className="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark">
                    <span className="menu-icon" data-kt-element="icon">
                      <span className="svg-icon svg-icon-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> {" "} <path d="M19.0647 5.43757C19.3421 5.43757 19.567 5.21271 19.567 4.93534C19.567 4.65796 19.3421 4.43311 19.0647 4.43311C18.7874 4.43311 18.5625 4.65796 18.5625 4.93534C18.5625 5.21271 18.7874 5.43757 19.0647 5.43757Z" fill="currentColor" /> <path d="M20.0692 9.48884C20.3466 9.48884 20.5714 9.26398 20.5714 8.98661C20.5714 8.70923 20.3466 8.48438 20.0692 8.48438C19.7918 8.48438 19.567 8.70923 19.567 8.98661C19.567 9.26398 19.7918 9.48884 20.0692 9.48884Z" fill="currentColor" />{" "} <path d="M12.0335 20.5714C15.6943 20.5714 18.9426 18.2053 20.1168 14.7338C20.1884 14.5225 20.1114 14.289 19.9284 14.161C19.746 14.034 19.5003 14.0418 19.3257 14.1821C18.2432 15.0546 16.9371 15.5156 15.5491 15.5156C12.2257 15.5156 9.48884 12.8122 9.48884 9.48886C9.48884 7.41079 10.5773 5.47137 12.3449 4.35752C12.5342 4.23832 12.6 4.00733 12.5377 3.79251C12.4759 3.57768 12.2571 3.42859 12.0335 3.42859C7.32556 3.42859 3.42857 7.29209 3.42857 12C3.42857 16.7079 7.32556 20.5714 12.0335 20.5714Z" fill="currentColor" />{" "} <path d="M13.0379 7.47998C13.8688 7.47998 14.5446 8.15585 14.5446 8.98668C14.5446 9.26428 14.7693 9.48891 15.0469 9.48891C15.3245 9.48891 15.5491 9.26428 15.5491 8.98668C15.5491 8.15585 16.225 7.47998 17.0558 7.47998C17.3334 7.47998 17.558 7.25535 17.558 6.97775C17.558 6.70015 17.3334 6.47552 17.0558 6.47552C16.225 6.47552 15.5491 5.76616 15.5491 4.93534C15.5491 4.65774 15.3245 4.43311 15.0469 4.43311C14.7693 4.43311 14.5446 4.65774 14.5446 4.93534C14.5446 5.76616 13.8688 6.47552 13.0379 6.47552C12.7603 6.47552 12.5357 6.70015 12.5357 6.97775C12.5357 7.25535 12.7603 7.47998 13.0379 7.47998Z" fill="currentColor" />{" "} </svg>
                      </span>
                    </span>
                    <span className="menu-title">Dark</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ms-2 ms-lg-3" id="kt_header_user_menu_toggle">
              <div className="cursor-pointer symbol symbol-circle symbol-35px symbol-md-40px" data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                <img id="userAvatar" alt="Pic" src={authContext.imageUrl ?? `../assets/media/avatars/300-${imageIdGenerate(profileData?.data?.id ?? "1")}.jpg`} />
              </div>
              <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                <div className="menu-item px-3">
                  <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                      <img id="userAvatar2" alt="Logo" src={authContext.imageUrl ?? `../assets/media/avatars/300-${imageIdGenerate(profileData?.data?.id ?? "1")}.jpg`} style={{ borderRadius: "100%" }} />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="fw-bold d-flex align-items-center fs-5 header-user-name">{activeAccount?.idTokenClaims?.name}</div>
                      <a href="/" className="fw-semibold text-muted text-hover-primary fs-7 header-user-email" data-bs-toggle="tooltip" title={activeAccount?.idTokenClaims?.preferred_username}>
                        {activeAccount?.idTokenClaims?.preferred_username}
                      </a>
                      <small className="text-muted">{decryptRole ?? ""}</small>
                    </div>
                  </div>
                </div>
                <div className="separator my-2"></div>
                <div className="menu-item px-5">
                  <Link to="/profile" className="menu-link px-5">
                    Profile & Attendance
                  </Link>
                </div>
                <div className="menu-item px-5">
                  <Link to="/" onClick={(event) => handleLogout(event)} className="menu-link px-5">
                    <span className="menu-text">Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(tokenReplaced && (<Modal className="welcome-popup" style={{ marginTop: "4rem" }} show={show}>
        {data != null && data !== undefined && <CoderAttendancePop profileData={data} showTable={showtable} markIsAttending={markIsAttending} handleClose={handleClose} />}
      </Modal>))}
      </div>
    </>
  );
};
export default Header;
