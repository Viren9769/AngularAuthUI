import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor], // Ensure NgFor is included for *ngFor directive
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // Correct styleUrls syntax
})
export class DashboardComponent {
  public users: any[] = [];

  constructor(private auth: AuthserviceService, private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

  logout() {
    this.auth.signout();
  }
}
