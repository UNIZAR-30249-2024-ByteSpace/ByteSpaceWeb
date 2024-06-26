import axios, { AxiosInstance } from 'axios';

export const baseUrl = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3001';

class AxiosSingleton {
  private static instance: AxiosInstance;

  //private constructor() {}

  public static getInstance(): AxiosInstance {
    if (undefined === AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({
        baseURL: baseUrl,
        // configuración de axios
      });
    }
    return AxiosSingleton.instance;
  }
}

export default AxiosSingleton.getInstance();