import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animate, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs';
import { SERVICES } from '../core/data/site-data';
import { ThemeService } from '../core/services/theme.service';
import { MagneticDirective } from '../shared/directives/magnetic.directive';

@Component({
  selector: 'app-navbar', standalone: true,
  imports: [RouterLink, RouterLinkActive, MagneticDirective],
  animations: [trigger('mega', [
    transition(':enter', [style({ opacity: 0, transform: 'translateY(14px)' }), animate('220ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'none' }))]),
    transition(':leave', [animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' }))]),
  ])],
  template: `
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav" [class.nav--solid]="solid()">
    <div class="container nav__in">
      <a routerLink="/" class="logo" aria-label="MOLANDE Construction home">
        <span class="logo__mark">M</span><span class="logo__txt">MOLANDE<small>Construction</small></span>
      </a>

      <nav class="nav__links" aria-label="Primary">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <div class="dd" (mouseenter)="mega.set(true)" (mouseleave)="mega.set(false)">
          <button type="button" class="dd__btn" (click)="mega.set(!mega())" [attr.aria-expanded]="mega()" aria-haspopup="true">Services ▾</button>
          @if (mega()) {
            <div class="mega" @mega>
              @for (s of services; track s.slug) {
                <a [routerLink]="['/services', s.slug]" (click)="mega.set(false)"><span>{{ s.icon }}</span>{{ s.title }}</a>
              }
              <a class="mega__all" routerLink="/services" (click)="mega.set(false)">View all services →</a>
            </div>
          }
        </div>
        <a routerLink="/projects" routerLinkActive="active">Projects</a>
        <a routerLink="/testimonials" routerLinkActive="active">Testimonials</a>
        <a routerLink="/blog" routerLinkActive="active">Blog</a>
        <a routerLink="/careers" routerLinkActive="active">Careers</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </nav>

      <div class="nav__right">
        <button type="button" class="theme" (click)="theme.toggle()" [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
          {{ theme.theme() === 'dark' ? '☀️' : '🌙' }}</button>
        <a routerLink="/contact" class="btn btn--primary btn--sm nav__cta" appMagnetic>Get a Free Quote</a>
        <button type="button" class="burger" [class.burger--x]="drawer()" (click)="drawer.set(!drawer())" [attr.aria-expanded]="drawer()" aria-label="Menu">
          <span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <!-- Mobile drawer -->
  <div class="scrim" [class.scrim--on]="drawer()" (click)="close()"></div>
  <aside class="drawer" [class.drawer--on]="drawer()" [attr.aria-hidden]="!drawer()">
    <a routerLink="/" (click)="close()">Home</a>
    <a routerLink="/about" (click)="close()">About</a>
    <button type="button" class="drawer__acc" (click)="acc.set(!acc())" [attr.aria-expanded]="acc()">Services <span>{{ acc() ? '−' : '+' }}</span></button>
    <div class="drawer__sub" [class.drawer__sub--on]="acc()">
      @for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]" (click)="close()">{{ s.icon }} {{ s.title }}</a> }
    </div>
    <a routerLink="/projects" (click)="close()">Projects</a>
    <a routerLink="/testimonials" (click)="close()">Testimonials</a>
    <a routerLink="/blog" (click)="close()">Blog</a>
    <a routerLink="/careers" (click)="close()">Careers</a>
    <a routerLink="/contact" (click)="close()">Contact</a>
    <a routerLink="/contact" class="btn btn--primary" (click)="close()">Get a Free Quote</a>
  </aside>`,
})
export class NavbarComponent {
  theme = inject(ThemeService);
  services = SERVICES;
  mega = signal(false); drawer = signal(false); acc = signal(false);
  private scrolled = signal(false);
  private onHome = signal(true);
  /** Transparent only over the home hero; solid everywhere else or after scrolling. */
  solid = computed(() => this.scrolled() || !this.onHome() || this.drawer());

  constructor() {
    inject(Router).events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(e => { this.onHome.set((e as NavigationEnd).urlAfterRedirects === '/'); this.close(); });
  }
  close() { this.drawer.set(false); this.mega.set(false); }
  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 40); }
  @HostListener('document:keydown.escape') esc() { this.close(); }
}
