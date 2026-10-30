import { Component, inject } from '@angular/core';
import { POSTS, img } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

/** Blog listing. To add full articles later, create a /blog/:slug route like services/:slug. */
@Component({
  selector: 'app-blog', standalone: true, imports: [RevealOnScrollDirective],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">News & insights</p><h1>Building know-how</h1></div></section>
  <section class="section"><div class="container grid grid--3">
    @for (p of posts; track p.title; let i = $index) {
      <article class="post" appRevealOnScroll [revealDelay]="i * 90">
        <img [src]="src(p.image)" [alt]="p.title" loading="lazy" width="600" height="400">
        <div class="post__b"><small>{{ p.tag }} · {{ p.date }}</small><h3>{{ p.title }}</h3><p>{{ p.excerpt }}</p><span class="svc__more">Read more →</span></div>
      </article>
    }
  </div></section>`,
})
export class BlogComponent {
  posts = POSTS; src = (id: string) => img(id, 700);
  constructor() { inject(SeoService).set('Blog & News', 'Construction tips, roofing advice and renovation guides for Harare property owners.'); }
}
