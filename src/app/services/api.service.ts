import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://185.182.185.45:5000';

  constructor(private http: HttpClient) {}

  fetchMetrics(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/metrics?page=${page}&page_size=${pageSize}`
    );
  }

  uploadModel(modelFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('model', modelFile);

    return this.http.post(`${this.baseUrl}/test_model`, formData);
  }
}
