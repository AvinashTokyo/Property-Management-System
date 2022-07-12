import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {

  host: any = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  addProperty(data:any){
    return this.http.post<any>(`${this.host}/add-property-data`, data);
  }

  getProperty(){
    return this.http.get<any>(`${this.host}/get-property-data`);
  }

  deleteProperty(id:any){
    return this.http.delete<any>(`${this.host}/delete-property-data/${id}`);
  }
}
