import { Component, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FAQS } from '../../core/data/site-data';

/** Accordion using Angular Animations for the height transition. */
@Component({
  selector: 'app-faq', standalone: true,
  animations: [trigger('open', [
    state('false', style({ height: '0', opacity: 0, paddingTop: 0, paddingBottom: 0 })),
    state('true', style({ height: '*', opacity: 1 })),
    transition('false <=> true', animate('280ms cubic-bezier(.2,.8,.2,1)')),
  ])],
  template: `
    <div class="faq">
      @for (f of faqs; track f.q; let i = $index) {
        <div class="faq__item" [class.faq__item--open]="current() === i">
          <h3><button type="button" (click)="toggle(i)" [attr.aria-expanded]="current() === i" [attr.aria-controls]="'faq' + i">
            {{ f.q }}<span aria-hidden="true">+</span></button></h3>
          <div class="faq__a" [id]="'faq' + i" [@open]="current() === i" role="region"><p>{{ f.a }}</p></div>
        </div>
      }
    </div>`,
})
export class FaqComponent {
  faqs = FAQS; current = signal<number | null>(0);
  toggle(i: number) { this.current.set(this.current() === i ? null : i); }
}
