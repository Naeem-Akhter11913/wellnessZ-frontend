import axios from 'axios';

const authAPI = axios.create({
  baseURL: 'http://localhost:8080/api/1.0/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authAPI;