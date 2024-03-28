import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriConfig } from '../config/URIconfig';
import { Observable } from 'rxjs';
import { ContactDTO } from '../model/ContactDTO';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient, private uriConfig:UriConfig) { }

  
	public createContact(ContactDTO:ContactDTO):Observable<ContactDTO>{
    return this.http.put<ContactDTO>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.contact}` + "/add", ContactDTO);
  }
	// ContactDTO getContact(int id);
	
	public updateContact(ContactDTO:ContactDTO):Observable<ContactDTO>{
    return this.http.put<ContactDTO>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.contact}` + "/update", ContactDTO);
  }
	
	public removeContact(id:number):Observable<any>{
    return this.http.delete<any>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.contact}` + `/delete/${id}`);
  }

	public getAllContacts():Observable<ContactDTO[]>{
    return this.http.get<ContactDTO[]>(`${this.uriConfig.baseUrl}` + `${this.uriConfig.contact}` + "/all");
  }
	


}
