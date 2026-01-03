import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RegisterMutation {
  register: AuthResponse;
}

interface LoginMutation {
  login: AuthResponse;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo) {}

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const REGISTER_MUTATION = gql`
      mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `;

    return this.apollo
      .mutate<RegisterMutation>({
        mutation: REGISTER_MUTATION,
        variables: { name, email, password },
      })
      .pipe(
        map(res => {
          if (!res.data) throw new Error('No data returned from register mutation');
          return res.data.register;
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `;

    return this.apollo
      .mutate<LoginMutation>({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      })
      .pipe(
        map(res => {
          if (!res.data) throw new Error('No data returned from login mutation');
          return res.data.login;
        })
      );
  }
}