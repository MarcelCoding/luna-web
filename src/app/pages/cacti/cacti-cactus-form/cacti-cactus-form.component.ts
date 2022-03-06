import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {map, Observable} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";
import {SearchResult} from "../../../../components/text-field/text-field.component";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";

@Component({
  selector: 'app-cacti-cactus-form',
  templateUrl: './cacti-cactus-form.component.html',
  styleUrls: ['./cacti-cactus-form.component.scss']
})
export class CactiCactusFormComponent {

  public readonly form = new FormGroup({
    number: new FormControl(null, Validators.required),
    genusId: new FormControl(),
    specieId: new FormControl(),
    formId: new FormControl(),
    fieldNumber: new FormControl(),
    synonymes: new FormControl(),
    careGroupId: new FormControl()
  });

  constructor(
    private readonly genusService: CactiGenusService,
    private readonly specieService: CactiSpecieService,
    private readonly formService: CactiFormService,
    private readonly careGroupService: CactiCareGroupService
  ) {
  }

  public searchGenre = (query: string): Observable<SearchResult> => {
    return this.genusService.search(query)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === query),
        result
      })));
  };

  public searchSpecie = (query: string): Observable<SearchResult> => {
    return this.specieService.search(query)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === query),
        result
      })));
  };

  public searchForms = (query: string): Observable<SearchResult> => {
    return this.formService.search(query)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === query),
        result
      })));
  };

  public searchCareGroups = (query: string): Observable<SearchResult> => {
    return this.careGroupService.search(query)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === query),
        result
      })));
  };

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }
}
