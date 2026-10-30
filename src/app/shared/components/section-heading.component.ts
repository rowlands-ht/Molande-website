import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-section-heading', standalone: true, imports: [RevealOnScrollDirective],
  template: `
    <div class="sh" [class.sh--center]="center" appRevealOnScroll>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      @if (sub) { <p class="sh__sub">{{ sub }}</p> }
    </div>`,
})
export class SectionHeadingComponent {
  @Input() eyebrow = ''; @Input() title = ''; @Input() sub = ''; @Input() center = true;
}
