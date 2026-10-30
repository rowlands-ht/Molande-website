import { Component, ElementRef, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CONTACT } from '../core/data/site-data';

/** Preloader, custom cursor, scroll progress, back-to-top, WhatsApp/call buttons, cookie banner. */
@Component({
  selector: 'app-chrome', standalone: true,
  template: `
    <div class="preloader" [class.preloader--gone]="loaded()" aria-hidden="true">
      <svg viewBox="0 0 120 120" width="120" height="120">
        <g class="pl__bricks">
          <rect x="10" y="90" width="48" height="16"/><rect x="62" y="90" width="48" height="16"/>
          <rect x="34" y="72" width="48" height="16"/><rect x="10" y="54" width="48" height="16"/>
          <rect x="62" y="54" width="48" height="16"/><rect x="34" y="36" width="48" height="16"/>
        </g>
      </svg>
      <p>MOLANDE</p>
    </div>

    <div class="progress" [style.width.%]="progress()"></div>
    <div class="cursor" [class.cursor--on]="cursorOn" [class.cursor--big]="big()" #cur></div>

    <div class="fabs">
      <a class="fab fab--wa" [href]="'https://wa.me/' + c.whatsapp + '?text=Hello%20MOLANDE%2C%20I%27d%20like%20a%20quote'" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬</a>
      <a class="fab fab--call" [href]="'tel:' + c.phoneTel" aria-label="Call MOLANDE">📞</a>
      <button type="button" class="fab fab--top" [class.fab--show]="showTop()" (click)="top()" aria-label="Back to top">↑</button>
    </div>

    @if (cookies()) {
      <div class="cookie" role="dialog" aria-label="Cookie consent">
        <p>We use cookies to improve your experience. By continuing you agree to their use.</p>
        <button class="btn btn--primary btn--sm" (click)="accept()">Accept</button>
      </div>
    }`,
})
export class ChromeComponent {
  c = CONTACT;
  loaded = signal(false); progress = signal(0); showTop = signal(false); big = signal(false); cookies = signal(false);
  cursorOn = false;
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    if (!this.browser) { this.loaded.set(true); return; }
    this.cursorOn = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.cookies.set(!localStorage.getItem('molande-cookies'));
    setTimeout(() => this.loaded.set(true), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1700);
  }
  @HostListener('window:scroll') onScroll() {
    const h = document.documentElement.scrollHeight - innerHeight;
    this.progress.set(h > 0 ? (scrollY / h) * 100 : 0);
    this.showTop.set(scrollY > 600);
  }
  @HostListener('document:mousemove', ['$event']) move(e: MouseEvent) {
    if (!this.cursorOn) return;
    const el = this.host.nativeElement.querySelector<HTMLElement>('.cursor');
    if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    this.big.set(!!(e.target as HTMLElement)?.closest?.('a,button,[data-magnetic]'));
  }
  top() { scrollTo({ top: 0, behavior: 'smooth' }); }
  accept() { localStorage.setItem('molande-cookies', '1'); this.cookies.set(false); }
}
