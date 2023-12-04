import { furnitureRoutes } from './components/portfolio/components/furniture-app/furniture.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from '../enviroments/enviroments';
import { httpLoaderFactory } from './app.component';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideRouter(furnitureRoutes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule), // or provideHttpClient() in Angular v15
   importProvidersFrom(TranslateModule.forRoot({
     loader: {
       provide: TranslateLoader,
       useFactory: httpLoaderFactory,
       deps: [HttpClient]
     },
     defaultLanguage: environment.__DEFAULTLANG__,
   })),
  ]
};
