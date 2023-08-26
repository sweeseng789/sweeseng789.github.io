import { Injectable, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  @Input()
  public get ConfiguredRoutes(): Route[] {
    return this.router.config;
  }

  constructor(private router: Router) { }
}
