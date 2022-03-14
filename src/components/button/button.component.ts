import {Component, HostBinding, Input} from '@angular/core';

export type ButtonFlavor = 'good' | 'danger';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() public label?: string;
  @Input() public link?: string;
  @Input() public flavor?: ButtonFlavor;

  @HostBinding('class.good')
  private get good(): boolean {
    return this.flavor === 'good';
  }

  @HostBinding('class.danger')
  private get danger(): boolean {
    return this.flavor === 'danger';
  }
}
