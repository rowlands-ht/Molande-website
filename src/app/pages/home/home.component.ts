import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BRAND, IMG, PARTNERS, PROJECTS, SERVICES, STEPS, img } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { CounterComponent } from '../../shared/components/counter.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';
import { ServiceCardComponent } from '../../shared/components/service-card.component';
import { ProjectCardComponent } from '../../shared/components/project-card.component';
import { BeforeAfterComponent } from '../../shared/components/before-after.component';
import { TestimonialSliderComponent } from '../../shared/components/testimonial-slider.component';
import { FaqComponent } from '../../shared/components/faq.component';
import { CraneArtComponent } from '../../shared/components/crane-art.component';

@Component({
  selector: 'app-home', standalone: true,
  imports: [RouterLink, RevealOnScrollDirective, MagneticDirective, CounterComponent, SectionHeadingComponent, ServiceCardComponent,
    ProjectCardComponent, BeforeAfterComponent, TestimonialSliderComponent, FaqComponent, CraneArtComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  brand = BRAND;
  headline = 'Building Zimbabwe’s future, solidly.'.split(' ');
  slides = [IMG.crane, IMG.site, IMG.tower].map(i => img(i, 1800));
  services = SERVICES.slice(0, 6);
  featured = PROJECTS.slice(0, 6);
  steps = STEPS;
  partners = [...PARTNERS, ...PARTNERS]; // doubled for seamless marquee
  before = img(IMG.house2, 1000); after = img(IMG.house2, 1000);
  why = [
    { i: '🛡️', t: 'Safety first', d: 'Zero-compromise site safety and insured crews.' },
    { i: '⏱️', t: 'On-time delivery', d: 'Clear programmes and weekly progress reports.' },
    { i: '💎', t: 'Quality materials', d: 'Certified suppliers and rigorous inspections.' },
    { i: '🤝', t: 'Transparent pricing', d: 'Itemised BOQs with no hidden extras.' },
  ];
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));
  private ctx?: { revert(): void };

  constructor() { inject(SeoService).set('Building Contractors in Harare', `${BRAND.tagline} Residential, commercial, roofing, renovations and civil works across Harare, Zimbabwe.`); }

  /** GSAP + ScrollTrigger are loaded lazily in the browser only (keeps SSR safe and the bundle small). */
  async ngAfterViewInit() {
    if (!this.browser || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      gsap.to('.hero__slides', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.fromTo('.process__line', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: '.process', start: 'top 70%', end: 'center 60%', scrub: true } });
      gsap.from('.step', { opacity: 0, y: 40, stagger: 0.18, duration: 0.7, scrollTrigger: { trigger: '.process', start: 'top 75%' } });
      gsap.to('.cta__bg', { backgroundPositionX: '-300px', ease: 'none', scrollTrigger: { trigger: '.cta', scrub: true } });
    }, this.host.nativeElement);
  }
  ngOnDestroy() { this.ctx?.revert(); }
}
