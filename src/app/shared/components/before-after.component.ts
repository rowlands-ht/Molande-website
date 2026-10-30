import { Component, Input, signal } from '@angular/core';

/** Drag-to-compare slider. Native range input keeps it keyboard-accessible. */
@Component({
  selector: 'app-before-after', standalone: true,
  template: `
    <div class="ba" [style.--pos]="pos() + '%'">
      <img class="ba__img" [src]="after" alt="After renovation" loading="lazy">
      <div class="ba__before"><img class="ba__img ba__img--before" [src]="before" alt="Before renovation" loading="lazy"></div>
      <span class="ba__tag ba__tag--l">Before</span><span class="ba__tag ba__tag--r">After</span>
      <span class="ba__line" aria-hidden="true"><span class="ba__knob">⇆</span></span>
      <input type="range" min="0" max="100" [value]="pos()" (input)="pos.set(+$any($event.target).value)" aria-label="Drag to compare before and after">
    </div>`,
})
export class BeforeAfterComponent {
  @Input() before = ''; @Input() after = '';
  pos = signal(50);
}
