import { baseConfig as api, axios, AxiosError } from "./baseConfig";

export interface IAssessment {
  _id: string;
  title: string;
  description: string;
  courseId: string;
  week_id: string;
  created_by: string;
  questions: {
    id: string | number;
    question_text: string;
    question_type: string;
    options: {
      option_text: string;
      is_correct: boolean;
    }[];
  }[];
  dueDate: string;
  startTime: string;
  endTime: string;
}

interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
  details?: unknown;
}

export const getAssessment = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/assessment/${id}`);
    return {
      success: true,
      data: response.data.data as IAssessment,
    };
  } catch (error) {
    console.error("Error fetching assessment:", error);
    throw error;
  }
};

export const getAssessmentByWeek = async (
  weekId: string
): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/assessment/week/${weekId}`);
    return {
      success: true,
      data: response.data.data as IAssessment,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};

export const submitAssessment = async (
  assessment: IAssessment
): Promise<ApiResponse> => {
  try {
    const response = await api.post(`/assessment/submit`, assessment);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Server Error:", axiosError.response.data);
        return {
          success: false,
          message: "Server error occurred",
          details: axiosError.response.data,
        };
      } else if (axiosError.request) {
        console.error("Network Error:", axiosError.request);
        return {
          success: false,
          message: "Network error occurred. Please check your connection.",
        };
      } else {
        console.error("Error:", axiosError.message);
        return {
          success: false,
          message: "An error occurred: " + axiosError.message,
        };
      }
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};
