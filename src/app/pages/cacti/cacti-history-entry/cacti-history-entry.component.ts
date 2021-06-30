import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CactiService, CactusHistoryEntry } from '../../../core/data/cacti';
import { NEVER, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cacti-history-entry',
  templateUrl: './cacti-history-entry.component.html',
  styleUrls: ['./cacti-history-entry.component.scss']
})
export class CactiHistoryEntryComponent implements OnChanges {

  @Input()
  cactusId?: string;

  @Input()
  entry?: CactusHistoryEntry;

  readonly form = this.fb.group({
    date: [ '', Validators.required ],
    content: [ '', Validators.required ]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly cactiService: CactiService
  ) {
  }

  saveEntry(): Observable<CactusHistoryEntry> {
    if (this.cactusId && this.form.valid) {
      if (this.entry) {
        return this.cactiService.updateCactusHistoryEntry(this.cactusId, this.entry.date, this.form.value)
          .pipe(tap(entry => this.form.reset(entry)));
      }
      else {
        return this.cactiService.addCactusHistoryEntry(this.cactusId, this.form.value)
          .pipe(tap(_ => this.form.reset()));
      }
    }

    return NEVER;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.reset();
    if (this.entry) {
      this.form.patchValue(this.entry);
    }
  }
}
