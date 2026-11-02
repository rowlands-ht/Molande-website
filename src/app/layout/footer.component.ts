import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTACT, SERVICES } from '../core/data/site-data';

@Component({
  selector: 'app-footer', standalone: true, imports: [RouterLink, ReactiveFormsModule],
  template: `
  <footer class="footer">
    <div class="container footer__grid">
      <div>
        <a routerLink="/" class="logo"><span class="logo__mark">M</span><span class="logo__txt">MOLANDE<small>Construction</small></span></a>
        <p class="footer__about">Quality building, civil and fit-out works across Harare and Zimbabwe.</p>
        <div class="social">
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">f</a>
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
          <a [href]="'https://wa.me/' + c.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>
        </div>
      </div>
      <div><h4>Quick links</h4>
        <a routerLink="/about">About us</a><a routerLink="/projects">Projects</a><a routerLink="/testimonials">Testimonials</a>
        <a routerLink="/blog">Blog</a><a routerLink="/careers">Careers</a><a routerLink="/contact">Request a quote</a></div>
      <div><h4>Services</h4>
        @for (s of services.slice(0, 6); track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.title }}</a> }</div>
      <div><h4>Contact</h4>
        <p>📍 {{ c.address }}</p>
        <p><a [href]="'tel:' + c.phoneTel">📞 {{ c.phoneDisplay }}</a></p>
        <p><a [href]="'mailto:' + c.email">✉️ {{ c.email }}</a></p>
        <p>🕖 {{ c.hours }}</p>
        <form class="news" (ngSubmit)="join()">
          <label for="nl" class="sr">Email for newsletter</label>
          <input id="nl" type="email" [formControl]="email" placeholder="Newsletter email">
          <button class="btn btn--primary btn--sm" [disabled]="email.invalid">Join</button>
        </form>
        @if (joined()) { <small class="ok">Thanks, you're subscribed!</small> }
      </div>
    </div>
    <div class="container map"><iframe title="MOLANDE office location in Harare" [src]="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <div class="footer__bar container">© {{ year }} MOLANDE Construction. All rights reserved.</div>

  </footer>`,
})
export class FooterComponent {
  c = CONTACT; services = SERVICES; year = new Date().getFullYear();
  email = new FormControl('', [Validators.required, Validators.email]);
  joined = signal(false);
  // Replace the query with your exact office address / Google place for a precise pin.
  map = inject(DomSanitizer).bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=Harare,+Zimbabwe&output=embed');
  join() { if (this.email.valid) { this.joined.set(true); this.email.reset(); /* TODO: send to your mailing list API */ } }
}
