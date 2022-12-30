import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss']
})
export class CalificacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.scoreArr)
  }

  scoreArr = new Array(10).fill({active: false});


  activate = (index:number) => {
    this.scoreArr = [];

    for (let i = 0; i < 10; i++) {
      if(index === i) {
        this.scoreArr.push({index: i + 1, active: true});

      } else {
        this.scoreArr.push({index: i + 1, active: false});
      }
    }
    console.log(this.scoreArr)
  }

}
