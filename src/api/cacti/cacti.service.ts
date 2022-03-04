import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CactiService {

  /* --- query methods ---  */

  // public searchGenre(term: string): Genus[] {
  //   if (!this.genre) {
  //     return CactiService.EMPTY_ARRAY;
  //   }
  //
  //   const term0 = term.toLowerCase().trim();
  //
  //   return term0.length
  //     ? this.genre.filter(genus => genus.name.toLowerCase().includes(term0))
  //     : this.genre;
  // }

  // public getSpecieByNameAndGenus(name: string, genusId: string): Specie | undefined {
  //   return this.species?.find(specie => specie.name === name && specie.genusId === genusId);
  // }
  //
  // public getSpeciesByGenus(genusId: string): Specie[] {
  //   return this.species?.filter(genus => genus.genusId === genusId) ?? CactiService.EMPTY_ARRAY;
  // }
  //
  // public searchSpecies(genusId: string, term: string): Specie[] {
  //   if (!this.species || !genusId) {
  //     return CactiService.EMPTY_ARRAY;
  //   }
  //
  //   const term0 = term.toLowerCase().trim();
  //
  //   return term0.length
  //     ? this.species.filter(specie => specie.genusId === genusId && specie.name.toLowerCase().includes(term0))
  //     : this.getSpeciesByGenus(genusId);
  // }

  // public getFormByNameAndSpecie(name: string, specieId: string): Form | undefined {
  //   return this.forms?.find(form => form.name === name && form.specieId === specieId);
  // }

  // public getFormsByGenus(genusId: string): Form[] {
  //   return this.forms?.filter(form => this.getSpecie(form.specieId)?.genusId === genusId) ?? CactiService.EMPTY_ARRAY;
  // }

  // public getFormsBySpecie(specieId: string): Form[] {
  //   return this.forms?.filter(form => form.specieId === specieId) ?? CactiService.EMPTY_ARRAY;
  // }
  //
  // public searchForms(specieId: string, term: string): Form[] {
  //   if (!this.forms || !specieId) {
  //     return CactiService.EMPTY_ARRAY;
  //   }
  //
  //   const term0 = term.toLowerCase().trim();
  //
  //   return term0.length
  //     ? this.forms.filter(form => form.specieId === specieId && form.name.toLowerCase().includes(term0))
  //     : this.getFormsBySpecie(specieId);
  // }

  // public getCareGroups(): CareGroup[] {
  //   return this.careGroups ?? CactiService.EMPTY_ARRAY;
  // }

  // public getCactusHistory(cactusId: string): Observable<CactusHistoryEntry[]> {
  //   return this.cactiApiService.getCactusHistory(cactusId).pipe(take(1));
  // }

  /* --- add methods ---  */

  // public uploadCactusImages(id: string, images: FileList): Observable<void> {
  //   return this.cactiApiService.uploadCactusImages(id, images).pipe(take(1));
  // }
  //
  // public addCactusHistoryEntry(cactusId: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
  //   return this.cactiApiService.addCactusHistoryEntry(cactusId, entry).pipe(take(1));
  // }

  /* --- update methods ---  */

  // public updateCactusHistoryEntry(cactusId: string, origDate: string, entry: CactusHistoryEntry): Observable<CactusHistoryEntry> {
  //   return this.cactiApiService.updateCactusHistoryEntry(cactusId, origDate, entry).pipe(take(1));
  // }
}
