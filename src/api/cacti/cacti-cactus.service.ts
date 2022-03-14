import {Injectable} from '@angular/core';
import {AbstractSmallCachedCrudService, ConvertToSmall, UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Cactus, CactusSmall, CactusWithoutId} from "./cacti.domain";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";
import {catchError, map, Observable} from "rxjs";
import {NotificationService} from "../../components/notification/notification.service";
import {handleHttpError} from "../api.utils";

const API_MODULE = "cacti";
const NAME = "cactus";
const PLURAL_NAME = "cacti";
const UPDATE_FUNC: UpdateCachedElement<CactusSmall, Cactus> = (c, f) => {
  c.number = f.number;
  c.genusId = f.genusId;
  c.specieId = f.specieId;
  c.formId = f.formId;
  c.fieldNumber = f.fieldNumber;
};
const CONVERT_FUNC: ConvertToSmall<Cactus, CactusSmall> = f => {
  return {
    id: f.id,
    number: f.number,
    genusId: f.genusId,
    specieId: f.specieId,
    formId: f.formId,
    fieldNumber: f.fieldNumber
  };
};

@Injectable({
  providedIn: 'root'
})
export class CactiCactusService extends AbstractSmallCachedCrudService<CactusWithoutId, Cactus, CactusSmall, string> {

  // TODO: cacti.sort((a, b) => a.number.localeCompare(b.number));

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC, CONVERT_FUNC);
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Kakteen konnten nicht geladen werden.");
  }

  public findAllByGenus(genusId: string): Observable<CactusSmall[]> {
    return this.findAll()
      .pipe(map(cacti => cacti.filter(cactus => cactus.genusId === genusId)));
  }

  public uploadImages(id: string, images: FileList): Observable<void> {
    const data = new FormData();

    for (let i = 0; i < images.length; i++) {
      data.append('files', images[i]);
    }

    return this.http.post<void>(`${this.fullApiPath}/${id}/image`, data)
      .pipe(catchError(handleHttpError(`upload${this.pascalName}Images`)));
  }
}
