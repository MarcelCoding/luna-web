import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { slideDownAnimation } from '../../animations/slide-down.animation';

@Component({
  selector: 'app-tree-view-item',
  templateUrl: './tree-view-item.component.html',
  styleUrls: ['./tree-view-item.component.scss'],
  animations: [slideDownAnimation]
})
export class TreeViewItemComponent {

  @Input()
  name = '';

  @Input()
  leaf = false;
  expanded = false;
  @Output()
  private selectThis = new EventEmitter<void>();
  @ContentChildren(TreeViewItemComponent)
  private childTreeViews!: QueryList<TreeViewItemComponent>;

  public click(): void {
    if (this.leaf) {
      this.selectThis.emit();
    }
    else if (this.name) {
      this.expanded = !this.expanded;
      if (this.childTreeViews.length === 1 && !this.childTreeViews.first.leaf) {
        this.childTreeViews.first.click();
      }
    }
  }
}
