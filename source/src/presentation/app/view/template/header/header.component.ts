import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../service/native/navigation/navigation.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="header">

    <!-- Header -->
    <p class="header_text">Swee Seng</p>

    <nav>
      <ul #unorderedList>
        <li *ngFor="let configuredRoute of navigationService.ConfiguredRoutes">
          <a routerLink="{{ configuredRoute.path }}" (click)="OnRouterLinkClick(configuredRoute)">
            {{ configuredRoute.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('unorderedList') private unorderedList: ElementRef | undefined;

  private static activeClassTag: string = "active";
  private static inactiveClassTag: string = "inactive";

  constructor(protected navigationService: NavigationService) { }

  ngAfterViewInit() {

    // Set the default component title
    this.navigationService.ConfiguredRoutes.forEach((route) => {
      if (!route || (route.path != null && route.path!.length > 0))
        return;

      this.OnRouterLinkClick(route);
    });
  }

  public OnRouterLinkClick(route: Route) {
    const liElements: NodeListOf<Element> = this.unorderedList?.nativeElement.querySelectorAll('li');
    liElements.forEach((li) => {
      const aElement = li.querySelector('a');
      if (aElement) {
        let routerLinkAttribute = aElement.getAttribute('ng-reflect-router-link');
        if (routerLinkAttribute == route.path) {
          aElement.classList.add(HeaderComponent.activeClassTag);
          aElement.classList.remove(HeaderComponent.inactiveClassTag);
        }
        else {
          aElement.classList.add(HeaderComponent.inactiveClassTag);
          aElement.classList.remove(HeaderComponent.activeClassTag);
        }
      }
    })
  }
}
