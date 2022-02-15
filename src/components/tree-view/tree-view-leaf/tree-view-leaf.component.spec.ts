import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TreeViewLeafComponent} from './tree-view-leaf.component';

describe('TreeViewLeafComponent', () => {
  let component: TreeViewLeafComponent;
  let fixture: ComponentFixture<TreeViewLeafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeViewLeafComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewLeafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
