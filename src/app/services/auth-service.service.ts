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

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    
    return this.http.post('/api/v3/merchant/user/login',data, options );
      
  }

}
