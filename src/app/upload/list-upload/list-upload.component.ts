import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];
  avatarUploads: any[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    // uploadfile
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
        // upload avatar
    this.uploadService.getAvatarUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.avatarUploads = fileUploads;
    });
  }

  deleteSongOnFirebase(fileUpload) {
    this.deleteFileUpload(fileUpload);
    this.deleteAvatarUpload(fileUpload);
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
  deleteAvatarUpload(fileUpload) {
    this.uploadService.deleteAvatarUpload(fileUpload);
  }
}
