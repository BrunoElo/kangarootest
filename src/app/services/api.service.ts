import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Test } from '../shared/models';
import { catchError, retry } from 'rxjs/internal/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTests(): Observable<HttpResponse<Test[]>> {
    return this.http
      .get<Test[]>(`${environment.apiUrl}/tests`, {
        observe: 'response',
      })
      .pipe(retry(2), catchError(this.handleError)); // retry failed request up to 2 times before passing it to the error handler
  }

  postTest(payload: Test): Observable<Test> {
    return this.http
      .post<Test>(`${environment.apiUrl}/tests`, payload, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.apiUrl}/tests/${id}`, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error ocurred:', error.error.message);
    } else {
      // Server side error
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Seems there is a network issue; please try again later.'
    );
  }
}
