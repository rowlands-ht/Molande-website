import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JOBS } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-careers', standalone: true, imports: [ReactiveFormsModule, RevealOnScrollDirective],
  template: `
  <section class="page-hero blueprint"><div class="container"><p class="eyebrow eyebrow--light">Careers</p><h1>Build your career with MOLANDE</h1></div></section>
  <section class="section"><div class="container split split--top">
    <div>
      <h2>Open positions</h2>
      @for (j of jobs; track j.title; let i = $index) {
        <div class="job" appRevealOnScroll [revealDelay]="i * 70"><div><h3>{{ j.title }}</h3><p>{{ j.blurb }}</p></div><span>{{ j.type }} · {{ j.place }}</span></div>
      }
    </div>
    <form class="card form" [formGroup]="f" (ngSubmit)="send()" novalidate>
      <h2>Apply now</h2>
      @if (sent()) { <p class="ok">Thank you! We've received your application and will be in touch.</p> } @else {
        <label>Full name<input formControlName="name" autocomplete="name">
          @if (bad('name')) { <small class="err">Please enter your name.</small> }</label>
        <label>Phone (e.g. 0714 832 480)<input formControlName="phone" inputmode="tel" autocomplete="tel">
          @if (bad('phone')) { <small class="err">Enter a valid Zimbabwe mobile number.</small> }</label>
        <label>Position<select formControlName="role"><option value="">Select…</option>@for (j of jobs; track j.title) { <option>{{ j.title }}</option> }</select>
          @if (bad('role')) { <small class="err">Choose a position.</small> }</label>
        <label>About you<textarea rows="4" formControlName="msg"></textarea></label>
        <label>CV (PDF/Word, max 5 MB)<input type="file" accept=".pdf,.doc,.docx" (change)="file($event)"></label>
        @if (fileErr()) { <small class="err">{{ fileErr() }}</small> }
        <button class="btn btn--primary" type="submit">Submit application</button>
      }
    </form>
  </div></section>`,
})
export class CareersComponent {
  jobs = JOBS; sent = signal(false); fileErr = signal('');
  private fb = inject(FormBuilder);
  f = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+263|0)7[1-9]\s?\d{3}\s?\d{4}$/)]],
    role: ['', Validators.required], msg: [''],
  });
  constructor() { inject(SeoService).set('Careers', 'Join MOLANDE Construction in Harare: site foremen, surveyors, artisans and interns wanted.'); }
  bad(c: 'name' | 'phone' | 'role') { const x = this.f.controls[c]; return x.invalid && (x.touched || x.dirty); }
  file(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    this.fileErr.set(file && file.size > 5 * 1024 * 1024 ? 'File is larger than 5 MB.' : '');
  }
  send() {
    if (this.f.invalid || this.fileErr()) { this.f.markAllAsTouched(); return; }
    // TODO: POST this.f.getRawValue() + the CV file to your backend / email service.
    this.sent.set(true);
  }
}
