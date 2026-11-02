import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMG, img } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { CounterComponent } from '../../shared/components/counter.component';

@Component({
  selector: 'app-about', standalone: true, imports: [RouterLink, RevealOnScrollDirective, SectionHeadingComponent, CounterComponent],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">About us</p><h1>Harare's builders of choice</h1></div></section>
  <section class="section"><div class="container split">
    <img appRevealOnScroll="left" class="rounded-img" [src]="photo" alt="MOLANDE crew on site in Harare" loading="lazy">
    <div appRevealOnScroll="right">
      <p class="eyebrow">Our story</p><h2>Craftsmanship with integrity</h2>
      <p>MOLANDE Construction is a Harare-based contractor delivering homes, commercial premises and civil works. </p>
      <p>Our promise is simple: honest quotes, skilled people and finished work we are proud to put our name on.</p>
    </div>
  </div></section>
  <section class="section section--alt"><div class="container grid grid--3">
    <div class="why why--light" appRevealOnScroll><h3>Mission</h3><p>To build durable, affordable and beautiful structures that serve Zimbabwean families and businesses.</p></div>
    <div class="why why--light" appRevealOnScroll [revealDelay]="100"><h3>Vision</h3><p>To be Zimbabwe's most trusted construction brand, known for quality and reliability.</p></div>
    <div class="why why--light" appRevealOnScroll [revealDelay]="200"><h3>Values</h3><p>Safety, integrity, craftsmanship, accountability and community.</p></div>
  </div></section>
  <section class="stats"><div class="container stats__grid">
    <app-counter [end]="120" label="Projects Completed" /><app-counter [end]="12" label="Years of Experience" />
    <app-counter [end]="95" label="Happy Clients" /><app-counter [end]="48" label="Team Members" />
  </div></section>
  <section class="section"><div class="container"><app-section-heading eyebrow="Leadership" title="The team behind the work" />
    <div class="grid grid--3">
      @for (m of team; track m.name; let i = $index) {
        <div class="member" appRevealOnScroll [revealDelay]="i * 100"><p>{{m.fname}}</p><h3>{{ m.name }}</h3><p>{{ m.role }}</p></div>
      }
    </div>
    <p class="center"><a routerLink="/contact" class="btn btn--primary">Work with us</a></p>
  </div></section>`,
})
export class AboutComponent {
  photo = img(IMG.crew, 900);
  team = [
    { name: 'Managing Director', role: 'Founder', fname: 'Promise' },
    { name: 'Head of Projects', role: 'Civil Engineer', fname: 'Takudzwa' },
    { name: 'Chief Quantity Surveyor', role: 'Costing & Contracts', fname: 'Nokutenda' },
  ];
  constructor() { inject(SeoService).set('About Us', 'Meet MOLANDE Construction, a Harare building contractor focused on quality, safety and integrity.'); }
}
