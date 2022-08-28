import {Component} from "@angular/core";
import {CactusSmall, Genus} from "../../../../api/cacti/cacti.domain";
import {IdHolder} from "../../../../api/api.domain";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {map, Observable, of} from "rxjs";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";

@Component({
  selector: "app-cacti-selection",
  templateUrl: "./cacti-selection.component.html",
  styleUrls: ["./cacti-selection.component.scss"],
})
export class CactiSelectionComponent {

  constructor(
    private readonly genusService: CactiGenusService,
    private readonly specieService: CactiSpecieService,
    private readonly formService: CactiFormService,
    private readonly cactusService: CactiCactusService,
  ) {
  }

  protected getCacti(): Observable<CactusSmall[]> {
    return this.cactusService.findAll();
  }

  protected getGerne(): Observable<Genus[]> {
    return this.genusService.findAll();
  }

  protected getCactiByGenus(genusId: string): Observable<CactusSmall[]> {
    return this.cactusService.findAllByGenus(genusId);
  }

  protected getSpecieName(id: string | null): Observable<string | undefined> {
    return id
      ? this.specieService.get(id).pipe(map(specie => specie.name))
      : of(undefined);
  }

  protected getFormName(id: string | null): Observable<string | undefined> {
    return id
      ? this.formService.get(id).pipe(map(form => form.name))
      : of(undefined);
  }

  protected trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }
}
