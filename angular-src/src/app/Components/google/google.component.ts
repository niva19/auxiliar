import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent {
  title: string = 'Google Maps';
  lat: string | number = 9.9923673;
  lng: string | number = -84.1241387;
  tipo: string = 'roadmap';

  @ViewChild('Labellatitud')
  private Labellatitud: ElementRef

  @ViewChild('Labellongitud')
  private Labellongitud: ElementRef

  @ViewChild('inputlatitud')
  private inputlatitud: ElementRef

  @ViewChild('inputlongitud')
  private inputlongitud: ElementRef

  @ViewChild('inputmapa')
  private inputmapa: ElementRef

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    $('.modal').modal();
  }

  modal1() {
    $('#modal1').modal('open');
  }

  Submit() {
    var lati;
    var longi;
    var map = this.inputmapa.nativeElement.value
    if (this.inputlatitud.nativeElement.value == '')
      lati = 9.9923673;
    else
      lati = Number(this.inputlatitud.nativeElement.value);
    if (this.inputlongitud.nativeElement.value == '')
      longi = -84.1241387;
    else
      longi = Number(this.inputlongitud.nativeElement.value);

    this.lat = lati;
    this.lng = longi;
    this.tipo = map;

    $('#modal1').modal('close');
  }


}