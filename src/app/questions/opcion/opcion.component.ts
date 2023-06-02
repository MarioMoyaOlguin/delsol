import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.scss']
})
export class OpcionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() textoPregunta = '';
  @Output() newItemEvent = new EventEmitter<string[]>();

  datos:string[] = ['texto', ''];

  pushDatos = (texto:string) => {
    this.datos.splice(1, 1, texto);
    this.newItemEvent.emit(this.datos);
  }

}
