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

  /* --------------- servicio login, identificar tipo de usuario -------------- */
  user = 'administrador'
  

}
