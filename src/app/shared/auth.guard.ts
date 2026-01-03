import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


// Пока что проверяем просто наличие токена
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
