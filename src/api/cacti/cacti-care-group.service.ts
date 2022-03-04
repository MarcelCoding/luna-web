import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CareGroup} from "./cacti.domain";
import {EndpointService} from "../endpoint/endpoint.service";

@Injectable({
  providedIn: 'root'
})
export class CactiCareGroupService {

  private careGroups?: CareGroup[];

  constructor(
    private readonly http: HttpClient,
    private readonly endpointService: EndpointService
  ) {
    this.loadCache();
  }

  public getCareGroup(id: string): CareGroup | undefined {
    return this.careGroups?.find(careGroup => careGroup.id === id);
  }

  public searchCareGroups(term: string): CareGroup[] {
    if (!this.careGroups) {
      return [];
    }

    const term0 = term.toLowerCase().trim();

    return term0.length
      ? this.careGroups.filter(careGroup => careGroup.name.toLowerCase().includes(term0))
      : this.careGroups;
  }

  private loadCache(): void {
    this.http.get<CareGroup[]>(`${this.endpointService.current()}/cacti/care-group`)
      .subscribe({
        next: all => {
          this.careGroups = all;
          console.info(`Updated care group cache, loaded ${all.length} care groups with a lifetime of infinity.`);
        },
        error: error => console.error(`Unable to load care group cache: `, error)
      });
  }
}
