import crypto from "crypto-js";

const encrypt =(value) => {
    return crypto.AES.encrypt(value, process.env.REACT_APP_SECRET_PASS).toString();
}

export default encrypt;