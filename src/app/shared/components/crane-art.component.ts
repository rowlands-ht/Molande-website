import { Component } from '@angular/core';

/** Self-drawing line illustration of a tower crane (pathLength=1 + stroke-dashoffset animation). */
@Component({
  selector: 'app-crane-art', standalone: true,
  template: `
    <svg class="crane" viewBox="0 0 240 260" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path pathLength="1" d="M90 250V50M110 250V50M90 250l20-20-20-20 20-20-20-20 20-20-20-20 20-20-20-20"/>
      <path pathLength="1" d="M20 50h210M90 50L50 20h120l-60 30M200 50v-18M20 50v-10"/>
      <path pathLength="1" d="M190 50v90M180 140h20v14h-20z"/>
      <path pathLength="1" d="M60 250h100M70 250l20-30M150 250l-20-30"/>
    </svg>`,
})
export class CraneArtComponent {}
