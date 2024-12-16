import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

 

 
  public getFullNamefromStore() {
    return this.fullName$.asObservable();
  }
  public setFullName(fullName: string) {
    this.fullName$.next(fullName);
  }
  public getrolefromStore() {
    return this.role$.asObservable();
  }
  public setRole(role: string) {
    this.role$.next(role);
  }
}
