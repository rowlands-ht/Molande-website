import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Usage: <div appRevealOnScroll="up|left|right|zoom" [revealDelay]="150">
 * Hidden state is added only in the browser, so SSR/no-JS users still see content.
 */
@Directive({ selector: '[appRevealOnScroll]', standalone: true })
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input('appRevealOnScroll') effect: '' | 'up' | 'left' | 'right' | 'zoom' = 'up';
  @Input() revealDelay = 0;
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  private io?: IntersectionObserver;

  ngOnInit() {
    if (!this.browser || !('IntersectionObserver' in window)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const n = this.el.nativeElement;
    n.classList.add('reveal', `reveal--${this.effect || 'up'}`);
    n.style.transitionDelay = `${this.revealDelay}ms`;
    this.io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { n.classList.add('reveal--in'); this.io?.disconnect(); }
    }, { threshold: 0.12 });
    this.io.observe(n);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}
