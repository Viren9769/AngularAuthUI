import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../Interface/User.Dto';
import { loginDTO } from '../Interface/Login.Dto';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private baseURL: string = "http://localhost:5237/api/User/";
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: Router ) { }

  login(userobj: UserDto) {
    return this.http.post<any>(`${this.baseURL}authentication`, userobj);
  }

  signup(loginobj:loginDTO) {
    return this.http.post<any>(`${this.baseURL}register`, loginobj);
  }

  signout() {
    localStorage.clear();  // clear all local storage data
    this.route.navigate(['login']);  // navigate to home page after logout  // replace '/home' with your desired route  // remember to replace 'home' with your actual route name in your
  //  localStorage.removeItem('token');
  }

  updateToken(status: boolean) {
    this.isAuthenticated.next(status);
  }

  // set a token for auth guard 
  storeToken(token_value: string){
    this.isAuthenticated.next(true);
    localStorage.setItem('token', token_value);
  }
  // get token from local storage
  getToken(){
    return localStorage.getItem('token');
  }

  // if my user is logged in or not 
  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  

}
