import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-dep',
  templateUrl: './choose-dep.component.html',
  styleUrls: ['./choose-dep.component.scss']
})
export class ChooseDepComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dept:string[] = [];

  setDept = (dept:string) => {
    this.dept.pop();
    this.dept.push(dept);
    console.log(this.dept);
  }

}
