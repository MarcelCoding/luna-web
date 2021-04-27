import { Injectable } from '@angular/core';
import { NEVER, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public handleError(operation: string): (error: HttpErrorResponse) => Observable<never> {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error(operation, error);

      return NEVER;
    };
  }
}
