import axios from 'axios';

const baseURL = 'http://localhost:8083/api';
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error+"ERR");
    }
);

const UserData = (email) => axiosInstance.get(`/users/email/${email}`);
const UpdateUserByID = (id, data) => axiosInstance.put(`/users/update/${id}`, data)
const DeleteUserByID = (id) => axiosInstance.delete(`/users/delete/${id}`)
const CreateUser = (name,email,phone,address,password)=>axiosInstance.post(`/user/add`,{name, email, phone, address, password});
//Admin
const getAllUsers = () => axiosInstance.get('/users/all')

export { axiosInstance,CreateUser, UserData, UpdateUserByID, getAllUsers, DeleteUserByID }
