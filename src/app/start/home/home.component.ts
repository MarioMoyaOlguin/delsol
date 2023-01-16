import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fade
  ],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuArray = [false, false, false]

  activateMenu = (index:number) => {
    for (let i = 0; i < this.menuArray.length; i++) {

      if(i === index) {
        this.menuArray[index] = !this.menuArray[index];

      } else {
        this.menuArray[i] = false;
      }
    }
  }
  

}
