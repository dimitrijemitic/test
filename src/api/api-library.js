import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class ApiLibrary {
    static GET(endpoint, headers) {
        return axios.get(`${API_ENDPOINT}/${endpoint}`, { headers: headers || this.Authorization() });
    }

    static POST(endpoint, options, headers) {
        return axios.post(`${API_ENDPOINT}/${endpoint}`, options, { headers: headers || this.Authorization(), });
    }

    static Authorization() {
        return {
            authorization: localStorage.getItem("jwt") ? `${localStorage.getItem("jwt")}` : ''
        };
    }
}


export default ApiLibrary;
