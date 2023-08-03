import { Component } from '@angular/core';
import { HeaderComponent } from './view/template/header/header.component';

import { Router, RouterModule } from '@angular/router';
import { NavigationService } from './service/native/navigation/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent
  ],
  //template: `
  //  <main>
  //    <header class="brand-name">
  //      <img class="brand-logo" src="/assets/favicon.ico" alt="logo" aria-hidden="true">
  //    </header>
  //    <section class="content">
  //      <app-home></app-home>k
  //    </section>
  //  </main>
  //  `
  
  template: `
  <app-header></app-header>
  <button class="link" (click)="goToHome()">Hello World</button>

  <router-outlet></router-outlet>
  `
})

export class AppComponent {

  constructor(private router: Router, public navigationService: NavigationService) { }

  public goToHome(): void {
    this.router.navigate(["/about"]);
  }

  //constructor(@Inject(DOCUMENT) private document: Document) { }

  //title = 'homes2';
}
