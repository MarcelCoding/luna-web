import { Component, HostBinding, Input } from '@angular/core';

export type ButtonType = 'default' | 'green' | 'yellow' | 'red';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  @HostBinding('class.disabled')
  public disabled = false;

  @Input()
  @HostBinding('classList')
  public type: ButtonType = 'default';
}
