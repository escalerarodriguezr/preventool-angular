import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private _hideModal:boolean = true;

  constructor(

  ) { }

  get hideModal(): boolean {
    return this._hideModal;
  }

  public closeModal():void
  {
    this._hideModal = true;
  }

  public showModal():void{
    this._hideModal = false;
  }
}
