import {Component, HostListener, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {catchError, mergeMap, of, Subscription} from "rxjs";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {Cactus} from "../../../../api/cacti/cacti.domain";
import {CactiCactusFormComponent} from "../cacti-cactus-form/cacti-cactus-form.component";
import {NotificationService} from "../../../../components/notification/notification.service";
import {ComponentCanDeactivate} from "../../../../utils/pending-changes.guard";

@Component({
  selector: "app-cacti-datasheet",
  templateUrl: "./cacti-datasheet.component.html",
  styleUrls: ["./cacti-datasheet.component.scss"],
})
export class CactiDatasheetComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  protected cactus: Cactus | null = null;
  private subscription?: Subscription;

  @ViewChild(CactiCactusFormComponent)
  private form?: CactiCactusFormComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cactusService: CactiCactusService,
    private readonly notificationService: NotificationService,
  ) {
  }

  public ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(mergeMap(({id}) => this.cactusService.get(id).pipe(catchError(() => of(null)))))
      .subscribe(cactus => this.cactus = cactus);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener("window:beforeunload")
  public canDeactivate(): boolean {
    return !this.form || !this.form.isDirty();
  }

  protected update(): void {
    if (!this.cactus) {
      return;
    }

    const cactus = this.form?.getValue();

    if (!cactus) {
      this.notificationService.error("Du versuchst eine nicht valide Eingabe zu speichern.");
      return;
    }

    this.cactusService.set(this.cactus.id, cactus)
      .subscribe({
        next: cactus => {
          this.cactus = cactus;
          this.notificationService.success(`Der Kaktus mit der Nummer ${cactus.number} wurde gespeichert.`);
        },
        error: () => this.notificationService.error(`Der Kaktus ${cactus.number} konnte nicht gespeichert werden.`),
      });
  }
}
