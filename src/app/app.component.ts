import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAuthUI';
  constructor(private route: Router) {}
  ngOnInit(): void {
    
  }

  Signup() {
    this.route.navigate(['signup']);
    }
    Login() {
    this.route.navigate(['login']);
    }

}
