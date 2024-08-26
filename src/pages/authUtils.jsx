import  { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};


export const extractUserIdFromToken = async (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Adjusted to match backend key
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    console.log(jwtDecode(token)); // Log decoded token for debugging
  } catch (error) {
    console.error('Error decoding token:', error);
  }

  
};
