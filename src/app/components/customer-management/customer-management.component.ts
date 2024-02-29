import { Component, OnInit } from '@angular/core';
import { CustomerDTO } from 'src/app/model/CustomerDTO';
import { ErrorDTO } from 'src/app/model/Error';
import { CustomerManagementService } from 'src/app/services/customer-management.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  dataPresent:boolean = false;
  customers: CustomerDTO[] = [];
  error:ErrorDTO = new ErrorDTO();
  exception: boolean = false;

  constructor(private customerService:CustomerManagementService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      (res)=>{
        console.log(res);
        if(res != null){
          this.customers = res
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
    this.customerService.removeCustomer(id).subscribe(
      ()=>{
        console.log("Deleted successfully");
      },
      (err)=>{
        this.handleError(err);
      });
  }

  update(customerDTO:CustomerDTO){
    this.customerService.updateCustomer(customerDTO).subscribe(
      (res)=>{
        if(res != null){
          console.log("Updated Successfully");
        }
      },
      (err)=>{
        this.handleError(err);
      });
  }

  add(customerDTO:CustomerDTO){
    this.customerService.createCustomer(customerDTO).subscribe(
      (res)=>{
        if(res != null){
          console.log("Added Successfully");
        }
      },
      (err)=>{
        this.handleError(err);
      });
  }

}
