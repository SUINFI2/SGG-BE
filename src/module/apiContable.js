// api.js
const axios= require('axios');
const urlContable=process.env.BASE_URL_CONTABLE
// Configurar la instancia de axios con los parámetros necesarios
const api = axios.create({
  baseURL: urlContable, // Reemplaza con la URL base de tu API
  timeout: 3000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    // Agrega cualquier otro encabezado necesario
  }
});

// Interceptores de solicitudes
api.interceptors.request.use(
  (config) => {
    // Puedes agregar lógica antes de que se envíe la solicitud, como agregar un token de autenticación
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptores de respuestas
api.interceptors.response.use(
  (response) => {
    // Puedes manejar la respuesta antes de que sea devuelta
   
    return response;
  },
  (error) => {
     // Manejar errores de respuesta aquí
    // Puedes agregar lógica adicional, por ejemplo, mostrar una notificación o redirigir al usuario
    console.error('API call error:', error.message);
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error('No response received:', error.request);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

module.exports= api;
