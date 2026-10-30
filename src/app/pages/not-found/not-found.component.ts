import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CraneArtComponent } from '../../shared/components/crane-art.component';

@Component({
  selector: 'app-not-found', standalone: true, imports: [RouterLink, CraneArtComponent],
  template: `
  <section class="nf blueprint"><div class="container">
    <app-crane-art class="nf__crane" /><h1>404</h1><p>This page is still under construction, or it never existed.</p>
    <a routerLink="/" class="btn btn--primary">Back to home</a>
  </div></section>`,
})
export class NotFoundComponent { constructor() { inject(SeoService).set('Page not found', 'The page you requested could not be found.'); } }
