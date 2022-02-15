import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideDownAnimation = trigger('slideDown', [
  state('enter, leave', style({overflow: 'hidden'})),
  state('void', style({height: 0, overflow: 'hidden'})),
  transition('* => *', animate('150ms ease-in-out'))
]);
