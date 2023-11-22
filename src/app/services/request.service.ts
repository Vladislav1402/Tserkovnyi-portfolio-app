import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { URLS } from '../const/const';
import { LoaderService } from './loader.service';

@Injectable({providedIn: 'root'})
export class RequestService {
    constructor(
        private readonly http: HttpClient,
        private readonly loaderService: LoaderService,
    ) { }
    
    get authHeader() {
        return {
        //   Authorization: `Bearer ${this.tokenService.getToken()}`,
        };
      }

    get(
        urlKey: keyof typeof URLS,
        params?: { [key: string]: any },
        auth?: boolean,
        id?: string,
        headers?: any
      ): Observable<any> {
        let url = "";
    
        if (id) {
          // @ts-expect-error
          url = `${environment.__APIURL__}/${URLS[urlKey](id)}`;
        } else {
          url = `${environment.__APIURL__}/${URLS[urlKey]}`;
        }
    
        if (params && Object.keys(params).length) {
          const preparedParams = Object.keys(params)
            .map((key: string) => `${key}=${params[key]}`)
            .join("&");
    
          url = `${url}?${preparedParams}`;
        }
    
        this.loaderService.showLoader();
    
        if (auth && !headers) {
          headers = this.authHeader;
        }
    
        if (auth && headers) {
          headers = { ...headers, ...this.authHeader };
        }
    
        return this.http
          .get(url, {
            headers,
          })
          .pipe(
            tap(() => {
              this.loaderService.hideLoader();
            }),
            catchError((error: any) => {
              this.loaderService.hideLoader();
    
              console.log(error);
            //   return this.globalErrorHandler.processGlobalErrors(error);
            return throwError(error)
            })
          );
      }
}