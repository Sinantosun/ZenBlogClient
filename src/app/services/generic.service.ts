import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/Other/result-model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private baseAPIURL: string = "https://localhost:7000/api/";
  constructor(private httpClient: HttpClient) { }

  Get<T>(endpoint: string) {
    return this.httpClient.get<Result<T>>(`${this.baseAPIURL}${endpoint}`);
  }

  Post<T>(endpoint: string, data: T) {
    return this.httpClient.post<Result<T>>(`${this.baseAPIURL}${endpoint}`, data);
  }

  Put<T>(endpoint: string, data: T) {
    return this.httpClient.put<Result<T>>(`${this.baseAPIURL}${endpoint}`, data);
  }

   Delete(endpoint: string) {
    return this.httpClient.delete(`${this.baseAPIURL}${endpoint}`);
  }
}
