import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
  imports: [
    CommonModule
  ]
})
export class NotificationModule {
}
