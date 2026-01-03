import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service'; // путь к сервису может отличаться
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Метод для регистрации пользователя
  register(name: string, email: string, password: string) {
    this.authService.register(name, email, password).subscribe({
      next: (res: any) => {
        // Сохраняем токен в localStorage
        localStorage.setItem('token', res.token);

        console.log('Пользователь зарегистрирован:', res.user);

        // Перенаправляем на страницу билетов
        this.router.navigate(['/tickets']);
      },
      error: (err: any) => {
        console.error('Ошибка регистрации:', err);
        alert(err.message || 'Ошибка при регистрации');
      }
    });
  }
}
