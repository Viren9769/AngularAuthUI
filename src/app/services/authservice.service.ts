import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../Interface/User.Dto';
import { loginDTO } from '../Interface/Login.Dto';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private baseURL: string = "http://localhost:5237/api/User/";
  constructor(private http: HttpClient) { }

  login(userobj: UserDto) {
    return this.http.post<any>(`${this.baseURL}authentication`, userobj);
  }

  signup(loginobj:loginDTO) {
    return this.http.post<any>(`${this.baseURL}register`, loginobj);
  }

}
