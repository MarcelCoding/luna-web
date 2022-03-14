import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CactusHistoryEntry} from "./cacti.domain";
import {handleHttpError} from "../api.utils";
import {EndpointService} from "../endpoint/endpoint.service";

@Injectable({
  providedIn: 'root'
})
export class CactiApiService {

  constructor(
    private readonly endpointService: EndpointService,
    private readonly http: HttpClient
  ) {
  }

  private get endpoint(): string {
    return this.endpointService.current();
  }

  /* --- query methods ---  */

  public getCactusHistory(cactusId: string): Observable<CactusHistoryEntry[]> {
    return this.http.get<CactusHistoryEntry[]>(`${this.endpoint}/cacti/cactus/${cactusId}/history`)
      .pipe(catchError(handleHttpError('findCactusHistory')));
  }

  /* --- add methods ---  */

  public addCactusHistoryEntry(cactusId: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
    return this.http.post<CactusHistoryEntry>(`${this.endpoint}/cacti/cactus/${cactusId}/history`, entry)
      .pipe(catchError(handleHttpError('addCactusHistoryEntry')));
  }

  /* --- update methods ---  */

  public uploadCactusImages(id: string, images: FileList): Observable<void> {
    const data = new FormData();

    for (let i = 0; i < images.length; i++) {
      data.append('files', images[i]);
    }

    return this.http.post<void>(`${this.endpoint}/cacti/cactus/${id}/image`, data)
      .pipe(catchError(handleHttpError('uploadCactusImages')));
  }

  public updateCactusHistoryEntry(cactusId: string, origDate: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
    return this.http.put<CactusHistoryEntry>(`${this.endpoint}/cacti/cactus/${cactusId}/history/${origDate}`, entry)
      .pipe(catchError(handleHttpError('updateCactusHistoryEntry')));
  }
}
