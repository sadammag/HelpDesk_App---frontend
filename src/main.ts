// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';

// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
// import { provideApollo } from 'apollo-angular';
// //import { App } from './app';
// //import { routes } from './app.routes';
// import { App } from './app/app';
// import { routes } from './app/app.routes';


// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     provideApollo(() => {
//       return new ApolloClient({
//         link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
//         cache: new InMemoryCache(),
//       });
//     }),
//   ],
// }); 


// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { inject } from '@angular/core';

// import { provideApollo } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import { InMemoryCache } from '@apollo/client/core';
// import { setContext } from '@apollo/client/link/context';

// import { App } from './app/app';
// import { routes } from './app/app.routes';
// import { HttpHeaders } from '@angular/common/http';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpHeaders } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),

    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const http = httpLink.create({
        uri: 'http://localhost:3000/graphql',
      });

      const authLink = setContext((_, context) => {
        const token = localStorage.getItem('token');

        let headers = context.headers;

        if (!(headers instanceof HttpHeaders)) {
          headers = new HttpHeaders();
        }

        return {
          headers: headers.set(
            'Authorization',
            token ? `Bearer ${token}` : ''
          ),
        };
      });

      return {
        link: authLink.concat(http),
        cache: new InMemoryCache(),
      };
    }),
  ],
});
