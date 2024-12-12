import axios from 'axios';
import { TMDB_TOKEN_KEY } from '@env';


interface ApiResponse<T> {
      data: T;
      message: string;
      status: number;
      extra?: string;
}

const api_version = '3';

const api = axios.create({
      baseURL: `https://api.themoviedb.org/${api_version}`,
      timeout: 30000,
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${TMDB_TOKEN_KEY}`
      },
      transformRequest: formData => formData,
});

const errorHandling = (error: any) => {
      return {
            data: error?.data,
            message: error?.message,
            status: error?.status,
      };
};

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
      const newData = {
            ...data,
            include_adult: false,
      };
      return api.post(url, newData).then((response) => {
            return {
                  data: response?.data,
                  message: response?.statusText,
                  status: response?.status,
            } as ApiResponse<T>;
      })
      .catch(error => {
            return errorHandling(error) as ApiResponse<T>;
      });
};

const get = async <T>(url: string, data = {}) => {
      const newData = {
            ...data,
            include_adult: false,
      };
      return api.get(api.getUri() + url, {params: newData}).then((response) => {
            return {
                  data: response?.data,
                  message: response?.statusText,
                  status: response?.status,
            } as ApiResponse<T>;
      })
      .catch(error => {
            return errorHandling(error) as ApiResponse<T>;
      });
};

export {
      post,
      get,
};
