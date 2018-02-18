import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    userData : any;
	userA : any;

    constructor() { }

    ngOnInit() {
      this.userData = JSON.parse(localStorage.getItem('session'));
    }



}
