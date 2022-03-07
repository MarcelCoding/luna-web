import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";
import {Cactus} from "../../../../api/cacti/cacti.domain";

@Component({
  selector: 'app-cacti-datasheet',
  templateUrl: './cacti-datasheet.component.html',
  styleUrls: ['./cacti-datasheet.component.scss']
})
export class CactiDatasheetComponent implements OnInit {

  public cactus?: Cactus;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cactusService: CactiCactusService
  ) {
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(mergeMap(({id}) => this.cactusService.get(id)))
      .subscribe(cactus => this.cactus = cactus);
  }
}
