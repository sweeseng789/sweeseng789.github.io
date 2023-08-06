import { Injectable, Input } from '@angular/core';
import { NavigationModule } from './navigation.module';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

//  @Input()
//  //public get CurrentRoute(): string {
//  //  this.router.
//  //  return this.router.url;
//  //}
//  public get CurrentRoute(): ActivatedRoute {
///*    return this.router.routerState.snapshot.url;*/
//    //return this.ConfiguredRoutes.find((r) => r.path == this.router.url)!;
//  }

  //@Input()
  //public get GetActivatedRoute(): ActivatedRoute {
  //  return this.activatedRoute;
  //}

  @Input()
  public get ConfiguredRoutes(): Route[] {
    return this.router.config;
  }

  constructor(private router: Router) { }
}
