import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Rough cost estimator. RATES ARE PLACEHOLDERS (USD per m²): replace with your real averages.
 */
@Component({
  selector: 'app-estimator', standalone: true, imports: [ReactiveFormsModule, CurrencyPipe],
  template: `
  <form class="card form" [formGroup]="f">
    <h3>Cost estimator</h3>
    <label>Floor area (m²)<input type="number" formControlName="area" min="10"></label>
    <label>Type of work<select formControlName="type">
      @for (t of types; track t.key) { <option [value]="t.key">{{ t.label }}</option> }</select></label>
    <label>Finish level<select formControlName="finish">
      @for (x of finishes; track x.key) { <option [value]="x.key">{{ x.label }}</option> }</select></label>
    @if (est(); as e) {
      <div class="est"><small>Estimated range</small>
        <strong>{{ e.low | currency:'USD':'symbol':'1.0-0' }} – {{ e.high | currency:'USD':'symbol':'1.0-0' }}</strong>
        <small>Indicative only. Final price depends on site visit, design and materials.</small></div>
    } @else { <small class="err">Enter an area of at least 10 m².</small> }
  </form>`,
})
export class EstimatorComponent {
  types = [
    { key: 'new', label: 'New build', rate: 170 },
    { key: 'reno', label: 'Renovation / extension', rate: 150 },
    { key: 'fit', label: 'Interior fit-out', rate: 90 },
    { key: 'roof', label: 'Roofing', rate: 55 },
  ];
  finishes = [
    { key: 'std', label: 'Standard', mult: 1 },
    { key: 'prem', label: 'Premium', mult: 1.3 },
    { key: 'lux', label: 'Luxury', mult: 1.7 },
  ];
  private fb = inject(FormBuilder);
  f = this.fb.nonNullable.group({ area: [120, [Validators.required, Validators.min(10)]], type: ['new'], finish: ['std'] });
  private v = toSignal(this.f.valueChanges, { initialValue: this.f.getRawValue() });
  est = computed(() => {
    const { area, type, finish } = this.v() as { area: number; type: string; finish: string };
    if (!area || area < 10) return null;
    const base = area * (this.types.find(t => t.key === type)?.rate ?? 0) * (this.finishes.find(x => x.key === finish)?.mult ?? 1);
    return { low: base * 0.85, high: base * 1.15 };
  });
}
