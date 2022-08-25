import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CactusHistoryEntry} from "../../../../api/cacti/cacti.domain";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {NotificationService} from "../../../../components/notification/notification.service";
import {formatISO} from "date-fns";

@Component({
  selector: 'app-cacti-history-entry',
  templateUrl: './cacti-history-entry.component.html',
  styleUrls: ['./cacti-history-entry.component.scss']
})
export class CactiHistoryEntryComponent implements OnChanges {

  @Input()
  public cactusId?: string;

  @Input()
  public entry?: CactusHistoryEntry;

  protected readonly form = new FormGroup({
    date: new FormControl<string | null>(null, Validators.required),
    content: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private readonly cactusService: CactiCactusService,
    private readonly notificationService: NotificationService,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['entry']) {
      const entry: CactusHistoryEntry = changes['entry'].currentValue;

      this.form.reset();

      if (entry) {
        this.form.setValue(entry);
      }
    }
  }

  protected add(): void {
    if (!this.cactusId) {
      return;
    }

    const entry = this.getValue();
    if (!entry) {
      return;
    }

    const formatted = new Intl.DateTimeFormat('de-DE').format(new Date(entry.date));

    this.cactusService.addHistoryEntry(this.cactusId, entry)
      .subscribe({
        next: () => this.notificationService.success(`Der Kakteen Chronik Eintrag vom ${formatted} wurde erstellt.`),
        error: () => this.notificationService.error(`Der Kakteen Chronik Eintrag vom ${formatted} konnte nicht erstellt werden.`)
      });
  }

  public getValue(): CactusHistoryEntry | null {
    if (this.form.valid) {
      const value = this.form.value;
      const date = new Date(value.date!);

      return {
        date: formatISO(date, {representation: "date"}),
        content: value.content!,
      };
    }
    else {
      return null;
    }
  }
}
