import { Injectable } from '@angular/core';
import {SideBarMenu} from "../../interface/sidebar-menu.interface";
import {SessionService} from "../session/session.service";
import {AuthUser} from "../../../../../model/user/authUser.model";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu:SideBarMenu = {
    users:{
      module:'Users',
      items:[
        {
          title: 'Usuarios',
          icon: 'mdi mdi-account-multiple',
          submenu: [
            {title: 'Listado de usuarios', url: '/admin/user/users'},
            {title: 'Crear usuario', url: '/admin/user/create'},
          ]
        }
      ]
    },
    company:{
      module:"Company",
      items:[
        {
          title: 'Empresa',
          icon: 'mdi mdi-city',
          submenu: [
            {title: 'Datos generales', url: '/admin/company/edit'},

          ]
        }
      ]
    },
  }


  constructor(
    private sessionService:SessionService
  ) {

  }


  get menu(): any {
    return this.transformMenu();
  }

  private transformMenu():object
  {
    let transformedMenu = Object.assign({}, this._menu)
    if( this.sessionService.authUser?.role === 'ROLE_ADMIN' ){
      // @ts-ignore
      transformedMenu.users.items[0].submenu.splice(1,1)
    }

    return transformedMenu;
  }
}
