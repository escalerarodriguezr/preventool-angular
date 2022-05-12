import { Component, OnInit } from '@angular/core';
import {UploadFileService} from "../../service/upload-file/upload-file.service";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {



  constructor(
    public uploadFileService:UploadFileService
  ) { }

  ngOnInit(): void {
  }
  
  public closeModal():void
  {
    this.uploadFileService.closeModal();
  }

  public loadFile(newFile:HTMLInputElement):void
  {
     // @ts-ignore
    let file:File = newFile.files[0];
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.uploadFileService.newFileResource = reader.result;
      this.uploadFileService.newFileLoaded();
      this.uploadFileService.closeModal();

    }

  }

}
