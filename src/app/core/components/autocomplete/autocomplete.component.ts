import { AfterViewInit, Component, ContentChildren, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { OptionComponent } from '../option/option.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterViewInit, OnDestroy {

  @Output()
  private readonly option = new EventEmitter<string>();
  @ContentChildren(OptionComponent)
  private options!: QueryList<OptionComponent>;
  private changesSubscription?: Subscription;

  ngAfterViewInit(): void {
    this.changesSubscription = this.options.changes.subscribe(newOptions => {
      this.reset();
      newOptions.forEach((option: OptionComponent) => option.autoComplete = this);
    });
  }

  ngOnDestroy() {
    this.changesSubscription?.unsubscribe();
  }

  public reset(): void {
    this.options.forEach(o => o.selected = false);
  }

  public navigateUp(): void {
    if (!this.options.length) {
      return;
    }

    const current = this.findSelected();

    const old = this.options.get(current);
    if (old) old.selected = false;

    if (0 < current) {
      // @ts-expect-error
      this.options.get(current - 1).selected = true;
    }
    else {
      this.options.last.selected = true;
    }
  }

  public navigateDown(): void {
    if (!this.options.length) {
      return;
    }

    const current = this.findSelected();

    const old = this.options.get(current);
    if (old) old.selected = false;

    const next = current + 1;
    if (next < this.options.length) {
      // @ts-expect-error
      this.options.get(next).selected = true;
    }
    else {
      this.options.first.selected = true;
    }
  }

  public selectCurrent(): void {
    const current = this.options.get(this.findSelected());

    if (current?.itemId) {
      this.select(current);
    }
  }

  public select(option: OptionComponent): void {
    option.selected = false;
    this.option.emit(option.itemId);
  }

  private findSelected(): number {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options.get(i)?.selected) {
        return i;
      }
    }

    return -1;
  }
}
