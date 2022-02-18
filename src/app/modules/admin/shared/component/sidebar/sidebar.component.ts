import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../service/sidebar/sidebar.service";
import {SideBarMenu} from "../../interface/sidebar-menu.interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menu:SideBarMenu;

  constructor(
    private sidebarService: SidebarService
  )
  {
    this.menu = this.sidebarService.menu;
  }

  ngOnInit(): void {

  }

}
