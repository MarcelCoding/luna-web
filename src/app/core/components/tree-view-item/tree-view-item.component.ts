import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { slideDownAnimation } from '../../animations/slide-down.animation';

@Component({
  selector: 'app-tree-view-item',
  templateUrl: './tree-view-item.component.html',
  styleUrls: ['./tree-view-item.component.scss'],
  animations: [slideDownAnimation]
})
export class TreeViewItemComponent implements OnChanges {

  @Input()
  name = '';

  @Input()
  placeholder = 'Loading...';

  @Input()
  leaf = false;
  expanded = false;
  control = new FormControl('', [Validators.required]);
  @Output()
  private save = new EventEmitter<string>();
  @Output()
  private selectThis = new EventEmitter<void>();
  @ContentChildren(TreeViewItemComponent)
  private childTreeViews!: QueryList<TreeViewItemComponent>;

  @HostBinding('class.edited')
  get edited(): boolean {
    return !this.name && this.control.value || this.name && this.name !== this.control.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      this.control.setValue(changes.name.currentValue);
    }
  }

  public clickIcon(): void {
    if (this.leaf) {
      this.selectThis.emit();
    }
    else if (this.name) {
      this.expanded = !this.expanded;
      if (this.childTreeViews.length === 1 && !this.childTreeViews.first.leaf) {
        this.childTreeViews.first.clickIcon();
      }
    }
  }

  public save0(): void {
    const value = this.control.value?.trim();
    if (value && value !== this.name) {
      this.save.emit(value);
      if (!this.name) {
        this.control.reset();
      }
    }
  }
}
