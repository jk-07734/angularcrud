import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { associateModel } from '../../model/associate';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Associate {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

  }
  Getall() {
    return this.http.get<associateModel[]>(this.apiBaseUrl + '/associate');
  }
  Get(id: number) {
    return this.http.get<associateModel>(this.apiBaseUrl + '/associate/' + id);
  }
  Delete(id: number) {
    return this.http.delete(this.apiBaseUrl + '/associate/' + id);
  }
  Update(data: associateModel) {
    return this.http.put(this.apiBaseUrl + '/associate/' + data.id, data);
  }
  Create(data: associateModel) {
    return this.http.post(this.apiBaseUrl + '/associate', data);
  }
}
