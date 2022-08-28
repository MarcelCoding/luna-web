import {Component, Input} from "@angular/core";

@Component({
  selector: "app-tree-view-leaf",
  templateUrl: "./tree-view-leaf.component.html",
  styleUrls: ["../tree-view.common.scss", "./tree-view-leaf.component.scss"],
})
export class TreeViewLeafComponent {

  @Input()
  public link?: unknown[];
}
