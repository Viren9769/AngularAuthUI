import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
type: string = 'password';  
isText: boolean = false;
eyeIcon: string = "fa-eye-slash";

  constructor() { }
  OnInit() {}
hideShowPass() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.type = this.isText? 'text' : 'password';  // toggle password visibility
  }

}


