import { Injectable, Input } from '@angular/core';
import { NavigationModule } from './navigation.module';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  @Input()
  //public get CurrentRoute(): string {
  //  this.router.
  //  return this.router.url;
  //}
  public get CurrentRoute(): Route {
    return this.ConfiguredRoutes.find((r) => r.path == this.router.url)!;
  }

  @Input()
  public get ConfiguredRoutes(): Route[] {
    return this.router.config;
  }

  constructor(private router: Router) { }

}
