import { Injectable } from '@angular/core';
import { Cactus, CactusSmall, CareGroup, Form, Genus, Specie } from './cacti.domain';
import { forkJoin, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CactiApiService } from './cacti-api.service';

@Injectable({
  providedIn: 'root'
})
export class CactiService {

  private genre0?: Genus[];
  private species0?: Specie[];
  private forms0?: Form[];
  private careGroups0?: CareGroup[];
  private cacti0?: CactusSmall[];

  constructor(
    private cactiApiService: CactiApiService
  ) {
    this.update();
  }

  /* --- query methods ---  */

  public getGenus(id: string): Genus | undefined {
    return this.genre0?.find(genus => genus.id === id);
  }

  public getGenusByName(name: string): Genus | undefined {
    return this.genre0?.find(genus => genus.name === name);
  }

  public getGenre(): Genus[] {
    return this.genre0 || [];
  }

  public searchGenre(token: string): Genus[] {
    return token ? this.getGenre() : this.genre0?.filter(genus => genus.name.toLowerCase().includes(token)) || [];
  }

  public getSpecie(id: string): Specie | undefined {
    return this.species0?.find(specie => specie.id === id);
  }

  public getSpecieByNameAndGenus(name: string, genusId: string): Specie | undefined {
    return this.species0?.find(specie => specie.name === name && specie.genusId === genusId);
  }

  public getSpecies(): Specie[] {
    return this.species0 || [];
  }

  public getSpeciesByGenus(genusId: string): Specie[] {
    return this.species0?.filter(genus => genus.genusId === genusId) || [];
  }

  public searchSpecies(genusId: string, token: string): Specie[] {
    if (!token) {
      return this.getSpeciesByGenus(genusId);
    }

    return this.species0?.filter(specie => {
      if (specie.genusId !== genusId) {
        return false;
      }

      return specie.name.toLowerCase().includes(token);
    }) || [];
  }

  public getForm(id: string): Form | undefined {
    return this.forms0?.find(forms => forms.id === id);
  }

  public getFormByNameAndSpecie(name: string, specieId: string): Form | undefined {
    return this.forms0?.find(form => form.name === name && form.specieId === specieId);
  }

  public getForms(): Form[] {
    return this.forms0 || [];
  }

  public getFormsByGenus(genusId: string): Form[] {
    return this.forms0?.filter(form => this.getSpecie(form.specieId)?.genusId === genusId) || [];
  }

  public getFormsBySpecie(specieId: string): Form[] {
    return this.forms0?.filter(form => form.specieId === specieId) || [];
  }

  public searchForms(specieId: string, token: string): Form[] {
    if (!token) {
      return this.getFormsBySpecie(specieId);
    }

    return this.forms0?.filter(form => {
      if (form.specieId !== specieId) {
        return false;
      }

      return form.name.toLowerCase().includes(token);
    }) || [];
  }

  public getCareGroup(id: string | undefined): CareGroup | undefined {
    if (!id) return undefined;
    return this.careGroups0?.find(careGroup => careGroup.id === id);
  }

  public getCareGroups(): CareGroup[] {
    return this.careGroups0 || [];
  }

  public searchCareGroups(token: string): CareGroup[] {
    token = token.toLowerCase().trim();
    if (!token.length) {
      return this.getCareGroups();
    }

    return this.careGroups0?.filter(careGroup => careGroup.name.toLowerCase().includes(token)) || [];
  }

  public getCacti(): CactusSmall[] {
    return this.cacti0 || [];
  }

  public getCactiByGenus(genusId: string): CactusSmall[] {
    return this.cacti0?.filter(cactus => cactus.genusId === genusId && !cactus.specieId) || [];
  }

  public getCactiBySpecie(specieId: string): CactusSmall[] {
    return this.cacti0?.filter(cactus => cactus.specieId === specieId && !cactus.formId) || [];
  }

  public getCactiByForm(formId: string): CactusSmall[] {
    return this.cacti0?.filter(cactus => cactus.formId === formId) || [];
  }

  public getCactus(id: string): Observable<Cactus> {
    return this.cactiApiService.getCactus(id).pipe(take(1));
  }

  /* --- add methods ---  */

  public addGenus(name: string): Observable<Genus> {
    return this.cactiApiService.addGenus({ name })
      .pipe(take(1), tap(genus => this.genre0?.push(genus)));
  }

  public addSpecie(name: string, genusId: string): Observable<Specie> {
    return this.cactiApiService.addSpecie({ name, genusId })
      .pipe(take(1), tap(specie => this.species0?.push(specie)));
  }

  public addForm(name: string, specieId: string): Observable<Form> {
    return this.cactiApiService.addForm({ name, specieId })
      .pipe(take(1), tap(genus => this.forms0?.push(genus)));
  }

  public addCactus(number: string): Observable<CactusSmall> {
    return this.cactiApiService.addCactus({ number })
      .pipe(take(1), tap(caucus => this.cacti0?.push(caucus)));
  }

  /* --- update methods ---  */

  public updateGenus(id: string, name: string): void {
    this.cactiApiService.updateGenus(id, { name })
      .pipe(take(1))
      .subscribe(genus => {
        const old = this.genre0?.find(g => g.id === id);
        if (old) {
          old.name = genus.name;
        }
      });
  }

  public updateSpecie(id: string, name: string, genusId: string): void {
    this.cactiApiService.updateSpecie(id, { name, genusId })
      .pipe(take(1))
      .subscribe(specie => {
        const old = this.species0?.find(s => s.id === id);
        if (old) {
          old.name = specie.name;
          old.genusId = specie.genusId;
        }
      });
  }

  public updateForm(id: string, name: string, specieId: string): void {
    this.cactiApiService.updateForm(id, { name, specieId })
      .pipe(take(1))
      .subscribe(form => {
        const old = this.forms0?.find(f => f.id === id);
        if (old) {
          old.name = form.name;
          old.specieId = form.specieId;
        }
      });
  }

  public updateCactus(id: string, cactus: Cactus): Observable<Cactus> {
    return this.cactiApiService.updateCactus(id, cactus)
      .pipe(
        take(1),
        tap(caucus => {
          const old = this.cacti0?.find(c => c.id === id);
          if (old) {
            old.number = cactus.number;
            old.genusId = caucus.genusId;
            old.specieId = caucus.specieId;
            old.formId = cactus.formId;
          }
        })
      );
  }

  public uploadCactusImages(id: string, images: FileList): Observable<void> {
    return this.cactiApiService.uploadCactusImages(id, images).pipe(take(1));
  }

  /* --- internal methods ---  */

  private update(): void {
    forkJoin({
      genre: this.cactiApiService.findGenre(),
      species: this.cactiApiService.findSpecie(),
      forms: this.cactiApiService.findForms(),
      careGroups: this.cactiApiService.findCareGroups(),
      cacti: this.cactiApiService.findCacti()
    })
      .pipe(take(1))
      .subscribe(({ forms, genre, species, careGroups, cacti }) => {
        this.genre0 = genre;
        this.species0 = species;
        this.forms0 = forms;
        this.careGroups0 = careGroups;
        this.cacti0 = cacti;
        console.log(`Updated cacti cache: ${genre.length} genre, ${species.length} species, ${forms.length} forms, ${careGroups.length} care groups, ${cacti.length} cacti`);
      }, error => {
        console.error('Unable to update cacti cache.', error);
      });
  }
}
