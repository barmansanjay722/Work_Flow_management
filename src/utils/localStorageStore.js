import encrypt from "./encrypt";
import decrypt from "./decrypt";

const localStorageStore = {}

localStorageStore.getToken = () => {
    return localStorage.token??'';
}

localStorageStore.setToken = (token) => {
    localStorage.setItem("token",token);
}

localStorageStore.setRole = (role) => {
    const encryptRole = encrypt(role);
    localStorage.setItem("Role",encryptRole);
}

localStorageStore.getRole = () => {
    const decryptRole = decrypt(localStorage.Role??'');
    return decryptRole;
}
localStorageStore.getAttending = () => {
    return localStorage.attending??'';
}
localStorageStore.setAttending = (value) => {
    localStorage.setItem("attending",value);
}
localStorageStore.setDefaultTemplate = (value) => {
    localStorage.setItem("template",value);
}
localStorageStore.getDefaultTemplate = (value) => {
   return localStorage.getItem("template")??'';
}

localStorageStore.resetDefaultTemplate = () => {
    localStorage.removeItem("template")
}




export default localStorageStore;