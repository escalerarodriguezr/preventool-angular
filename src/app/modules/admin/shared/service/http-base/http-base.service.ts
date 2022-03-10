import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor() { }

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
}
