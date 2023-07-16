import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input #inputCity type="text" placeholder="Filter by city">
        <button class="primary" type="button" (click)="OnButtonClick()">Search</button>
      </form>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('inputCity', { static: false }) inputCity!: ElementRef<HTMLInputElement>;

  OnButtonClick() {
    console.log(this.inputCity.nativeElement.value);
  }
}
