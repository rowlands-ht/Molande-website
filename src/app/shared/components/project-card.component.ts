import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project, img } from '../../core/data/site-data';

@Component({
  selector: 'app-project-card', standalone: true,
  template: `
    <button type="button" class="proj" (click)="open.emit()" [attr.aria-label]="'View ' + p.title">
      <img [src]="src(p.image)" [alt]="p.title + ', ' + p.location" loading="lazy" width="600" height="450">
      <span class="proj__ov">
        <small>{{ p.category }} · {{ p.year }}</small>
        <strong>{{ p.title }}</strong>
        <em>{{ p.location }}</em>
      </span>
    </button>`,
})
export class ProjectCardComponent {
  @Input({ required: true }) p!: Project;
  @Output() open = new EventEmitter<void>();
  src = (id: string) => img(id, 700);
}
