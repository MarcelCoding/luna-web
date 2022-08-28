import {Component, HostListener, OnDestroy, OnInit, QueryList, ViewChildren} from "@angular/core";
import {CactusHistoryEntry} from "../../../../api/cacti/cacti.domain";
import {catchError, filter, forkJoin, map, mergeMap, Observable, of, Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {CactiHistoryEntryComponent} from "../cacti-history-entry/cacti-history-entry.component";
import {NotificationService} from "../../../../components/notification/notification.service";
import {ComponentCanDeactivate} from "../../../../utils/pending-changes.guard";

@Component({
  selector: "app-cacti-history",
  templateUrl: "./cacti-history.component.html",
  styleUrls: ["./cacti-history.component.scss"],
})
export class CactiHistoryComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  protected cactusId: string | null = null;
  protected history: CactusHistoryEntry[] | null = null;
  private subscription?: Subscription;

  @ViewChildren(CactiHistoryEntryComponent)
  private entries!: QueryList<CactiHistoryEntryComponent>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cactusService: CactiCactusService,
    private readonly notificationService: NotificationService,
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

  @HostListener("window:beforeunload")
  public canDeactivate(): boolean {
    return !this.entries.find(entry => entry.isDirty());
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
          tap(entry => this.notificationService.success(`Der Kakteen Chronik Eintrag vom ${new Intl.DateTimeFormat("de-DE").format(new Date(entry.date))} wurde gespeichert.`)),
          map(updated => ({date: entry!.entry!.date, updated})),
          catchError(() => {
            this.notificationService.error(`Der Kakteen Chronik Eintrag vom ${new Intl.DateTimeFormat("de-DE").format(new Date(value.date))} konnte nicht gespeichert werden.`);
            return of(null);
          }),
          filter(e => Boolean(e)),
        );
    })
      .filter(d => Boolean(d)) as Observable<{ date: string, updated: CactusHistoryEntry }> [];

    forkJoin(update).subscribe(entries => {
      if (!this.history) {
        return;
      }

      this.history.filter(entry => !entries.find(e => e.date === entry.date));
      this.history.push(...entries.map(entry => entry.updated));
      this.history.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    });
  }

  protected trackBy(index: number, {date}: CactusHistoryEntry): string {
    return date;
  }
}
