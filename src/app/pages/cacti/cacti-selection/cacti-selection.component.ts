import { Component } from '@angular/core';
import { CactiService, CactusSmall, Form, Genus, Specie } from '../../../core/data/cacti';
import { Router } from '@angular/router';

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

  public getSpecies(genusId: string): Specie[] {
    return this.cactiApiService.getSpeciesByGenus(genusId);
  }

  public getForms(specieId: string): Form[] {
    return this.cactiApiService.getFormsBySpecie(specieId);
  }

  public getCacti(): CactusSmall[] {
    return this.cactiApiService.getCacti();
  }

  public getCactiByGenus(genusId: string): CactusSmall[] {
    return this.cactiApiService.getCactiByGenus(genusId);
  }

  public getCactiBySpecie(specieId: string): CactusSmall[] {
    return this.cactiApiService.getCactiBySpecie(specieId);
  }

  public getCactiByForm(formId: string): CactusSmall[] {
    return this.cactiApiService.getCactiByForm(formId);
  }

  /* --- add methods ---  */

  public addCactus(number: string): void {
    this.cactiApiService.addCactus(number)
      .subscribe(cactus => this.selectCactus(cactus.id));
  }

  /* --- update methods ---  */

  public updateGenus(id: string, name: string): void {
    this.cactiApiService.updateGenus(id, name);
  }

  public updateSpecie(id: string, name: string, genusId: string): void {
    this.cactiApiService.updateSpecie(id, name, genusId);
  }

  public updateForm(id: string, name: string, specieId: string): void {
    this.cactiApiService.updateForm(id, name, specieId);
  }

  public updateCactus(id: string, number: string, genusId?: string, specieId?: string, formId?: string): void {
    this.cactiApiService.updateCactus(id, { id, number, genusId, specieId, formId }).subscribe();
  }

  /* --- internal methods ---  */

  public selectCactus(id: string): void {
    this.router.navigate([ 'cacti', id ]).then();
  }

  public trackBy(index: number, { id }: Genus | Specie | Form | CactusSmall): string {
    return id;
  }
}
