import {HttpErrorResponse} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";

export function handleHttpError(operation: string): (error: HttpErrorResponse) => Observable<never> {
  return (error: HttpErrorResponse): Observable<never> => {
    console.error(operation, error);

    return EMPTY;
  };
}
