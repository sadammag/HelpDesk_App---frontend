import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  // template: `
  //   <div class="p-6 max-w-sm mx-auto">
  //     <h1 class="text-xl mb-4">Вход</h1>

  //     <input class="border p-2 w-full mb-2" placeholder="Email" #email />
  //     <input class="border p-2 w-full mb-4" placeholder="Пароль" type="password" #password />

  //     <button class="bg-blue-500 text-white p-2 w-full"
  //       (click)="login(email.value, password.value)">
  //       Войти
  //     </button>
  //   </div>
  // `,

  
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
    constructor(private auth: AuthService, private router: Router) {}

    login(email: string, password: string) {
    this.auth.login(email, password).subscribe(() => {
      this.router.navigate(['/tickets']);
    });
  }



}
