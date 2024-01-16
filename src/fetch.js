/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const callApiWithToken = async (accessToken, apiEndpoint) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const callMSPhotoApiWithToken = async (accessToken, apiEndpoint) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(apiEndpoint, options)
    .then((response) => {
      if (response.ok) {
        if (response.status === 404) {
          // Handle 404 as a failure
          throw new Error("Photo not found (HTTP 404)");
        } else {
          return response.blob();
        }
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    })
    .then((stream) => new Response(stream))
    .then((response) => response.blob())
    // .then((blob) => {URL.createObjectURL(blob)})
    
    .catch((err) => console.error(err));;
};

export const callApiToLogin = () => {
  return fetch("/auth/login")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const callApiToLogout = () => {
  return fetch("/auth/logout")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const callApiToGetSpaCode = () => {
  return fetch("/auth/fetchCode")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
