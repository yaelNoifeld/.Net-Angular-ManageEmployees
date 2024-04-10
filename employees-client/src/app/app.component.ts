import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  title = 'employees-client';
  userLogout?: boolean;

  constructor(private router: Router) { }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    sessionStorage.setItem('token', '');
    this.userLogout = true;
    setInterval(() => {
      this.userLogout = false;
    }, 2000)
  }
  homepage() {
    this.router.navigate(['/allEmployees']);
  }
}
