import {NgModule} from '@angular/core';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationComponent} from './notification/notification.component';

@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationComponent
  ],
  exports: [
    NotificationComponent,
    NotificationListComponent
  ],
})
export class NotificationModule {
}
