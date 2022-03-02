import {AfterContentInit, Component, ContentChildren, EventEmitter, OnDestroy, Output, QueryList} from '@angular/core';
import {AutocompleteOptionDirective} from "./autocomplete-option.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements AfterContentInit, OnDestroy {

  @Output()
  public readonly option = new EventEmitter<string>();

  @ContentChildren(AutocompleteOptionDirective, {descendants: true})
  private options?: QueryList<AutocompleteOptionDirective>;

  private optionsSubscription?: Subscription;

  public ngAfterContentInit(): void {
    this.optionsSubscription = this.options?.changes.subscribe((options: AutocompleteOptionDirective[]) => {
      options.forEach(option => {
        option.textField = this;
      });
    });
  }

  public ngOnDestroy(): void {
    this.optionsSubscription?.unsubscribe();
  }

  public selectOption(option: AutocompleteOptionDirective, value: string) {
    this.option.emit(value);
  }
}
