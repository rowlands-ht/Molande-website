import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/** Dark/light mode, persisted in localStorage and applied as data-theme on <html>. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    if (!this.browser) return;
    const saved = localStorage.getItem('molande-theme') as 'light' | 'dark' | null;
    const pref = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.apply(saved ?? pref);
  }
  toggle() { this.apply(this.theme() === 'dark' ? 'light' : 'dark'); }
  private apply(t: 'light' | 'dark') {
    this.theme.set(t);
    this.doc.documentElement.setAttribute('data-theme', t);
    if (this.browser) localStorage.setItem('molande-theme', t);
  }
}
