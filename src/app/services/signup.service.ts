import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(formData: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.post(apiUrl, formData, { observe: 'response' });
  }
}
