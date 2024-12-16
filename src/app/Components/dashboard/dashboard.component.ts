import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { ApiService } from '../../services/api.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [], // Ensure NgFor is included for *ngFor directive
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // Correct styleUrls syntax
})
export class DashboardComponent {
  public users: any[] = [];
  public fullName: string = " ";

  constructor(private auth: AuthserviceService, private api: ApiService, private userservice: UserStoreService) {}

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });

    this.userservice.getFullNamefromStore()
    .subscribe(val => {
      let fullNamefromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNamefromToken;
     console.log('Full Name from Store: ', this.fullName);
  })
}
  

  logout() {
    this.auth.signout();
  }
}

