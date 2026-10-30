import { Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Magnetic hover: element drifts slightly toward the pointer. Disabled on touch / reduced motion. */
@Directive({
  selector: '[appMagnetic]', standalone: true,
  host: { '(mousemove)': 'move($event)', '(mouseleave)': 'reset()' },
})
export class MagneticDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private on = isPlatformBrowser(inject(PLATFORM_ID)) &&
    matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches;

  move(e: MouseEvent) {
    if (!this.on) return;
    const r = this.el.nativeElement.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    this.el.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  reset() { this.el.nativeElement.style.transform = ''; }
}
