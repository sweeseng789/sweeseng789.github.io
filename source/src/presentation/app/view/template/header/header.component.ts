import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../service/native/navigation/navigation.service';
import { RouterModule } from '@angular/router';

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
          <a routerLink="{{ configuredRoute.path }}">
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
  @ViewChild('unorderedList') unorderedList: ElementRef | undefined;

  constructor(protected navigationService: NavigationService) { }

  ngAfterViewInit() {
/*    let temp: NodeList = this.unorderedList?.nativeElement.querySelectorAll('li');*/
    ////let temp2 = temp[0];
    //let temp2 = temp[1].innerHTML;
    //for (let li in this.unorderedList?.nativeElement.querySelectorAll('li')) {
    //  let a = li.innerHTML;
    //  let b = 0;
    //}

    //for (let li in this.unorderedList?.nativeElement.querySelectorAll('li') as NodeList) {
    //  let a = li;
    //  let b = 0;
    //}

    //(this.unorderedList?.nativeElement.querySelectorAll('li a') as NodeList).forEach((li) => {
    //  let a = li.querySelector('a');
    //        let b = 0;
    //});

    const liElements: NodeListOf<Element> = this.unorderedList?.nativeElement.querySelectorAll('li');
    liElements.forEach((li) => {
      const aElement = li.querySelector('a');
      let a = 0;
      //if (aElement?.innerText == this.navigationService.CurrentRoute.title) {
      //  let a = 0;
      //}
      //else {
      //  let a = 0;
      //}

      //let b = 0;
    });

    let temp = this.navigationService.CurrentRoute?.title;
  }
}
