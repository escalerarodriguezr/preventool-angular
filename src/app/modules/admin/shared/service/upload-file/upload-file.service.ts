import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private _hideModal:boolean = true;
  private _newFile:boolean = false;
  private _newFileResource:any;

  constructor(

  ) { }

  get hideModal(): boolean {
    return this._hideModal;
  }

  get newFile(): boolean {
    return this._newFile;
  }

  get newFileResource(): any {
    return this._newFileResource;
  }

  set newFileResource(value: any) {
    this._newFileResource = value;
  }

  public closeModal():void
  {
    this._hideModal = true;
  }

  public showModal():void{
    this._hideModal = false;
  }

  public newFileLoaded():void
  {
    this._newFile = true;
  }
}
