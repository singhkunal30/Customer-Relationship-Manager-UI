import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriConfig } from '../config/URIconfig';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../model/CustomerDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  constructor(private http:HttpClient, private uriConfig:UriConfig) { }

  
	public createCustomer(customerDTO:CustomerDTO):Observable<CustomerDTO>{
    return this.http.put<CustomerDTO>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.customer}` + "/add", customerDTO);
  }
	// CustomerDTO getCustomer(int id);
	
	public updateCustomer(customerDTO:CustomerDTO):Observable<CustomerDTO>{
    return this.http.put<CustomerDTO>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.customer}` + "/update", customerDTO);
  }
	
	public removeCustomer(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.customer}` + `/delete/${id}`);
  }

	public getAllCustomers():Observable<CustomerDTO[]>{
    return this.http.get<CustomerDTO[]>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.customer}` + "/all");
  }
	


}
