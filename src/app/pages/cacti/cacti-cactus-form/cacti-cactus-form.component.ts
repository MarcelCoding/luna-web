import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {CareGroup} from "../../../../api/cacti/cacti.domain";
import {Subscription} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";

@Component({
  selector: 'app-cacti-cactus-form',
  templateUrl: './cacti-cactus-form.component.html',
  styleUrls: ['./cacti-cactus-form.component.scss']
})
export class CactiCactusFormComponent implements OnInit, OnDestroy {

  public readonly form = new FormGroup({
    number: new FormControl(null, Validators.required),
    genusName: new FormControl(),
    specieName: new FormControl(),
    formName: new FormControl(),
    fieldNumber: new FormControl(),
    careGroup: new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  });

  public searchedCareGroups: CareGroup[] = [];
  public careGroupSubscription?: Subscription;

  constructor(
    private readonly careGroupService: CactiCareGroupService
  ) {
  }

  public ngOnInit(): void {
    this.careGroupSubscription = this.form.get('careGroup')?.get('name')?.valueChanges
      .subscribe(term => {
        this.searchedCareGroups = this.careGroupService.searchCareGroups(term);

        // if (this.searchedCareGroups.length === 1 && this.searchedCareGroups[0].name.toLowerCase() === term.toLowerCase().trim()) {
        //   this.selectCareGroup(this.searchedCareGroups[0].id);
        // }
      });
  }

  public ngOnDestroy(): void {
    this.careGroupSubscription?.unsubscribe();
  }

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }

  public selectCareGroup(id: string): void {
    const {name} = this.careGroupService.getCareGroup(id)!;
    this.form.get('careGroup')?.setValue({id, name});
  }
}
