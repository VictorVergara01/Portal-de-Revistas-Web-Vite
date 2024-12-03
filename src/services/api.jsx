import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchRevistas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/revistas/`);
    console.log('Datos recibidos del API:', response.data); // Inspecciona los datos
    return response.data; // Devuelve directamente los datos
  } catch (error) {
    console.error('Error al obtener revistas:', error);
    throw error;
  }
};
