import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
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