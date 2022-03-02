import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CactiService} from "../../../../api/cacti/cacti.service";
import {IdHolder} from "../../../../api/api.domain";
import {CareGroup} from "../../../../api/cacti/cacti.domain";
import {Subscription} from "rxjs";

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
    private readonly cactiService: CactiService
  ) {
  }

  public ngOnInit(): void {
    this.careGroupSubscription = this.form.get('careGroup')?.get('name')?.valueChanges
      .subscribe(term => {
        this.searchedCareGroups = this.cactiService.searchCareGroups(term);

        // if (this.searchedCareGroups.length === 1 && this.searchedCareGroups[0].name.toLowerCase() === term.toLowerCase().trim()) {
        //   this.selectCareGroup(this.searchedCareGroups[0].id);
        // }
      });
  }

  public ngOnDestroy(): void {
    this.careGroupSubscription?.unsubscribe();
  }

  public trackBy(index: number, {id}: IdHolder): string {
    return id;
  }

  public selectCareGroup(id: string): void {
    const {name} = this.cactiService.getCareGroup(id)!;
    this.form.get('careGroup')?.setValue({id, name});
  }
}
