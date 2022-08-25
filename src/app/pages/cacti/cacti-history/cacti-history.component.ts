import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CactusHistoryEntry} from "../../../../api/cacti/cacti.domain";
import {catchError, forkJoin, mergeMap, of, Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {CactiHistoryEntryComponent} from "../cacti-history-entry/cacti-history-entry.component";
import {NotificationService} from "../../../../components/notification/notification.service";

@Component({
  selector: 'app-cacti-history',
  templateUrl: './cacti-history.component.html',
  styleUrls: ['./cacti-history.component.scss']
})
export class CactiHistoryComponent implements OnInit, OnDestroy {

  protected cactusId: string | null = null;
  protected history: CactusHistoryEntry[] | null = null;
  private subscription?: Subscription;

  @ViewChildren(CactiHistoryEntryComponent)
  private entries!: QueryList<CactiHistoryEntryComponent>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cactusService: CactiCactusService,
    private readonly notificationService: NotificationService
  ) {
  }

  public ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(mergeMap(({id}) => this.cactusService.getHistory(this.cactusId = id).pipe(catchError(() => of(null)))))
      .subscribe(history => this.history = history);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  protected update(): void {
    if (!this.cactusId) {
      return;
    }

    const update = this.entries.map(entry => {
      const value = entry.getValue();
      if (!value || !entry.entry || (value.date === entry.entry?.date && value.content === entry.entry.content)) {
        return null;
      }

      return this.cactusService.updateHistoryEntry(this.cactusId!, entry.entry!.date, value)
        .pipe(
          tap(entry => this.notificationService.success(`Der Kakteen Chronik Eintrag vom ${new Intl.DateTimeFormat('de-DE').format(new Date(entry.date))} wurde gespeichert.`)),
          catchError(() => {
            this.notificationService.error(`Der Kakteen Chronik Eintra vom ${new Intl.DateTimeFormat('de-DE').format(new Date(value.date))} konnte nicht gespeichert werden.`);
            return of(null);
          })
        );
    })
      .filter(ele => Boolean(ele));

    forkJoin(update).subscribe();
  }

  protected trackBy(index: number, {date}: CactusHistoryEntry): string {
    return date;
  }
}
