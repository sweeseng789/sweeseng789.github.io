import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from '../../../about/about.component';
import { MainComponent } from '../../../view/main/main.component';



@NgModule({ 
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent, title: 'Home' },
      { path: 'about', component: AboutComponent, title: 'About' }
    ] as Route[])
  ],
  exports: [RouterModule]
})
export class NavigationModule { }
