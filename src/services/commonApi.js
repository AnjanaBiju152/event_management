// commonApi.js
import axios from "axios";

export const commonApi = async (httpRequest, url, reqBody, reqHeader) => {
  const token = sessionStorage.getItem('token');
  
  const reqConfig = {
    method: httpRequest,
    url: url,
    data: reqBody,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...reqHeader
    }
  };

  try {
    const result = await axios(reqConfig);
    return result;
  } catch (err) {
    console.error('API request failed:', err.message);
    if (err.response?.status === 401) {
      // Handle token expiration or invalid token
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return {
      error: err,
      data: { message: err.message || 'Network or server error' },
      status: err.response?.status || 500,
    };
  }
};