import axios from 'axios'

const apiURL = 'http://localhost:5000/';

export const loginUser = async (username, password) => {
    try {
        const loginDto = {
            username : username,
            password: password
        }
        const {data} = await axios.post(apiURL + 'login', loginDto);
        return data.jwt;        
    } catch (error) {
        throw error;
    }
}

export const registerUser = async (username, password, roles, enabled) => {
    try {
        const registerDto = {
            username : username,
            password: password,
            roles: roles,
            enabled: enabled
        }
        await axios.post(apiURL + 'register', registerDto);
    } catch (error) {
        throw error;
    }
}

export const uploadFile = async (data, options) => {
    try {
        await axios.post(apiURL + 'uploadFile', data, options);                
    } catch (error) {
        throw error;
    }
}

// post auth is pass as third parameter
export const uploadFiles = async (data, options) => {
    try {
        await axios.post(apiURL + 'uploadFiles', data, options);                
    } catch (error) {
        throw error;
    }
}

// get auth is pass as second parameter
export const getPosts = async (auth) => {
    try {
        const response = await axios.get(apiURL + 'posts', auth);          
        return response;      
    } catch (error) {
        throw error;
    }
}