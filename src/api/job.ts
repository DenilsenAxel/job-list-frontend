import axios from "axios";
import { IResponse } from "../interfaces";

export const getJobs = async (
  description: string,
  location: string,
  isFulltime: boolean,
  page: number,
  token: string
) => {
  try {
    let url = `${process.env.REACT_APP_API_PATH}/job?`;
    if (description) {
      url += `description=${description}&`;
    }
    if (location) {
      url += `location=${location}&`;
    }
    if (isFulltime) {
      url += `full_time=true&`;
    }
    if (page) {
      url += `page=${page}&`;
    }
    const { data } = await axios.get<IResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getAllJobs = async (description: string, location: string, isFulltime: boolean, token: string) => {
  try {
    let url = `${process.env.REACT_APP_API_PATH}/job?`;
    if (description) {
      url += `description=${description}&`;
    }
    if (location) {
      url += `location=${location}&`;
    }
    if (isFulltime) {
      url += `full_time=true&`;
    }
    const { data } = await axios.get<IResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getJobDetail = async (id: string, token: string) => {
  try {
    const { data } = await axios.get<IResponse>(`${process.env.REACT_APP_API_PATH}/job/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
