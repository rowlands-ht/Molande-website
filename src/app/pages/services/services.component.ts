import { Component, inject } from '@angular/core';
import { SERVICES } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ServiceCardComponent } from '../../shared/components/service-card.component';

@Component({
  selector: 'app-services', standalone: true, imports: [ServiceCardComponent, RevealOnScrollDirective],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">Services</p><h1>Everything you need to build</h1></div></section>
  <section class="section"><div class="container grid grid--3">
    @for (s of services; track s.slug; let i = $index) { <app-service-card [s]="s" appRevealOnScroll [revealDelay]="(i % 3) * 90" /> }
  </div></section>`,
})
export class ServicesComponent {
  services = SERVICES;
  constructor() { inject(SeoService).set('Construction Services', 'General construction, residential, commercial, roofing, renovations, civil works and more in Harare.'); }
}
