import api from './baseConfig';
export interface IUser {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    // Add other user properties here
}

export const getUser = async (id: string): Promise<IUser> => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data as IUser;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const createUser = async (userData: IUser): Promise<IUser> => {
    try {
        const response = await api.post('/users/signup', userData);
        return response.data as IUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id: string, userData: IUser): Promise<IUser> => {
    try {
        const response = await api.put(`/user/${id}`, userData);
        return response.data as IUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/user/${id}`);
        return response.data as { message: string };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
export const loginUser = async (data: {email: string, password: string}): Promise<{ token: string }> => {
    try {
        const response = await api.post('/users/login', data);
        return response.data as { token: string };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};