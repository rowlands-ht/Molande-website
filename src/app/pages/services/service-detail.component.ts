import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG, PROJECTS, SERVICES, STEPS, img } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { FaqComponent } from '../../shared/components/faq.component';

/** One template serves every /services/:slug route. Add per-service copy/images in site-data.ts. */
@Component({
  selector: 'app-service-detail', standalone: true, imports: [RouterLink, RevealOnScrollDirective, FaqComponent],
  template: `
  @if (svc(); as s) {
    <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light"><a routerLink="/services">Services</a> / {{ s.title }}</p><h1>{{ s.icon }} {{ s.title }}</h1></div></section>
    <section class="section"><div class="container split">
      <div appRevealOnScroll="left">
        <h2>{{ s.short }}</h2>
        <p>MOLANDE provides professional {{ s.title.toLowerCase() }} across Harare and surrounding areas. </p>
        <ul class="ticks">@for (f of s.features; track f) { <li>{{ f }}</li> }</ul>
        <a routerLink="/contact" class="btn btn--primary">Request a quote</a>
      </div>
      <img appRevealOnScroll="right" class="rounded-img" [src]="photo" [alt]="s.title + ' by MOLANDE'" loading="lazy">
    </div></section>
    <section class="section section--alt"><div class="container">
      <h2 class="center">How it works</h2>
      <ol class="mini-steps">@for (st of steps; track st.t; let i = $index) { <li appRevealOnScroll [revealDelay]="i * 80"><b>{{ i + 1 }}</b> {{ st.t }}</li> }</ol>
    </div></section>
    <section class="section"><div class="container narrow"><h2 class="center">FAQ</h2><app-faq /></div></section>
  } @else {
    <section class="page-hero"><div class="container"><h1>Service not found</h1><a routerLink="/services" class="btn btn--primary">All services</a></div></section>
  }`,
})
export class ServiceDetailComponent {
  slug = input<string>();                       // bound from the route by withComponentInputBinding()
  svc = computed(() => SERVICES.find(s => s.slug === this.slug()));
  steps = STEPS;
  photo = img(IMG.frame, 900);
  constructor() {
    const seo = inject(SeoService);
    effect(() => { const s = this.svc(); if (s) seo.set(s.title, `${s.short} Professional ${s.title.toLowerCase()} in Harare, Zimbabwe.`); });
  }
}
