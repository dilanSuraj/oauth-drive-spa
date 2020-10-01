import React from 'react';

class Auth{

    login = (token) => {
        window.localStorage.setItem("drivetoken", JSON.stringify(token));
    }

    logout = (callback) => {
        window.localStorage.setItem("drivetoken", null);
        callback();
    }

    checkAuthenticated = () => {
        let token = JSON.stringify(window.localStorage.getItem("drivetoken"));
        if(token.length > 10){
            return true;
        }
        return false;
    }

}

export default new Auth();
