import {Injectable} from '@angular/core';
import {Cactus, CactusHistoryEntry, CactusSmall, CactusWithoutId, CareGroup, Form, Genus, Specie} from "./cacti.domain";
import {CactiApiService} from "./cacti-api.service";
import {forkJoin, Observable, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CactiService {

  private static readonly EMPTY_ARRAY = [];

  private genre?: Genus[];
  private species?: Specie[];
  private forms?: Form[];
  private careGroups?: CareGroup[];
  private cacti?: CactusSmall[];

  constructor(
    private cactiApiService: CactiApiService
  ) {
    this.update();
  }

  /* --- query methods ---  */

  public getGenus(id: string): Genus | undefined {
    return this.genre?.find(genus => genus.id === id);
  }

  public getGenusByName(name: string): Genus | undefined {
    return this.genre?.find(genus => genus.name === name);
  }

  public getGenre(): Genus[] {
    return this.genre ?? CactiService.EMPTY_ARRAY;
  }

  public searchGenre(token?: string): Genus[] {
    if (!this.genre) {
      return CactiService.EMPTY_ARRAY;
    }

    const token0 = token?.toLowerCase().trim();

    return token0?.length
      ? this.genre.filter(genus => genus.name.toLowerCase().includes(token0))
      : this.genre;
  }

  public getSpecie(id: string): Specie | undefined {
    return this.species?.find(specie => specie.id === id);
  }

  public getSpecieByNameAndGenus(name: string, genusId: string): Specie | undefined {
    return this.species?.find(specie => specie.name === name && specie.genusId === genusId);
  }

  public getSpecies(): Specie[] {
    return this.species ?? CactiService.EMPTY_ARRAY;
  }

  public getSpeciesByGenus(genusId: string): Specie[] {
    return this.species?.filter(genus => genus.genusId === genusId) ?? CactiService.EMPTY_ARRAY;
  }

  public searchSpecies(genusId: string, token: string): Specie[] {
    if (!this.species || !genusId) {
      return CactiService.EMPTY_ARRAY;
    }

    const token0 = token?.toLowerCase().trim();

    return token0.length
      ? this.species.filter(specie => specie.genusId === genusId && specie.name.toLowerCase().includes(token0))
      : this.getSpeciesByGenus(genusId);
  }

  public getForm(id: string): Form | undefined {
    return this.forms?.find(forms => forms.id === id);
  }

  public getFormByNameAndSpecie(name: string, specieId: string): Form | undefined {
    return this.forms?.find(form => form.name === name && form.specieId === specieId);
  }

  public getForms(): Form[] {
    return this.forms ?? CactiService.EMPTY_ARRAY;
  }

  public getFormsByGenus(genusId: string): Form[] {
    return this.forms?.filter(form => this.getSpecie(form.specieId)?.genusId === genusId) ?? CactiService.EMPTY_ARRAY;
  }

  public getFormsBySpecie(specieId: string): Form[] {
    return this.forms?.filter(form => form.specieId === specieId) ?? CactiService.EMPTY_ARRAY;
  }

  public searchForms(specieId: string, token: string): Form[] {
    if (!this.forms || !specieId) {
      return CactiService.EMPTY_ARRAY;
    }

    const token0 = token?.toLowerCase().trim();

    return token0.length
      ? this.forms.filter(form => form.specieId === specieId && form.name.toLowerCase().includes(token0))
      : this.getFormsBySpecie(specieId);
  }

  public getCareGroup(id: string): CareGroup | undefined {
    return this.careGroups?.find(careGroup => careGroup.id === id);
  }

  public getCareGroups(): CareGroup[] {
    return this.careGroups ?? CactiService.EMPTY_ARRAY;
  }

  public searchCareGroups(token: string): CareGroup[] {
    if (!this.careGroups) {
      return CactiService.EMPTY_ARRAY;
    }

    const token0 = token?.toLowerCase().trim();

    return token0
      ? this.careGroups.filter(careGroup => careGroup.name.toLowerCase().includes(token))
      : this.careGroups;
  }

  public getCacti(): CactusSmall[] {
    return this.cacti ?? CactiService.EMPTY_ARRAY;
  }

  public getCactiByGenus(genusId: string): CactusSmall[] {
    return !this.cacti ? [] : this.cacti?.filter(cactus => cactus.genusId === genusId);
  }

  public getCactus(id: string): Observable<Cactus> {
    return this.cactiApiService.getCactus(id).pipe(take(1));
  }

  public getCactusHistory(cactusId: string): Observable<CactusHistoryEntry[]> {
    return this.cactiApiService.getCactusHistory(cactusId).pipe(take(1));
  }

  /* --- add methods ---  */

  public addGenus(name: string): Observable<Genus> {
    return this.cactiApiService.addGenus({name})
      .pipe(take(1), tap(genus => this.genre?.push(genus)));
  }

  public addSpecie(name: string, genusId: string): Observable<Specie> {
    return this.cactiApiService.addSpecie({name, genusId})
      .pipe(take(1), tap(specie => this.species?.push(specie)));
  }

  public addForm(name: string, specieId: string): Observable<Form> {
    return this.cactiApiService.addForm({name, specieId})
      .pipe(take(1), tap(genus => this.forms?.push(genus)));
  }

  public addCactus(number: string): Observable<CactusSmall> {
    return this.cactiApiService.addCactus({number})
      .pipe(take(1), tap(caucus => this.cacti?.push(caucus)));
  }

  public uploadCactusImages(id: string, images: FileList): Observable<void> {
    return this.cactiApiService.uploadCactusImages(id, images).pipe(take(1));
  }

  public addCactusHistoryEntry(cactusId: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
    return this.cactiApiService.addCactusHistoryEntry(cactusId, entry).pipe(take(1));
  }

  /* --- update methods ---  */

  // public updateGenus(id: string, genus: GenusWithoutId): void {
  //   this.cactiApiService.updateGenus(id, genus)
  //     .pipe(take(1))
  //     .subscribe(genus => {
  //       const old = this.genre?.find(g => g.id === id);
  //       if (old) {
  //         old.name = genus.name;
  //       }
  //     });
  // }
  //
  // public updateSpecie(id: string, specie: SpecieWithoutId): void {
  //   this.cactiApiService.updateSpecie(id, specie)
  //     .pipe(take(1))
  //     .subscribe(specie => {
  //       const old = this.species?.find(s => s.id === id);
  //       if (old) {
  //         old.name = specie.name;
  //         old.genusId = specie.genusId;
  //       }
  //     });
  // }
  //
  // public updateForm(id: string, form: FormWithoutId): void {
  //   this.cactiApiService.updateForm(id, form)
  //     .pipe(take(1))
  //     .subscribe(form => {
  //       const old = this.forms?.find(f => f.id === id);
  //       if (old) {
  //         old.name = form.name;
  //         old.specieId = form.specieId;
  //       }
  //     });
  // }

  public updateCactus(id: string, cactus: CactusWithoutId): Observable<Cactus> {
    return this.cactiApiService.updateCactus(id, cactus)
      .pipe(
        take(1),
        tap(caucus => {
          const old = this.cacti?.find(c => c.id === id);
          if (old) {
            old.number = cactus.number;
            old.genusId = caucus.genusId;
            old.specieId = caucus.specieId;
            old.formId = cactus.formId;
            old.fieldNumber = cactus.fieldNumber;
          }
        })
      );
  }

  public updateCactusHistoryEntry(cactusId: string, origDate: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
    return this.cactiApiService.updateCactusHistoryEntry(cactusId, origDate, entry).pipe(take(1));
  }

  /* --- internal methods ---  */

  private update(): void {
    forkJoin([
      this.cactiApiService.findGenre(),
      this.cactiApiService.findSpecie(),
      this.cactiApiService.findForms(),
      this.cactiApiService.findCareGroups(),
      this.cactiApiService.findCacti()
    ])
      .pipe(take(1))
      .subscribe({
        next: ([genre, species, forms, careGroups, cacti]) => {
          this.genre = genre;
          this.species = species;
          this.forms = forms;
          this.careGroups = careGroups;
          this.cacti = cacti.sort((a, b) => a.number.localeCompare(b.number));
          console.log(`Updated cacti cache: ${genre.length} genre, ${species.length} species, ${forms.length} forms, ${careGroups.length} care groups, ${cacti.length} cacti`);
        },
        error: error => console.error('Unable to update cacti cache.', error)
      });
  }
}
