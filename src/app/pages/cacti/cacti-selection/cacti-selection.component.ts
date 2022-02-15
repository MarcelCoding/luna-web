import {Component} from '@angular/core';
import {CactiService} from "../../../../api/cacti/cacti.service";
import {CactusSmall, Form, Genus, Specie} from "../../../../api/cacti/cacti.domain";
import {IdHolder} from "../../../../api/api.domain";

@Component({
  selector: 'app-cacti-selection',
  templateUrl: './cacti-selection.component.html',
  styleUrls: ['./cacti-selection.component.scss']
})
export class CactiSelectionComponent {

  constructor(
    private readonly cactiService: CactiService
  ) {
  }

  public get cacti(): CactusSmall[] {
    return this.cactiService.getCacti();
  }

  public get genre(): Genus[] {
    return this.cactiService.getGenre();
  }

  public getCactiByGenus(genusId: string): CactusSmall[] {
    return this.cactiService.getCactiByGenus(genusId);
  }

  public getSpecie(id: string | undefined): Specie | undefined {
    return id ? this.cactiService.getSpecie(id) : undefined;
  }

  public getForm(id: string | undefined): Form | undefined {
    return id ? this.cactiService.getForm(id) : undefined;
  }

  public trackBy(index: number, {id}: IdHolder): string {
    return id;
  }
}
