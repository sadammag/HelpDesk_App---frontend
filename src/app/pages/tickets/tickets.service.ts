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


  editTicket(
  id: string,
  title?: string,
  description?: string,
  status?: string
): Observable<Ticket> {
  const EDIT_TICKET = gql`
    mutation EditTicket(
      $id: String!
      $title: String
      $description: String
      $status: String
    ) {
      editTicket(id: $id, title: $title, description: $description, status: $status) {
        id
        title
        description
        status
        updatedAt
      }
    }
  `;

  return this.apollo
    .mutate<{ editTicket: Ticket }>({
      mutation: EDIT_TICKET,
      variables: { id, title, description, status },
    })
    .pipe(map(res => {
      if (!res.data) throw new Error('No data returned from editTicket mutation');
      return res.data.editTicket;
    }));
}




//  Мутация удаления билета 
deleteTicket(id: string): Observable<boolean> {
  const REMOVE_TICKET = gql`
    mutation RemoveTicket($id: String!) {
      removeTicket(id: $id)
    }
  `;

  return this.apollo.mutate<{ removeTicket: boolean }>({
    mutation: REMOVE_TICKET,
    variables: { id },
  }).pipe(
    map(res => res.data?.removeTicket ?? false) // возвращаем true/false
  );
}

}
