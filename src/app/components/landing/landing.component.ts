import { Component, OnInit } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#blogCarousel').carousel({
      interval: 5000
    });
  }

}
