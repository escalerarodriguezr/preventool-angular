import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from "../shared/service/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {

  constructor(
    private sessionService:SessionService,
    private router:Router
  ) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if( this.sessionService.authUser?.role != 'ROLE_ROOT' ){
      this.router.navigateByUrl('/admin/dashboard');
    }
    return true;
  }

}
