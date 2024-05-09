import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactDTO } from 'src/app/model/ContactDTO';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent{
  contactLists: string[] = ['List 1', 'List 2', 'List 3'];
  contact: ContactDTO = new ContactDTO();
  selectedFile: File | null = null;
  file: File | null = null;
  fileSelected:boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateContactComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  handleFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.clearForm();
    }
    this.selectedFile = event.target.files[0];
  }

  onFileSelected(event:any): void {
    this.file = event.target.files[0];
    this.fileSelected = true;
  }

  fileOver(event:any): void {
  }

  onFileDropped(event:any): void {
    this.file = event[0];
  }

  readExcel(): void {
    if (!this.file) {
      console.error('No file selected');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(`Sheet Name: ${sheetName}`);
        console.log('Sheet Data:', excelData);
      });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  
  submitForm() {
    if (this.selectedFile) {
      console.log('Reading Excel file:', this.selectedFile);
      this.clearForm();
    } else {
      console.log('Contact added:', this.contact);
      this.contact = new ContactDTO();
    }
  }

  clearForm() {
    this.contact = new ContactDTO();
    this.selectedFile = null;
  }

  onSubmit(){
    
  }
}
