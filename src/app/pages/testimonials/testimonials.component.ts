import { Component, inject } from '@angular/core';
import { TESTIMONIALS } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { TestimonialSliderComponent } from '../../shared/components/testimonial-slider.component';

@Component({
  selector: 'app-testimonials', standalone: true, imports: [RevealOnScrollDirective, TestimonialSliderComponent],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">Testimonials</p><h1>What our clients say</h1></div></section>
  <section class="section"><div class="container"><app-testimonial-slider /></div></section>
  <section class="section section--alt"><div class="container grid grid--2">
    @for (t of items; track t.name; let i = $index) {
      <figure class="tcard" appRevealOnScroll [revealDelay]="(i % 2) * 100">
        <div class="stars">{{ '★'.repeat(t.rating) }}</div><blockquote>“{{ t.quote }}”</blockquote>
        <figcaption><img [src]="t.photo" [alt]="t.name" width="48" height="48" loading="lazy"><span><strong>{{ t.name }}</strong><br>{{ t.role }}</span></figcaption>
      </figure>
    }
  </div></section>`,
})
export class TestimonialsComponent {
  items = TESTIMONIALS;
  constructor() { inject(SeoService).set('Client Testimonials', 'Read reviews from homeowners and businesses who built with MOLANDE in Harare.'); }
}
