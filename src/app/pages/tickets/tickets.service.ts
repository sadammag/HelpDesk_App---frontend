import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

export interface TicketLog {
  ticketId: string;
  authorId: string;
  message: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title?: string;
  status?: string;
  description?: string;
  updatedAt?: string;
  logs?: TicketLog[];
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
              logs {
                ticketId
                authorId
                message
                createdAt
              }
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data?.ticketsByUser ?? []));
  }

  // Создание нового билета
  createTicket(title: string, description: string, status: string): Observable<Ticket> {
    const CREATE_TICKET = gql`
      mutation CreateTicket($title: String!, $description: String!, $status: String!) {
        createTicket(title: $title, description: $description, status: $status) {
          id
          title
          description
          status
          createdAt
          updatedAt
          logs {
            ticketId
            authorId
            message
            createdAt
          }
        }
      }
    `;

    return this.apollo
      .mutate<{ createTicket: Ticket }>({
        mutation: CREATE_TICKET,
        variables: { title, description, status },
      })
      .pipe(
        map((res) => {
          if (!res.data) throw new Error('Ошибка при создании билета');
          return res.data.createTicket;
        })
      );
  }

  // Редактирование билета
  editTicket(
    id: string,
    title?: string,
    description?: string,
    status?: string
  ): Observable<Ticket> {
    const EDIT_TICKET = gql`
      mutation EditTicket($id: String!, $title: String, $description: String, $status: String) {
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
      .pipe(
        map((res) => {
          if (!res.data) throw new Error('No data returned from editTicket mutation');
          return res.data.editTicket;
        })
      );
  }

  // Удаление билета
  deleteTicket(id: string): Observable<boolean> {
    const REMOVE_TICKET = gql`
      mutation RemoveTicket($id: String!) {
        removeTicket(id: $id)
      }
    `;

    return this.apollo
      .mutate<{ removeTicket: boolean }>({
        mutation: REMOVE_TICKET,
        variables: { id },
      })
      .pipe(
        map((res) => res.data?.removeTicket ?? false) // возвращаем true/false
      );
  }
}
