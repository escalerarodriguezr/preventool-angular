import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../service/session/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public sessionService:SessionService
  ) { }

  ngOnInit(): void {
  }

}
