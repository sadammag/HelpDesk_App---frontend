import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

export interface Ticket {
  id: string;
  title?: string;
  status?: string;
  description?: string; 
  updatedAt?: string;   
}

interface TicketsResponse {
  ticketsByUser: Ticket[];
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  constructor(private apollo: Apollo) {}

  // Получаем билеты текущего пользователя
 getTickets(): Observable<Ticket[]> {
    return this.apollo
      .query<TicketsResponse>({
        query: gql`
          query TicketsByUser {
            ticketsByUser {
              id
              title
              description
              status
              updatedAt
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(res => res.data?.ticketsByUser ?? [])
      );
  }
}
