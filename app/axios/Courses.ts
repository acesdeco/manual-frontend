import { baseConfig as api, axios, AxiosError } from "./baseConfig";

export interface ICourse {
  _id?: string;
  title: string;
  code: string;
  description: string;
  instructor: {
    name: string;
    id: string;
  };
  courseImage: string;
  coursePrice: number;
  introduction: {
    video: string;
    notes: string;
  };
  weeks: {
    [key: string]: {
      video: string;
      assessments: string;
      notes: string;
      topic: string;
    };
  };
  published: boolean;
  // Add more weeks as needed
}

export const getCourse = async (id: string): Promise<ICourse> => {
  try {
    const response = await api.get(`/course/${id}`);
    return response.data.data as ICourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

interface ApiResponse {
  success: boolean;
  data?: ICourse[];
  message?: string;
  details?: unknown;
}

export const createCourse = async (
  courseData: ICourse
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/courses", courseData);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: unknown | { message: string }) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const updateCourse = async (
  id: string,
  courseData: ICourse
): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/course/${id}`, courseData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const deleteCourse = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/course/${id}`);
    return response.data as { message: string };
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
export const getAllCourses = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get("/course");
    return {
      success: true,
      data: response.data.data as ICourse[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const getCoursesByUserId = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/users/courses/${id}`);
    const allCourse = await getAllCourses();
    if (response.status === 200 && allCourse.success) {
      const userCourses = response.data.data as string[];
      const filteredCourses = allCourse.data
        ? allCourse.data.filter((course) =>
            userCourses.some((userCourse) => userCourse === course._id)
          )
        : [];
      return {
        success: true,
        data: filteredCourses,
      };
    }
    return {
      success: true,
      data: response.data.data as ICourse[],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The server responded with a status code that falls outside the 2xx range
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        // Something else happened in setting up the request
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      // Non-Axios error handling
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};
