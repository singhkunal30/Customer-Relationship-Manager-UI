import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-contacts',
  templateUrl: './import-contacts.component.html',
  styleUrls: ['./import-contacts.component.css']
})
export class ImportContactsComponent {

  constructor(public dialogRef: MatDialogRef<ImportContactsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpload(fileInput: any): void {
    // Handle file upload logic here
    const file = fileInput.target.files[0];
    console.log('Uploaded file:', file);
    // Perform import logic here
    // this.dialogRef.close();
  }
}
