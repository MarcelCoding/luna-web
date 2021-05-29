import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {

  @Input()
  public itemId?: string;

  public autoComplete?: AutocompleteComponent;

  @HostBinding('class.selected')
  private selected0 = false;

  constructor(
    private readonly eleRef: ElementRef<HTMLElement>
  ) {
  }

  get selected(): boolean {
    return this.selected0;
  }

  set selected(value: boolean) {
    // TODO: ngAfterViewChanged Error... (line 44)
    this.selected0 = value;
    if (this.selected0) {
      this.eleRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('click')
  private onClick(): boolean {
    this.autoComplete?.select(this);
    return false;
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    // TODO: see line 29
    setTimeout(() => {
      this.autoComplete?.reset();
      this.selected0 = true;
    }, 0);
  }
}
