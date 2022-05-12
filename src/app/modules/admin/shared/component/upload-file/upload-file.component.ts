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

}
