import {Component} from '@angular/core';
import {NotificationService} from "../notification.service";
import {Notification} from "../notification.domain";
import {IdHolder} from "../../../api/api.domain";
import {fadeAnimation} from "../../../animations/fade.animation";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  animations: [fadeAnimation]
})
export class NotificationListComponent {

  constructor(
    private readonly notificationService: NotificationService
  ) {
  }

  public get notifications(): Notification[] {
    return this.notificationService.notifications;
  }

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }
}
