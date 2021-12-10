import { Component } from '@angular/core';
import { CactiService, CactusSmall, Genus } from '../../../core/data/cacti';
import { Router } from '@angular/router';
import { IdHolder } from '../../../core/data';

@Component({
  selector: 'app-cacti-selection',
  templateUrl: './cacti-selection.component.html',
  styleUrls: ['./cacti-selection.component.scss']
})
export class CactiSelectionComponent {

  constructor(
    private readonly cactiApiService: CactiService,
    private readonly router: Router
  ) {
  }

  /* --- query methods ---  */

  public getGenre(): Genus[] {
    return this.cactiApiService.getGenre();
  }

  public getCacti(): CactusSmall[] {
    return this.cactiApiService.getCacti();
  }

  public getCactiByGenus(genusId: string): CactusSmall[] {
    return this.cactiApiService.getCactiByGenus(genusId);
  }

  /* --- add methods ---  */

  public addCactus(number: string): void {
    this.cactiApiService.addCactus(number)
      .subscribe(cactus => this.selectCactus(cactus.id));
  }

  /* --- internal methods ---  */

  public formatCactus(cactus: CactusSmall) {
    let result = '';

    if (cactus.specieId) {
      result += this.cactiApiService.getSpecie(cactus.specieId)?.name + ' ';
    }

    if (cactus.formId) {
      result += this.cactiApiService.getForm(cactus.formId)?.name + ' ';
    }

    if (cactus.fieldNumber) {
      result += cactus.fieldNumber + ' ';
    }

    result += `(#${cactus.number})`;

    return result;
  }

  public selectCactus(id: string): void {
    this.router.navigate([ 'cacti', id ]).then();
  }

  public trackBy(index: number, { id }: IdHolder): string {
    return id;
  }
}
