import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  QueryList
} from '@angular/core';
import { TextFieldRefDirective } from './text-field-ref.directive';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements AfterViewInit {

  public readonly focusEvent = new EventEmitter<boolean>();
  @ContentChild(TextFieldRefDirective)
  private fieldRef?: TextFieldRefDirective;
  @ContentChild(AutocompleteComponent)
  private autoComplete?: AutocompleteComponent;
  @ContentChildren(ErrorComponent)
  private errors!: QueryList<ErrorComponent>;

  @HostBinding('class.empty')
  get empty(): boolean {
    return !this.fieldRef?.value;
  }

  @HostBinding('class.error')
  get error(): boolean {
    return 0 < this.errors.length;
  }

  ngAfterViewInit(): void {
    if (this.fieldRef) {
      this.fieldRef.field = this;
    }
    else {
      console.error('Could not find ', TextFieldRefDirective, ' please consider adding one.');
    }
  }

  public onKeyDown(event: KeyboardEvent): boolean {
    if (!this.autoComplete) {
      return true;
    }

    switch (event.key) {
      case 'ArrowDown':
        this.autoComplete.navigateDown();
        return false;
      case 'ArrowUp':
        this.autoComplete.navigateUp();
        return false;
      case 'Enter':
        this.autoComplete.selectCurrent();
        return false;
      default:
        return true;
    }
  }

  @HostListener('click')
  private onClick(): boolean {
    if (!this.fieldRef) {
      return false;
    }
    this.fieldRef.focus();
    return true;
  }
}
