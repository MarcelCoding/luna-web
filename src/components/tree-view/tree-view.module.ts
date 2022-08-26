import {NgModule} from '@angular/core';
import {TreeViewNodeComponent} from './tree-view-node/tree-view-node.component';
import {TreeViewLeafComponent} from './tree-view-leaf/tree-view-leaf.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [TreeViewNodeComponent, TreeViewLeafComponent],
  imports: [RouterModule],
  exports: [TreeViewNodeComponent, TreeViewLeafComponent]
})
export class TreeViewModule {
}
