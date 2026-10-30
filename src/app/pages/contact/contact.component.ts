import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT, SERVICES } from '../../core/data/site-data';
import { SeoService } from '../../core/services/seo.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { EstimatorComponent } from './estimator.component';

/** Multi-step quote request (3 steps) with per-step validation, progress bar and file upload. */
@Component({
  selector: 'app-contact', standalone: true, imports: [ReactiveFormsModule, RevealOnScrollDirective, EstimatorComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  c = CONTACT; services = SERVICES;
  stepNames = ['Your details', 'Your project', 'Budget & files'];
  budgets = ['Under $5,000', '$5,000 – $20,000', '$20,000 – $50,000', '$50,000 – $150,000', '$150,000+'];
  step = signal(0); sent = signal(false); fileName = signal(''); fileErr = signal(''); wa = signal('');
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    contact: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      // Zimbabwe mobile: 07x xxx xxxx or +263 7x xxx xxxx
      phone: ['', [Validators.required, Validators.pattern(/^(\+263|0)7[1-9]\s?\d{3}\s?\d{4}$/)]],
      email: ['', Validators.email],
    }),
    project: this.fb.nonNullable.group({
      service: ['', Validators.required], suburb: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(15)]],
    }),
    budget: this.fb.nonNullable.group({ range: ['', Validators.required], timeline: [''] }),
  });
  private groups = [this.form.controls.contact, this.form.controls.project, this.form.controls.budget];

  constructor() { inject(SeoService).set('Contact & Free Quote', 'Request a free construction quote in Harare. Call, WhatsApp or use our multi-step quote form.'); }

  bad(path: string) { const x = this.form.get(path); return !!x && x.invalid && (x.touched || x.dirty); }
  next() { const g = this.groups[this.step()]; if (g.invalid) { g.markAllAsTouched(); return; } this.step.update(s => s + 1); }
  back() { this.step.update(s => Math.max(0, s - 1)); }
  file(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f && f.size > 8 * 1024 * 1024) { this.fileErr.set('Max file size is 8 MB.'); this.fileName.set(''); return; }
    this.fileErr.set(''); this.fileName.set(f?.name ?? '');
  }
  submit() {
    const g = this.groups[this.step()];
    if (g.invalid) { g.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    // TODO: POST `v` (+ the file as FormData) to your backend/email service.
    // Until then, the success screen offers a pre-filled WhatsApp message so no lead is lost.
    const text = `Quote request%0AName: ${v.contact.name}%0APhone: ${v.contact.phone}%0AService: ${v.project.service}%0ALocation: ${v.project.suburb}%0ABudget: ${v.budget.range}%0ADetails: ${v.project.details}`;
    this.wa.set(`https://wa.me/${this.c.whatsapp}?text=${text}`);
    this.sent.set(true);
  }
}
