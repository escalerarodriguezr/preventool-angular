import { Component, OnInit } from '@angular/core';
import {filter, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})


export class BreadcrumbComponent implements OnInit {

  public breadCrumbs$: Subscription;
  private breadCrumbsMap:any = {
    //Dashboard
    '/admin/dashboard': [
      {
        pageTitle: 'Dashboard',
        title: 'Dashboard',
        url: '/admin/dashboard'
      },

    ],

    //Users
    '/admin/user/users': [
      {
        pageTitle: 'Listado de usuarios',
        title: 'Dashboard',
        url: '/admin/dashboard'
      },
      {
        title: 'Listado Usuarios',
        url: '/admin/user/users'
      }
    ],
    '/admin/user/create': [
      {
        pageTitle: 'Crear usuario',
        title: 'Dashboard',
        url: '/admin/dashboard'
      },
      {
        title: 'Crear usuario',
        url: '/admin/user/create'
      }
    ],

    //Company
    '/admin/company/update': [
      {
        pageTitle: 'Datos compañia',
        title: 'Dashboard',
        url: '/admin/dashboard'
      },
      {
        title: 'Datos generales Compañia',
        url: '/admin/company/update'
      }
    ],
    'admin/company/progress': [
      {
        pageTitle: 'Progreso',
        title: 'Dashboard',
        url: '/admin/dashboard'
      },
      {
        title: 'Progreso',
        url: 'admin/company/progress'
      }
    ],

  };

  public currentBreadCrumbs = [];

  constructor(
    private router: Router,
  ) {

    this.breadCrumbs$ = this.router.events
      .pipe(
        filter( event => event instanceof NavigationEnd ),
      )
      .subscribe((res )=>{
        const navigationEnd = res as NavigationEnd;
        this.currentBreadCrumbs = this.breadCrumbsMap[navigationEnd.urlAfterRedirects];
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.breadCrumbs$.unsubscribe();
  }

}
