import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('chartsContainer') charts:any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setInitialChart();
  }

  colorOptions = {
    colorschemes: {
      scheme: 'brewer.RdYlGn4'
    }
  }
  bgColors10 = ["#9e0142","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"];

  pollsArray:any[] = [
    {checked: false, nombre: 'Encuesta prueba', num: '5', estado: 'activo', respuestas: '134', done: true},
    {checked: false, nombre: 'Instalaciones', num: '24', estado: 'activo', respuestas: '146', done: true},
    {checked: false, nombre: 'Encuesta electrónica', num: '31', estado: 'activo', respuestas: '167', done: true},
    {checked: false, nombre: 'Atención al cliente', num: '46', estado: 'cerrado', respuestas: '200', done: true},
    {checked: false, nombre: 'Encuesta dto. ropa', num: '20', estado: 'cerrado', respuestas: '200', done: true},
    {checked: false, nombre: 'Experiencia de compras', num: '23', estado: 'activo', respuestas: '116', done: true}
  ];

  chartsData = [
    {type: 'estrellas', data: [4, 20, 40, 50, 43]},
    {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
    {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
    {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
    {type: 'estrellas', data: [3, 20, 40, 50, 43]}
  ];
  chartsArray:any = [];

  showCharts = false;
  tituloEncuesta = '';
  encuestas:any = [];

  setModulo = (modulo:string) => {
    if(modulo === '1') {
      this.encuestas = [];
      this.encuestas = ['Encuesta prueba', 'Instalaciones']
      return;
    }
    if(modulo === '2') {
      this.encuestas = [];
      this.encuestas = ['Atención al cliente', 'Experiencia de compras']
      return;
    }
    if(modulo === '') { this.encuestas = [] }
  }
  setEncuesta = (encuesta:string) => {
    this.showCharts = false;
    this.tituloEncuesta = encuesta;
    if(encuesta === 'Encuesta prueba') {
      this.chartsArray = [
        {type: 'estrellas', data: [4, 20, 40, 50, 43]},
        {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
        {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
        {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
      ];
    }
    if(encuesta === 'Instalaciones') {
      this.chartsArray = [
        {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
        {type: 'estrellas', data: [4, 20, 40, 50, 43]},
        {type: 'estrellas', data: [3, 20, 40, 50, 43]},
        {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
        {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
      ];
    }
    if(encuesta === 'Atención al cliente') {
      this.chartsArray = [
        {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
        {type: 'estrellas', data: [4, 20, 40, 50, 43]},
        {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
        {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
      ];
    }
    if(encuesta === 'Experiencia de compras') {
      this.chartsArray = [
        {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
        {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
        {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
        {type: 'estrellas', data: [4, 20, 35, 52, 16]},
        {type: 'estrellas', data: [3, 20, 40, 50, 43]},
      ];
    }
    setTimeout(() => {
      this.showCharts = true;
    }, 100)
  }

  setInitialChart = () => {
    this.tituloEncuesta = 'Encuesta prueba';
    this.chartsArray = [
      {type: 'estrellas', data: [4, 20, 40, 50, 43]},
      {type: 'opcion', data: [56, 20, 40, 50], labels: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']},
      {type: 'nps', data: [2, 25, 55], labels: ['Mala', 'Neutral', 'Buena']},
      {type: 'calificacion', data: [3,2,4,5,13,20,40,50,36,14]},
    ];
    setTimeout(() => {
      this.showCharts = true;
    }, 100)
  }
  
  


}
