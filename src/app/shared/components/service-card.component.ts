import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/data/site-data';

@Component({
  selector: 'app-service-card', standalone: true, imports: [RouterLink],
  template: `
    <a class="svc" [routerLink]="['/services', s.slug]">
      <span class="svc__icon" aria-hidden="true">{{ s.icon }}</span>
      <h3>{{ s.title }}</h3>
      <p>{{ s.short }}</p>
      <span class="svc__more">Learn more →</span>
    </a>`,
})
export class ServiceCardComponent { @Input({ required: true }) s!: Service; }
