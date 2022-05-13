import { Component, OnInit } from '@angular/core';
import {UploadImageService} from "../../service/upload-image/upload-image.service";


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {



  constructor(
    public uploadImageService:UploadImageService
  ) { }

  ngOnInit(): void {
  }

  public closeModal():void
  {
    this.uploadImageService.closeModal();
  }

  public loadFile(newFile:HTMLInputElement):void
  {
     // @ts-ignore
    let file:File = newFile.files[0];
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.uploadImageService.newFileResource = reader.result;
      this.uploadImageService.newFileFile = file;
      this.uploadImageService.newFileLoaded();
      this.uploadImageService.closeModal();
    }
  }
}
