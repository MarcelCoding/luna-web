import {Component} from "@angular/core";
import {slideDownAnimation} from "../../../animations/slide-down.animation";

@Component({
  selector: "app-tree-view-node",
  templateUrl: "./tree-view-node.component.html",
  styleUrls: ["../tree-view.common.scss", "./tree-view-node.component.scss"],
  animations: [slideDownAnimation],
})
export class TreeViewNodeComponent {

  protected expanded = false;

  protected toggle(): void {
    this.expanded = !this.expanded;
  }
}
