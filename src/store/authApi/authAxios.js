import axios from 'axios';

const authAPI = axios.create({
  // baseURL: 'http://localhost:8080/api/1.0/',
  baseURL: 'https://welness-z-server.vercel.app/api/1.0/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



authAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the request failed due to expired accessToken
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await authAPI.post(
          '/user/refresh',
          {},
          { withCredentials: true } 
        );
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login'
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authAPI;

// const useAuthAPI = () => {
//   // const { accessToken, setAccessToken } = useAuth();

//   const authAPI = axios.create({
//     baseURL: 'http://localhost:8080/api/1.0/',
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Request interceptor
//   authAPI.interceptors.request.use(
//     (config) => {
//       const accessTokenss = localStorage.getItem('accessToken');
//       if (accessTokenss) {
//         config.headers.Authorization = `Bearer ${accessTokenss}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response interceptor
//   authAPI.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response && error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           const response = await axios.post(
//             'http://localhost:8080/api/1.0/user/refresh',
//             {},
//             { withCredentials: true }
//           );
//           // const newAccessToken = response.data.accessToken;
//           // setAccessToken(newAccessToken);
//           // const { accessToken } = response.data;
//           localStorage.setItem('accessToken', response.data);

//           originalRequest.headers.Authorization = `Bearer ${response.data}`;
//           return authAPI(originalRequest);
//         } catch (refreshError) {
//           console.error('Token refresh failed:', refreshError);
//           window.location.href = '/login';
//           return Promise.reject(refreshError);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return authAPI;
// };

// export default useAuthAPI;