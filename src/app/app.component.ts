import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { NavbarComponent } from './layout/navbar.component';
import { FooterComponent } from './layout/footer.component';
import { ChromeComponent } from './layout/chrome.component';

@Component({
  selector: 'app-root', standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ChromeComponent],
  templateUrl: './app.component.html',
  animations: [trigger('routeAnim', [
    transition('* <=> *', [
      query(':leave', [style({ display: 'none' })], { optional: true }),
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('450ms 60ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'none' })),
      ], { optional: true }),
    ]),
  ])],
})
export class AppComponent {
  /** Changes on every navigation so the route animation fires. */
  key(o: RouterOutlet) { return o.isActivated ? o.activatedRoute.snapshot.url.map(u => u.path).join('/') : ''; }
}
