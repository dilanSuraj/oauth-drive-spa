
let token = window.localStorage.getItem("drivetoken");

const BACKEND_API = "http://localhost:5000/";
const DEFAULT_HEADER_INFO = {
    "Content-Type":"application/json"
}
const API_HEADER_INFO = {
    "token": token,
    "Content-Type":"application/json"
}
const FILE_HEADER_INFO = {
    "token": token,
    "content-type": "multipart/form-data",
}
const FILE_ENDPOINT = "files";
const URL_ENDPOINT = "url";
const TOKEN_ENDPOINT = "token";

export default  {
    BACKEND_API,
    API_HEADER_INFO,
    FILE_HEADER_INFO,
    FILE_ENDPOINT,
    URL_ENDPOINT,
    TOKEN_ENDPOINT,
    DEFAULT_HEADER_INFO
}