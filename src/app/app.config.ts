import { SneakersRoutes } from './components/portfolio/components/snickers-market/sneakers.routes';
import { furnitureRoutes } from './components/portfolio/components/furniture-app/furniture.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from '../enviroments/enviroments';
import { httpLoaderFactory } from './app.component';
import { GLOBAL_AUTO_ANIMATE_OPTIONS } from 'ng-auto-animate';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideRouter(furnitureRoutes),
    provideRouter(SneakersRoutes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule), 
   importProvidersFrom(TranslateModule.forRoot({
     loader: {
       provide: TranslateLoader,
       useFactory: httpLoaderFactory,
       deps: [HttpClient]
     },
     defaultLanguage: environment.__DEFAULTLANG__,
   })),
   {
    provide: GLOBAL_AUTO_ANIMATE_OPTIONS,
    useValue: {
      duration: 3750,
      easing: 'ease-out',
      // etc.
    },
  },
  ]
};
