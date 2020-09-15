import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const options = { headers: httpHeaders };

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  httpUrl = 'https://sandbox-reporting.rpdpymnt.com';
  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    
    return this.http.post(this.httpUrl + '/api/v3/merchant/user/login',data, options );
      
  }

}
