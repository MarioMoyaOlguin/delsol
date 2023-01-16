import { trigger, state, style, animate, transition, } from '@angular/animations';

export const fade = trigger('fadeInOut', [
    state('void', style({opacity: 0, transform: 'translateY(-10px)'})),
    transition(':enter', [
      animate(150)
    ]),
    transition(':leave', [
      animate(150, style({opacity: 0}))
    ])
]);



