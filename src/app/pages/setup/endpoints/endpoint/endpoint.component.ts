import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Endpoint } from '../../../../core/data/endpoints/endpoints.domain';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnChanges {

  @Input()
  public endpoint?: Endpoint;
  public url = new FormControl('', [Validators.required]);
  @Output()
  private use = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.url.setValue(this.endpoint?.url);
  }

  public use0(): void {
    if (this.url.valid) {
      this.use.emit(this.url.value);
    }
  }
}
