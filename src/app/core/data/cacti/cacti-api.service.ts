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
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { EndpointService } from '../endpoints/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CactiApiService {

  private get apiGenus(): string {
    return `${this.endpointService.selected}/cacti/genus`;
  }

  private get apiSpecie(): string {
    return `${this.endpointService.selected}/cacti/specie`;
  }

  private get apiForm(): string {
    return `${this.endpointService.selected}/cacti/form`;
  }

  private get apiCareGroup(): string {
    return `${this.endpointService.selected}/cacti/care-group`;
  }

  private get apiCactus(): string {
    return `${this.endpointService.selected}/cacti/cactus`;
  }

  constructor(
    private readonly endpointService: EndpointService,
    private readonly httpClient: HttpClient,
    private readonly apiService: ApiService
  ) {
  }

  /* --- find methods ---  */

  public findGenre(): Observable<Genus[]> {
    return this.httpClient.get<Genus[]>(this.apiGenus)
      .pipe(retry(2), catchError(this.apiService.handleError('findGenre')));
  }

  public findSpecie(): Observable<Specie[]> {
    return this.httpClient.get<Specie[]>(this.apiSpecie)
      .pipe(retry(2), catchError(this.apiService.handleError('findSpecie')));
  }

  public findForms(): Observable<Form[]> {
    return this.httpClient.get<Form[]>(this.apiForm)
      .pipe(retry(2), catchError(this.apiService.handleError('findForms')));
  }

  public findCareGroups(): Observable<CareGroup[]> {
    return this.httpClient.get<CareGroup[]>(this.apiCareGroup)
      .pipe(retry(2), catchError(this.apiService.handleError('findCareGroups')));
  }

  public findCacti(): Observable<CactusSmall[]> {
    return this.httpClient.get<CactusSmall[]>(this.apiCactus)
      .pipe(retry(2), catchError(this.apiService.handleError('findCacti')));
  }

  /* --- query methods ---  */

  public getCactus(id: string): Observable<Cactus> {
    return this.httpClient.get<Cactus>(`${this.apiCactus}/${id}`)
      .pipe(retry(2), catchError(this.apiService.handleError('getCactus')));
  }

  /* --- add methods ---  */

  public addGenus(genus: GenusWithoutId): Observable<Genus> {
    return this.httpClient.post<Genus>(this.apiGenus, genus)
      .pipe(catchError(this.apiService.handleError('addGenus')));
  }

  public addSpecie(specie: SpecieWithoutId): Observable<Specie> {
    return this.httpClient.post<Specie>(this.apiSpecie, specie)
      .pipe(catchError(this.apiService.handleError('addSpecie')));
  }

  public addForm(form: FormWithoutId): Observable<Form> {
    return this.httpClient.post<Form>(this.apiForm, form)
      .pipe(catchError(this.apiService.handleError('addForm')));
  }

  public addCactus(cactus: CactusWithoutId): Observable<Cactus> {
    return this.httpClient.post<Cactus>(this.apiCactus, cactus)
      .pipe(catchError(this.apiService.handleError('addCactus')));
  }

  /* --- update methods ---  */

  public updateGenus(id: string, genus: GenusWithoutId): Observable<Genus> {
    return this.httpClient.put<Genus>(`${this.apiGenus}/${id}`, genus)
      .pipe(catchError(this.apiService.handleError('updateGenus')));
  }

  public updateSpecie(id: string, specie: SpecieWithoutId): Observable<Specie> {
    return this.httpClient.put<Specie>(`${this.apiSpecie}/${id}`, specie)
      .pipe(catchError(this.apiService.handleError('updateSpecie')));
  }

  public updateForm(id: string, form: FormWithoutId): Observable<Form> {
    return this.httpClient.put<Form>(`${this.apiForm}/${id}`, form)
      .pipe(catchError(this.apiService.handleError('updateForm')));
  }

  public updateCactus(id: string, cactus: CactusWithoutId): Observable<Cactus> {
    return this.httpClient.put<Cactus>(`${this.apiCactus}/${id}`, cactus)
      .pipe(catchError(this.apiService.handleError('updateCactus')));
  }

  /* --- upload images ---  */

  public uploadCactusImages(id: string, images: FileList): Observable<void> {
    const data = new FormData();

    for (let i = 0; i < images.length; i++) {
      // @ts-expect-error
      data.append('files[]', images.item(i));
    }

    return this.httpClient.post<void>(`${this.apiCactus}/${id}/image`, data)
      .pipe(catchError(this.apiService.handleError('uploadCactusImages')));
  }
}
