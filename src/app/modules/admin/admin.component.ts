import { Component, OnInit } from '@angular/core';

//declare global function
// @ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Init template
    customInitFunctions();
  }

}
