import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  httpUrl = 'https://sandbox-reporting.rpdpymnt.com';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer '+ this.token.getToken()
  });
  
  options = { headers: this.httpHeaders };

  constructor(private http: HttpClient,private token: TokenStorageService) { }

  transtionsReport(data): Observable<any> {
    
    return this.http.post(this.httpUrl + '/api/v3/transactions/report',{
      fromDate: "2015-07-01", 
      toDate: "2015-10-01", 
      merchant: 1,
      acquirer: 1
    } );
      
  }

  transtionList(data): Observable<any> {
    
    return this.http.post(this.httpUrl + '/api/v3/transaction/list',data, this.options );
      
  }
  
  transtion(data): Observable<any> {
    
    return this.http.post(this.httpUrl + '/api/v3/transaction',data, this.options );
      
  }

  clients(data): Observable<any> {
    
    return this.http.post(this.httpUrl + '/api/v3/client',data, this.options );
      
  }
}
