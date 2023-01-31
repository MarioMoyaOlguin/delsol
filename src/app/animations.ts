import { trigger, state, style, animate, transition, } from '@angular/animations';

export const fade = trigger('fadeInOut', [
    state('void', style({opacity: 0})),
    transition(':enter', [
      animate(100)
    ]),
    transition(':leave', [
      animate(100)
    ])
]);



