import { baseConfig as api, axios, AxiosError } from "./baseConfig";

export interface IPayment {
    _id?: string;
    userId?: string;
    courseId: string;
    amount: number;
    paymentDate: string;
    status: string;
    email: string;
    callback_url: string;
    // Add other payment properties here
}

export const getPayment = async (id: string): Promise<IPayment> => {
    try {
        const response = await api.get(`/payment/${id}`);
        return response.data as IPayment;
    } catch (error) {
        console.error("Error fetching payment:", error);
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

export const initializePayment = async (paymentData: IPayment): Promise<ApiResponse> => {
    try {
        const response = await api.post("/payment/initialize", paymentData);
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

export const verifyTransaction = async (reference: string): Promise<ApiResponse> => {
    try {
        const response = await api.get(`/payment/verify/${reference}`);
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


export const updatePayment = async (
    id: string,
    paymentData: IPayment
): Promise<ApiResponse> => {
    try {
        const response = await api.put(`/payment/${id}`, paymentData);
        return response.data;
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

export const deletePayment = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/payment/${id}`);
        return response.data as { message: string };
    } catch (error) {
        console.error("Error deleting payment:", error);
        throw error;
    }
};

export const getAllPayments = async (): Promise<IPayment[]> => {
    try {
        const response = await api.get("/payments");
        return response.data.data as IPayment[];
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
};