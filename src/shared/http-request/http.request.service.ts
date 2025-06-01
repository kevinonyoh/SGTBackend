import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class HttpRequestService {
    private readonly instance: AxiosInstance;

    constructor() {
      this.instance = axios.create({
        baseURL: process.env.AFM_MAIL_BASE_URL,
        headers: {
          terminalId: process.env.TERMINAL_ID
        },
        proxy: false
      });

      this.initializeRequestInterceptor();
  
      this.initializeResponseInterceptor();
    }

    send(data) {
        return this.instance(data);
    }
  
    private initializeRequestInterceptor() {
      this.instance.interceptors.request.use(
        this.handleRequest,
        this.handleError
      );
    };
    
    private initializeResponseInterceptor() {
      this.instance.interceptors.response.use(
        this.handleResponse,
        this.handleError
      );
    };
  
    private handleRequest = request => request;
    
    private handleResponse = ({ data }: AxiosResponse) => data;
  
    private handleError = (error: any) => Promise.reject(error);
}
