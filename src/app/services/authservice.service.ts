import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../Interface/User.Dto';
import { loginDTO } from '../Interface/Login.Dto';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';
import { TokenApiModel } from '../Model/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private baseURL: string = "http://localhost:5237/api/User/";
  private userpayload: any;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: Router, private userStore: UserStoreService  ) {
    this.userpayload = this.decodeToken();
    if (this.userpayload) {
      this.userStore.setFullName(this.userpayload.name);
   }
  }

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
    this.userpayload = this.decodeToken();
  if (this.userpayload) {
    this.userStore.setFullName(this.userpayload.name); // Update full name in the UserStoreService
  }
  }

  storeRefreshToken(tokenvalue: string){
    this.isAuthenticated.next(true);
    localStorage.setItem('refreshToken', tokenvalue);
  }
  // get token from local storage
  getToken(){
    return localStorage.getItem('token');
  }

  // get refresh token from local storage
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // if my user is logged in or not 
  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }
  // decode token to get user data
  decodeToken() {
    const jwthelper = new JwtHelperService();
    const token = this.getToken();
    if (!token) {
      console.error('No token found in localStorage.');
      return null;
    }
    const decodedToken = jwthelper.decodeToken(token);
    console.log('Decoded Token: ', decodedToken);
    return decodedToken;
  }
  // to get full name from token 

  getfullNameFromToken(){
    if(this.userpayload)
       console.log('Full Name from Token: ', this.userpayload.name);
      return this.userpayload.name;
  }


  // to get role from token
getRoleFromToken(){
  if(this.userpayload)
    return this.userpayload.role;
}

renewToken(tokenApi: TokenApiModel) {
  return this.http.post<any>(`${this.baseURL}refresh`, tokenApi);
}
  

}
