import { Component, OnInit } from '@angular/core';
import { ContactDTO } from 'src/app/model/ContactDTO';
import { ErrorDTO } from 'src/app/model/Error';
import { ContactService } from 'src/app/services/contact.service';
import { ImportContactsComponent } from './import-contacts/import-contacts.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateContactComponent } from './create-contact/create-contact.component';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit {

  dataPresent:boolean = false;
  contacts: ContactDTO[] = [];
  error:ErrorDTO = new ErrorDTO();
  exception: boolean = false;
  dataContacts: any = [
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '987-654-3210' }
    // Add more contact objects as needed
  ];

  displayedColumns: string[] = ['name', 'email', 'phone'];

  constructor(private contactService:ContactService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(
      (res)=>{
        console.log(res);
        if(res != null){
          this.contacts = res
          this.dataPresent = true;
        }
      }, 
      (err) => {
        this.handleError(err);
      });
  }

  handleError(err:any){
      this.exception = true;
      this.error.errorMessage = err.error.message;
      this.error.errorCode = err.error.error_code;
      console.log(err.error);
  }

  delete(id:number){
    this.contactService.removeContact(id).subscribe(
      ()=>{
        console.log("Deleted successfully");
      },
      (err)=>{
        this.handleError(err);
      });
  }

  update(contactDTO:ContactDTO){
    this.contactService.updateContact(contactDTO).subscribe(
      (res)=>{
        if(res != null){
          console.log("Updated Successfully");
        }
      },
      (err)=>{
        this.handleError(err);
      });
  }

  add(contactDTO:ContactDTO){
    this.contactService.createContact(contactDTO).subscribe(
      (res)=>{
        if(res != null){
          console.log("Added Successfully");
        }
      },
      (err)=>{
        this.handleError(err);
      });
  }

  openCreateContactDialog(): void {
    const dialogRef = this.dialog.open(CreateContactComponent);
  }


  openImportContactsDialog(): void {
    const dialogRef = this.dialog.open(ImportContactsComponent);
  }
}
