import {Component, ViewChild} from '@angular/core';
import {CactiCactusFormComponent} from "../cacti-cactus-form/cacti-cactus-form.component";
import {NotificationService} from "../../../../components/notification/notification.service";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-cacti-new-cactus',
  templateUrl: './cacti-new-cactus.component.html',
  styleUrls: ['./cacti-new-cactus.component.scss']
})
export class CactiNewCactusComponent {

  @ViewChild(CactiCactusFormComponent)
  private form?: CactiCactusFormComponent;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly cactusService: CactiCactusService,
    private readonly router: Router
  ) {
  }

  public create(): void {
    const cactus = this.form?.getValue();

    if (!cactus) {
      this.notificationService.error("Du versuchst eine nicht valide Eingabe zu speichern.");
      return;
    }

    this.cactusService.add(cactus)
      .subscribe({
        next: cactus => {
          this.notificationService.success(`Der Kaktus mit der Nummer ${cactus.number} wurde erstellt.`);
          this.router.navigate(['cacti', cactus.id, 'datasheet']);
        },
        error: () => this.notificationService.error(`Der Kaktus ${cactus.number} konnte nicht erstellt werden.`),
      });
  }
}
