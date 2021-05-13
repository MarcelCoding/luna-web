import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CactusHistoryEntry } from '../../../core/data/cacti';
import { CactiApiService } from '../../../core/data/cacti/cacti-api.service';

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
    private readonly cactiApiService: CactiApiService
  ) {
  }

  saveEntry() {
    if (this.cactusId && this.form.value) {
      if (this.entry) {
        this.cactiApiService.updateCactusHistoryEntry(this.cactusId, this.entry?.date, this.form.value)
          .subscribe();
      }
      else {
        this.cactiApiService.addCactusHistoryEntry(this.cactusId, this.form.value).subscribe();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.reset();
    if (this.entry) {
      this.form.patchValue(this.entry);
    }
  }
}
