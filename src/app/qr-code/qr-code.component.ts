import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() urlSegura:SafeUrl = '';
  @Input() enlaceUrl:string = '';
  @Input() nombreQr:string = '';

  actualizarUrl = (nuevaUrl:string) => {
    this.enlaceUrl = nuevaUrl;
  }

  onCodeChange = (safe:SafeUrl) => {
    this.urlSegura = safe;
  }

  descargarQr = (e:any) => {
    if(this.enlaceUrl === '') {
      e.preventDefault();
      alert('Aún no hay enlace');
    }
  }

}
