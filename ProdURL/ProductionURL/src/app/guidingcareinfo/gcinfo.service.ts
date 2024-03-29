import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Igcinfo } from "./gcinfo";
import { Observable, observable, throwError } from "rxjs";
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class gcClientService{
    private gcClientinfoUrl = 'https://mocki.io/v1/1e27928a-c3ec-4381-b9e6-0898d941fffd';
    
    constructor(private http:HttpClient){}

    getClients(): Observable<Igcinfo[]> {
        return this.http.get<Igcinfo[]>(this.gcClientinfoUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}