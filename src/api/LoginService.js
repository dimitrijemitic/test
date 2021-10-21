import jwt_decode from "jwt-decode";
import ApiService from './api-library';

class LoginService {
    static login(data) {
        return ApiService.POST('login', { ...data });
    }

    static getUser() {
        return ApiService.GET('user');
    }

    static storeUserToken(token) {
        if (token) localStorage.setItem('jwt', token);
    }

    static getLocalstorageItem(itemName) {
        return JSON.parse(localStorage.getItem(itemName));
    }

    static getToken(decodedToken = false) {
        return decodedToken ? jwt_decode(localStorage.getItem('jwt')) : localStorage.getItem('jwt')
    }

    static logOutUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
    }

    static checkLoggedUserToken() {
        return !!this.getToken();
    }
}

export default LoginService;
