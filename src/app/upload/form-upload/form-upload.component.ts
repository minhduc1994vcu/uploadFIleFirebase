import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  selectAvatar(event) {
    this.selectedFiles = event.target.files;
    this.uploadAvatar();
  }

  uploadAvatar() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushAvatarToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
}
