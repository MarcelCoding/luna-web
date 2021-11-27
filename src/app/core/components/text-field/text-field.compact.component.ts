import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  HostListener,
  QueryList
} from '@angular/core';
import { TextFieldRefDirective } from './text-field-ref.directive';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ErrorComponent } from '../error/error.component';
import { TextFieldBaseComponent } from './text-field.base.component';

@Component({
  selector: 'app-text-field-compact',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.compact.component.scss']
})
export class TextFieldCompactComponent extends TextFieldBaseComponent implements AfterViewInit {

  @ContentChild(TextFieldRefDirective)
  protected fieldRef?: TextFieldRefDirective;
  @ContentChild(AutocompleteComponent)
  protected autoComplete?: AutocompleteComponent;
  @ContentChildren(ErrorComponent)
  protected errors!: QueryList<ErrorComponent>;

  @HostBinding('class.empty')
  get empty(): boolean {
    return super.empty0;
  }

  @HostBinding('class.error')
  get error(): boolean {
    return super.error0;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit0();
  }

  @HostListener('click')
  protected onClick(): boolean {
    return super.onClick0();
  }
}
