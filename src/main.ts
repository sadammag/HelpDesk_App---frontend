// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
//import { App } from './app';
//import { routes } from './app.routes';
import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideApollo(() => {
      return new ApolloClient({
        link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
        cache: new InMemoryCache(),
      });
    }),
  ],
});

