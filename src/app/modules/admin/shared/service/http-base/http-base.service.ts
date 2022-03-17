import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor() { }

  public screenLock():void
  {
    // @ts-ignore
    document.getElementById('screeLocker').hidden = false;
  }

  public screenUnLock():void
  {
    // @ts-ignore
    document.getElementById('screeLocker')?.hidden=true;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': 'Bearer '+this.token
      }
    }
  }

  getBaseHeaders():any{
    return {
      'Authorization': 'Bearer '+this.token
    }
  }
}
