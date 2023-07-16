import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationModule } from './service/native/navigation/navigation.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule,
    NavigationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
