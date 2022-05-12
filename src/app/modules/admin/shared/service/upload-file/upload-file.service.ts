import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private _hideModal:boolean = false;

  constructor(

  ) { }

  get hideModal(): boolean {
    return this._hideModal;
  }

  public closeModal():void
  {
    this._hideModal = true;
  }
}
