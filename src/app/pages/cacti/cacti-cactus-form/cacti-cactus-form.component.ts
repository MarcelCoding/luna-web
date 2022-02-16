import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cacti-cactus-form',
  templateUrl: './cacti-cactus-form.component.html',
  styleUrls: ['./cacti-cactus-form.component.scss']
})
export class CactiCactusFormComponent {

  public readonly form = new FormGroup({
    number: new FormControl(null, Validators.required),
    genusName: new FormControl(),
    specieName: new FormControl(),
    formName: new FormControl(),
    fieldNumber: new FormControl()
  });
}
