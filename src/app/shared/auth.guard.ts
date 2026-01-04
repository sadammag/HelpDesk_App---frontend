import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const apollo = inject(Apollo);

  const token = localStorage.getItem('token');

  // Токена нет => редирект на login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Проверяем токен на сервере через "me"
  const CURRENT_USER_QUERY = gql`
    query Me {
      me {
        id
      }
    }
  `;

  try {
    await firstValueFrom(
      apollo.query({
        query: CURRENT_USER_QUERY,
        context: {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,  // Вернуться к этому участку
          }),
        },
        fetchPolicy: 'network-only', // всегда проверяем сервер
      })
    );

    // Всё ок  токен валиден
    return true;
  } catch {
    // Токен невалидный  удаляем и редирект
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
