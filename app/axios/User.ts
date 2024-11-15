import {baseConfig as api, axios, AxiosError} from "./baseConfig";
export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  registrationNumber?: string;
  courses?: string[];
  role?: string;
  // Add other user properties here
}

export const getUser = async (id: string): Promise<IUser> => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data as IUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

interface ApiResponse {
  success: boolean;
  data?: {
    [key: string]: string;
  };
  message?: string;
  details?: unknown;
}

export const createUser = async (userData: IUser): Promise<ApiResponse> => {
  try {
    const response = await api.post("/users/signup", userData);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: unknown | { message: string }) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error('Server Error:', axiosError.response.data);
        return { success: false, message: 'Server error occurred', details: axiosError.response.data };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('Network Error:', axiosError.request);
        return { success: false, message: 'Network error occurred. Please check your connection.' };
      } else {
        // Something else happened in setting up the request
        console.error('Error:', axiosError.message);
        return { success: false, message: 'An error occurred: ' + axiosError.message };
      }
    } else {
      // Non-Axios error handling
      console.error('Unexpected Error:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data as { message: string };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
export const loginUser = async (data: {
  registrationNumber: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const response = await api.post("/users/login", data);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error('Server Error:', axiosError.response.data);
        return { success: false, message: 'Server error occurred', details: axiosError.response.data };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('Network Error:', axiosError.request);
        return { success: false, message: 'Network error occurred. Please check your connection.' };
      } else {
        // Something else happened in setting up the request
        console.error('Error:', axiosError.message);
        return { success: false, message: 'An error occurred: ' + axiosError.message };
      }
    } else {
      // Non-Axios error handling
      console.error('Unexpected Error:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
};
export const updateUser = async (data: IUser, id: string): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/users/${id}`, data);
    console.log(response.data);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error('Server Error:', axiosError.response.data);
        return { success: false, message: 'Server error occurred', details: axiosError.response.data };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('Network Error:', axiosError.request);
        return { success: false, message: 'Network error occurred. Please check your connection.' };
      } else {
        // Something else happened in setting up the request
        console.error('Error:', axiosError.message);
        return { success: false, message: 'An error occurred: ' + axiosError.message };
      }
    } else {
      // Non-Axios error handling
      console.error('Unexpected Error:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
};