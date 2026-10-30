import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { PROJECTS, PROJECT_CATEGORIES, img } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { ProjectCardComponent } from '../../shared/components/project-card.component';

@Component({
  selector: 'app-projects', standalone: true, imports: [ProjectCardComponent],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">Portfolio</p><h1>Projects we're proud of</h1></div></section>
  <section class="section"><div class="container">
    <div class="filters" role="tablist" aria-label="Filter projects">
      @for (c of cats; track c) { <button type="button" role="tab" [attr.aria-selected]="cat() === c" [class.on]="cat() === c" (click)="cat.set(c)">{{ c }}</button> }
    </div>
    <div class="grid grid--3 grid--anim">
      @for (p of list(); track p.title; let i = $index) { <app-project-card [p]="p" (open)="show.set(i)" /> }
    </div>
  </div></section>

  @if (current(); as p) {
    <div class="lb" role="dialog" aria-modal="true" [attr.aria-label]="p.title" (click)="show.set(null)">
      <button class="lb__x" (click)="show.set(null)" aria-label="Close">×</button>
      <button class="lb__n lb__n--l" (click)="step(-1, $event)" aria-label="Previous">‹</button>
      <figure (click)="$event.stopPropagation()"><img [src]="big(p.image)" [alt]="p.title"><figcaption><strong>{{ p.title }}</strong> · {{ p.location }} · {{ p.year }}</figcaption></figure>
      <button class="lb__n lb__n--r" (click)="step(1, $event)" aria-label="Next">›</button>
    </div>
  }`,
})
export class ProjectsComponent {
  cats = PROJECT_CATEGORIES;
  cat = signal<string>('All');
  show = signal<number | null>(null);
  list = computed(() => this.cat() === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === this.cat()));
  current = computed(() => { const i = this.show(); return i === null ? null : this.list()[i]; });
  big = (id: string) => img(id, 1600);
  constructor() { inject(SeoService).set('Projects & Portfolio', 'Residential, commercial, renovation and civil projects completed by MOLANDE across Harare.'); }
  step(d: number, e: Event) { e.stopPropagation(); const n = this.list().length; this.show.update(i => i === null ? null : (i + d + n) % n); }
  @HostListener('document:keydown', ['$event']) key(e: KeyboardEvent) {
    if (this.show() === null) return;
    if (e.key === 'Escape') this.show.set(null);
    if (e.key === 'ArrowRight') this.step(1, e);
    if (e.key === 'ArrowLeft') this.step(-1, e);
  }
}
