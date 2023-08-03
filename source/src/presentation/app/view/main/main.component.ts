import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      main works!
    </p>
  `,
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}
