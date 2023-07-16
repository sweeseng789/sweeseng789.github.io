import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from '../../../about/about.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent }
    ] as Route[])
  ],
  exports: [RouterModule]
})
export class NavigationModule { }
