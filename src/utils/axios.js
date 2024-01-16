import * as coreAxios from "axios";
import localStorageStore from "./localStorageStore";

const baseUrl = process.env.REACT_APP_API_HOST;

export const axios = coreAxios.default.create({

    baseURL: baseUrl,

});

export const axiosInterceptor = () => {

    axios.interceptors.request.use(async (request) => {

        const authToken = localStorageStore.getToken();

        if (authToken) {

            request["headers"]["Authorization"] = `Bearer ${authToken}`;

        }
        request["headers"]["Content-Type"] = `application/json`;
        request['mode'] = "cors";

        return request;

    });

    //response interceptors

    axios.interceptors.response.use(

        async (response) => {

            if (!response.data) {
                return response;
            }

            return response.data;

        },

        (error) => {

            const { response } = error;

            let toastMessage = `Something went wrong! Please contact support team`;

            if (response) {

                const { status, data } = response;

                if(status === 401) {
                    toastMessage = data.message === 'Unauthorized' ? 'Session expired!' : data.message;
                    window.toastr.error(toastMessage)
                    setTimeout(() => { if(window.location.pathname !== "/login") { localStorage.removeItem("token"); window.location.pathname="/login" } }, 2000);
                }

            }

            return Promise.reject(error);

        }

    );

};

axiosInterceptor();