import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TESTIMONIALS } from '../../core/data/site-data';

@Component({
  selector: 'app-testimonial-slider', standalone: true,
  template: `
    <div class="ts" (mouseenter)="paused = true" (mouseleave)="paused = false" aria-live="polite">
      @for (t of items; track t.name; let i = $index) {
        <figure class="ts__slide" [class.ts__slide--on]="i === idx()">
          <img [src]="t.photo" [alt]="'Photo of ' + t.name" width="72" height="72" loading="lazy">
          <div class="stars" [attr.aria-label]="t.rating + ' out of 5 stars'">{{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}</div>
          <blockquote>“{{ t.quote }}”</blockquote>
          <figcaption><strong>{{ t.name }}</strong><span>{{ t.role }}</span></figcaption>
        </figure>
      }
      <div class="ts__dots">
        @for (t of items; track t.name; let i = $index) {
          <button type="button" [class.on]="i === idx()" (click)="idx.set(i)" [attr.aria-label]="'Show testimonial ' + (i + 1)"></button>
        }
      </div>
    </div>`,
})
export class TestimonialSliderComponent implements OnInit, OnDestroy {
  items = TESTIMONIALS; idx = signal(0); paused = false;
  private timer?: ReturnType<typeof setInterval>;
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  ngOnInit() {
    if (this.browser) this.timer = setInterval(() => { if (!this.paused) this.idx.update(i => (i + 1) % this.items.length); }, 5500);
  }
  ngOnDestroy() { clearInterval(this.timer); }
}
