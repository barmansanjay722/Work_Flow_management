import crypto from "crypto-js";

const decrypt = (value)=> {
    return crypto.AES.decrypt(value, process.env.REACT_APP_SECRET_PASS).toString(crypto.enc.Utf8)
}

export default decrypt;