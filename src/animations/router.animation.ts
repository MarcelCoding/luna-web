import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const routerAnimation = trigger("router", [
  transition("* => *", [
    query(":enter",
      style({opacity: 0}),
      {optional: true},
    ),

    query(":leave",
      [
        style({opacity: 1}),
        animate("150ms ease-in-out", style({opacity: 0})),
      ],
      {optional: true},
    ),

    group([
      query(":enter",
        [
          style({opacity: 0}),
          animate("150ms ease-in-out", style({opacity: 1})),
        ],
        {optional: true},
      ),

      // workaround: nested router outlet children disappear before router animation completes
      // https://stackoverflow.com/q/62700946
      query(":leave *", animate(1), {optional: true}),
    ]),
  ]),
]);
