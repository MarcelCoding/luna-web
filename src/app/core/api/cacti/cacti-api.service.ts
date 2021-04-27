import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Cactus,
  CactusSmall,
  CactusWithoutId,
  CareGroup,
  Form,
  FormWithoutId,
  Genus,
  GenusWithoutId,
  Specie,
  SpecieWithoutId
} from './cacti.domain';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CactiApiService {

  private static readonly API_GENUS = `${environment.api}/cacti/genus`;
  private static readonly API_SPECIE = `${environment.api}/cacti/specie`;
  private static readonly API_FORM = `${environment.api}/cacti/form`;
  private static readonly API_CARE_GROUP = `${environment.api}/cacti/care-group`;
  private static readonly API_CACTUS = `${environment.api}/cacti/cactus`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiService: ApiService
  ) {
  }

  /* --- find methods ---  */

  public findGenre(): Observable<Genus[]> {
    return this.httpClient.get<Genus[]>(CactiApiService.API_GENUS)
      .pipe(retry(2), catchError(this.apiService.handleError('findGenre')));
  }

  public findSpecie(): Observable<Specie[]> {
    return this.httpClient.get<Specie[]>(CactiApiService.API_SPECIE)
      .pipe(retry(2), catchError(this.apiService.handleError('findSpecie')));
  }

  public findForms(): Observable<Form[]> {
    return this.httpClient.get<Form[]>(CactiApiService.API_FORM)
      .pipe(retry(2), catchError(this.apiService.handleError('findForms')));
  }

  public findCareGroups(): Observable<CareGroup[]> {
    return this.httpClient.get<CareGroup[]>(CactiApiService.API_CARE_GROUP)
      .pipe(retry(2), catchError(this.apiService.handleError('findCareGroups')));
  }

  public findCacti(): Observable<CactusSmall[]> {
    return this.httpClient.get<CactusSmall[]>(CactiApiService.API_CACTUS)
      .pipe(retry(2), catchError(this.apiService.handleError('findCacti')));
  }

  /* --- query methods ---  */

  public getCactus(id: string): Observable<Cactus> {
    return this.httpClient.get<Cactus>(`${CactiApiService.API_CACTUS}/${id}`)
      .pipe(retry(2), catchError(this.apiService.handleError('getCactus')));
  }

  /* --- add methods ---  */

  public addGenus(genus: GenusWithoutId): Observable<Genus> {
    return this.httpClient.post<Genus>(CactiApiService.API_GENUS, genus)
      .pipe(catchError(this.apiService.handleError('addGenus')));
  }

  public addSpecie(specie: SpecieWithoutId): Observable<Specie> {
    return this.httpClient.post<Specie>(CactiApiService.API_SPECIE, specie)
      .pipe(catchError(this.apiService.handleError('addSpecie')));
  }

  public addForm(form: FormWithoutId): Observable<Form> {
    return this.httpClient.post<Form>(CactiApiService.API_FORM, form)
      .pipe(catchError(this.apiService.handleError('addForm')));
  }

  public addCactus(cactus: CactusWithoutId): Observable<Cactus> {
    return this.httpClient.post<Cactus>(CactiApiService.API_CACTUS, cactus)
      .pipe(catchError(this.apiService.handleError('addCactus')));
  }

  /* --- update methods ---  */

  public updateGenus(id: string, genus: GenusWithoutId): Observable<Genus> {
    return this.httpClient.put<Genus>(`${CactiApiService.API_GENUS}/${id}`, genus)
      .pipe(catchError(this.apiService.handleError('updateGenus')));
  }

  public updateSpecie(id: string, specie: SpecieWithoutId): Observable<Specie> {
    return this.httpClient.put<Specie>(`${CactiApiService.API_SPECIE}/${id}`, specie)
      .pipe(catchError(this.apiService.handleError('updateSpecie')));
  }

  public updateForm(id: string, form: FormWithoutId): Observable<Form> {
    return this.httpClient.put<Form>(`${CactiApiService.API_FORM}/${id}`, form)
      .pipe(catchError(this.apiService.handleError('updateForm')));
  }

  public updateCactus(id: string, cactus: CactusWithoutId): Observable<Cactus> {
    return this.httpClient.put<Cactus>(`${CactiApiService.API_CACTUS}/${id}`, cactus)
      .pipe(catchError(this.apiService.handleError('updateCactus')));
  }

  /* --- upload images ---  */

  public uploadCactusImages(id: string, images: FileList): Observable<void> {
    const data = new FormData();

    for (let i = 0; i < images.length; i++) {
      // @ts-expect-error
      data.append('files[]', images.item(i));
    }

    return this.httpClient.post<void>(`${CactiApiService.API_CACTUS}/${id}/image`, data)
      .pipe(catchError(this.apiService.handleError('uploadCactusImages')));
  }
}
