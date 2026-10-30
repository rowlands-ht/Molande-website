import { Component, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Animated number that counts up when scrolled into view. */
@Component({
  selector: 'app-counter', standalone: true,
  template: `<div class="counter"><span class="counter__n">{{ value() }}{{ suffix }}</span><span class="counter__l">{{ label }}</span></div>`,
})
export class CounterComponent implements OnInit, OnDestroy {
  @Input() end = 0; @Input() suffix = '+'; @Input() label = '';
  value = signal(0);
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  private io?: IntersectionObserver;

  ngOnInit() {
    if (!this.browser || matchMedia('(prefers-reduced-motion: reduce)').matches) { this.value.set(this.end); return; }
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      const t0 = performance.now(), dur = 1600;
      const tick = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        this.value.set(Math.round(this.end * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    this.io.observe(this.el.nativeElement);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}
