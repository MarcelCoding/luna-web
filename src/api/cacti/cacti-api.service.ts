import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {
  Cactus,
  CactusHistoryEntry,
  CactusSmall,
  CactusWithoutId,
  CareGroup,
  Form,
  FormWithoutId,
  Genus,
  GenusWithoutId,
  Specie,
  SpecieWithoutId
} from "./cacti.domain";
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
    return this.endpointService.current;
  }

  /* --- find methods ---  */

  public findGenre(): Observable<Genus[]> {
    return this.http.get<Genus[]>(`${this.endpoint}/cacti/genus`)
      .pipe(catchError(handleHttpError('findGenre')));
  }

  public findSpecie(): Observable<Specie[]> {
    return this.http.get<Specie[]>(`${this.endpoint}/cacti/specie`)
      .pipe(catchError(handleHttpError('findSpecie')));
  }

  public findForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.endpoint}/cacti/form`)
      .pipe(catchError(handleHttpError('findForms')));
  }

  public findCareGroups(): Observable<CareGroup[]> {
    return this.http.get<CareGroup[]>(`${this.endpoint}/cacti/care-group`)
      .pipe(catchError(handleHttpError('findCareGroups')));
  }

  public findCacti(): Observable<CactusSmall[]> {
    return this.http.get<CactusSmall[]>(`${this.endpoint}/cacti/cactus`)
      .pipe(catchError(handleHttpError('findCacti')));
  }

  /* --- query methods ---  */

  public getCactus(id: string): Observable<Cactus> {
    return this.http.get<Cactus>(`${this.endpoint}/cacti/cactus/${id}`)
      .pipe(catchError(handleHttpError('getCactus')));
  }

  public getCactusHistory(cactusId: string): Observable<CactusHistoryEntry[]> {
    return this.http.get<CactusHistoryEntry[]>(`${this.endpoint}/cacti/cactus/${cactusId}/history`)
      .pipe(catchError(handleHttpError('findCactusHistory')));
  }

  /* --- add methods ---  */

  public addGenus(genus: GenusWithoutId): Observable<Genus> {
    return this.http.post<Genus>(`${this.endpoint}/cacti/genus`, genus)
      .pipe(catchError(handleHttpError('addGenus')));
  }

  public addSpecie(specie: SpecieWithoutId): Observable<Specie> {
    return this.http.post<Specie>(`${this.endpoint}/cacti/specie`, specie)
      .pipe(catchError(handleHttpError('addSpecie')));
  }

  public addForm(form: FormWithoutId): Observable<Form> {
    return this.http.post<Form>(`${this.endpoint}/cacti/form`, form)
      .pipe(catchError(handleHttpError('addForm')));
  }

  public addCactus(cactus: CactusWithoutId): Observable<Cactus> {
    return this.http.post<Cactus>(`${this.endpoint}/cacti/cactus`, cactus)
      .pipe(catchError(handleHttpError('addCactus')));
  }

  public addCactusHistoryEntry(cactusId: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
    return this.http.post<CactusHistoryEntry>(`${this.endpoint}/cacti/cactus/${cactusId}/history`, entry)
      .pipe(catchError(handleHttpError('addCactusHistoryEntry')));
  }

  /* --- update methods ---  */

  public updateGenus(id: string, genus: GenusWithoutId): Observable<Genus> {
    return this.http.put<Genus>(`${this.endpoint}/cacti/genus/${id}`, genus)
      .pipe(catchError(handleHttpError('updateGenus')));
  }

  public updateSpecie(id: string, specie: SpecieWithoutId): Observable<Specie> {
    return this.http.put<Specie>(`${this.endpoint}/cacti/specie/${id}`, specie)
      .pipe(catchError(handleHttpError('updateSpecie')));
  }

  public updateForm(id: string, form: FormWithoutId): Observable<Form> {
    return this.http.put<Form>(`${this.endpoint}/cacti/form/${id}`, form)
      .pipe(catchError(handleHttpError('updateForm')));
  }

  public updateCactus(id: string, cactus: CactusWithoutId): Observable<Cactus> {
    return this.http.put<Cactus>(`${this.endpoint}/cacti/cactus/${id}`, cactus)
      .pipe(catchError(handleHttpError('updateCactus')));
  }

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
