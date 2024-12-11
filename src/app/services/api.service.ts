import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datailDto } from '../Interface/detail.Dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:5237/api/User';

  getUsers() {
  return this.http.get<any[]>(`${this.apiUrl}`);
  }

}
