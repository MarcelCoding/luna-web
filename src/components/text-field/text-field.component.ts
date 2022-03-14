import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IdHolder} from "../../api/api.domain";
import {distinctUntilChanged, filter, map, mergeMap, Observable, Subject, Subscription, tap} from "rxjs";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
// see https://github.com/angular/angular/blob/master/packages/forms/src/directives/default_value_accessor.ts

export type FieldType = 'text' | 'multiline' | 'number' | 'date';
export type FieldFlavor = 'default' | 'compact';
export type SearchFn = (value: string) => Observable<SearchResult>;
export type GetFn = (value: string) => Observable<Entity>;
export type CreateFn = (value: string) => Observable<Entity>;
export type Entity = IdHolder<any> & { name: string };

type OnChangeFn = (_: any) => void;
type OnTouchedFn = () => void;

interface SearchRequest {
  query: string;
  silent?: boolean;
}

export interface SearchResult {
  exact?: Entity;
  result: Entity[];
  silent?: boolean;
}

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextFieldComponent}]
})
export class TextFieldComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  /* -- input -- */
  @Input() public label?: string;
  // @Input() public disabled?: boolean;
  @Input() public type: FieldType = 'text';
  @Input() public flavor: FieldFlavor = 'default';
  @Input() @HostBinding('class.search') public search?: SearchFn;
  @Input() public get?: GetFn;
  @Input() public create?: CreateFn; // TODO:
  @Output() public apply = new EventEmitter<Entity>();
  public searchResult: Entity[] | null = null;
  public selectedResult: number = 0;
  public focus: boolean = false;
  /* -- internal -- */
  @ViewChild(DefaultValueAccessor) private controlValueAccessor?: ControlValueAccessor;
  @ViewChild(CdkTextareaAutosize) private textareaAutoResize?: CdkTextareaAutosize;
  private doSearch = new Subject<SearchRequest>();
  private searchConsumer?: Subscription;
  private missedValue?: any;
  private missedDisabled?: boolean;
  private onChangeFn?: OnChangeFn;
  private onTouchFn?: OnTouchedFn;

  public ngOnInit(): void {
    this.doSearch
      .pipe(
        distinctUntilChanged(),
        // debounceTime(150),
        mergeMap(({query, silent}) => this.search!(query).pipe(map(result => ({...result, silent})))),
        tap(({result}) => {
          this.selectedResult = Math.min(this.selectedResult, result.length - 1);
          this.searchResult = result;
        }),
        filter(({exact, silent}) => {
          if (Boolean(this.onChangeFn) && Boolean(exact)) {
            return true;
          }

          if (!silent) this.onChangeFn?.(null);
          else this.searchResult = null;
          return false;
        })
      )
      .subscribe(({exact}) => {
        this.searchResult = null;
        this.apply.emit(exact);
        this.writeValue0(exact!.name);
        this.onChangeFn!(exact!.id);
      });
  }

  public ngOnDestroy(): void {
    this.searchConsumer?.unsubscribe();
  }

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }

  public onKeydown(event: KeyboardEvent) {
    if (!this.search) {
      return;
    }

    switch (event.key) {
      case "Enter":
        this.selectResult(event, this.selectedResult);
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (this.searchResult) {
          this.selectedResult++;
          event.preventDefault();

          // start from top
          if (this.selectedResult === this.searchResult.length) {
            this.selectedResult = 0;
          }
        }
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (this.searchResult) {
          this.selectedResult--;
          event.preventDefault();

          // start from bottom
          if (this.selectedResult === -1) {
            this.selectedResult = this.searchResult.length - 1;
          }
        }
    }
  }

  /* -- implementation: ControlValueAccessor - delegate to Angular Implementation -- */

  public hoverResult(i: number): void {
    this.selectedResult = i;
  }

  public selectResult(event: Event, i: number): void {
    const selected = this.searchResult?.[i];

    if (selected) {
      this.apply.emit(selected);
      this.onChangeFn?.(selected.id);
      this.writeValue0(selected.name);
      this.doSearch.next({query: selected.name, silent: true});
      event.preventDefault();
    }
  }

  public onFocus(): void {
    this.focus = true;
  }

  public onBlur(): void {
    // without timeout: autocomplete diapers before click event
    setTimeout(() => this.focus = false, 100);
  }

  public ngAfterViewInit(): void {
    if (this.missedValue) {
      this.controlValueAccessor?.writeValue(this.missedValue);

      if (this.textareaAutoResize) {
        // without reset the textarea wouldn't shrink
        this.textareaAutoResize.reset();
        this.textareaAutoResize.resizeToFitContent();
      }
    }

    if (this.missedDisabled) {
      this.controlValueAccessor?.setDisabledState?.(true);
    }

    this.controlValueAccessor?.registerOnChange(this.onChange);
    if (this.onTouchFn) this.controlValueAccessor?.registerOnTouched(this.onTouchFn);
  }

  public writeValue(value: any): void {
    if (this.get && value) {
      this.get(value)
        .subscribe({
          next: entity => this.writeValue0(entity.name || value),
          error: console.error
        });
      return;
    }

    this.writeValue0(value);
  }

  public registerOnChange(fn: OnChangeFn): void {
    this.onChangeFn = fn;
  }

  public onChange = (value: any): void => {
    if (!this.search) {
      this.searchResult = null;
      this.onChangeFn?.(value);
      return;
    }

    const trimmed = value.trim();

    if (!trimmed.length) {
      this.searchResult = null;
      this.onChangeFn?.(null);
      return;
    }

    this.doSearch.next({query: value.toLowerCase()});
  };

  public registerOnTouched(fn: OnTouchedFn): void {
    if (this.controlValueAccessor) this.controlValueAccessor.registerOnTouched(fn);
    else this.onTouchFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.controlValueAccessor) this.controlValueAccessor.setDisabledState?.(isDisabled);
    else this.missedDisabled = isDisabled;
  }

  private writeValue0(value: any): void {
    if (this.controlValueAccessor) {
      this.controlValueAccessor.writeValue(value);

      if (this.textareaAutoResize) {
        // without reset the textarea wouldn't shrink
        this.textareaAutoResize.reset();
        this.textareaAutoResize.resizeToFitContent();
      }
    }
    else this.missedValue = value;
  }
}
