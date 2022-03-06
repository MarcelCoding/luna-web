import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

export function handleHttpError(operation: string): (error: HttpErrorResponse) => Observable<never> {
  return (error: HttpErrorResponse): Observable<never> => {
    // console.error(`${operation}: ${error.message}`, error);

    return throwError(() => error);
  };
}
