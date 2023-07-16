import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="content">
     <h2> About Me </h2>
     <p>
       I'm John, and I love taking photos. I have been taking photos for over 25 years. Visit me on my social media:
     </p>
     <a href=""> Facebook </a> 

     <a href=""> LinkedIn </a> 

     <a href=""> Instagram </a> 

    </div>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}
