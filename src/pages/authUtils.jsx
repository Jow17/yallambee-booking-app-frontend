import * as jwtDecode from 'jwt-decode';

export const extractUserIdFromToken = async (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId; // Adjust based on the actual key used in the token
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

export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  